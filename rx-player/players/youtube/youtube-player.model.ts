import * as angular from 'angular';
import {Observable, Subject} from '../../util/rx/facade';
import {PlainModel} from '../../ng-helper/plain-model';
import {convertToYoutube, convertFromYoutube} from '../../players/youtube/youtube-quality-map.service';
import {uuid} from '../../util/uuid.service';
import {IYoutubePlayerOptions} from './youtube.service';
import {
    IVideoPlayer,
    IVolumeStateEvent,
    IProgressStateEvent,
    IRateChangeEvent,
    ILoadedStateEvent,
    ISeekingEvent,
    ISeekedEvent,
    IPlayStateEvent
} from '../../players/video-player.model';
import '../../service/youtube-marker-list.model'; // TODO: Refactor markers

export interface IPlayerEvent {
    type: string;
    player: IVideoPlayer;
}

const imports = {
    // TODO: Remove in favour of rxjs
    '$interval': undefined as ng.IIntervalService,
    // TODO: Remove at all cost (events, rxjs)
    '$rootScope': undefined as ng.IRootScopeService,
    // TODO: Remove in favour of separating logic
    'YoutubeMarkerList': undefined
};
@PlainModel({
    name: 'YoutubePlayer',
    $inject: imports
})
export class YoutubePlayer
                            implements IVideoPlayer {

    player: YT.Player;
    markerList: any;
    private _muted = false;
    private _volume = 100;
    private _intendedQuality: YT.SuggestedVideoQuality = 'default';
    private _element: any;
    // TODO: Improve, maybe add a store
    private eventEmmiter = new Subject<IPlayerEvent>();

    constructor (elmOrId, public options: IYoutubePlayerOptions) {
        const op = angular.copy(this.options);
        // TODO: Add a fit to parent or something like that

        // op.width = '100%';
        // op.height = '100%';
        op.width = options.width;
        op.height = options.height;
        console.log('new player ops', op);
        this.player = new YT.Player(elmOrId, op);

        this.markerList = new imports.YoutubeMarkerList();

        this.on('onStateChange', (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
                this.setVolume(this.player.getVolume());
                this._setMuted(this.player.isMuted());
            }
        });
        // If a marker is added, make sure the marker listener is initialized
        this.on('markerAdd', (marker) => {
            this._initializeMarkerListener();
            marker.setPlayer(this);
        });

        // If a marker is removed make sure its stoped
        this.on('markerRemove', marker => marker.end());
    }

    // -------------------
    // -     Loading     -
    // -------------------

    /**
     * Loads a source and emit a single value when the video is loaded
     */
    // TODO: type youtube source
    load (source): Observable<YoutubePlayer> {
        const loadVideo$ = this.fromEvent('onStateChange')
            // .do(x => console.log('state', x.data))
            .filter(x => x.data === YT.PlayerState.PLAYING)
            // Count the number of times the player start playing
            .scan(n => n + 1, 0)
            // We only care about the first time
            .filter(n => n === 1)
            // The first time pause the video (kind of autoload)
            .do(_ => this.player.pauseVideo())
            // .do(x => console.log('pause', x))
            .map(_ => this);

        // TODO: It would be nice if this is part of the stream
        this.player.loadVideoById(source.youtubeId);

        return loadVideo$;
    }

    // -------------------
    // -     Playing     -
    // -------------------

    play () {
        return this.player.playVideo();
    }

    pause () {
        return this.player.pauseVideo();
    }

    isPlaying () {
        return this.player.getPlayerState() === YT.PlayerState.PLAYING;
    }

    // TODO: need to map this event to a common interface once defined
    playState$ = this
        .fromEvent('onStateChange')
        .filter(ev => [YT.PlayerState.PLAYING, YT.PlayerState.ENDED, YT.PlayerState.PAUSED].indexOf(ev.data) !== -1)
        .map(ev => ({
            player: this,
            type: 'playstate',
            isPlaying: ev.data === YT.PlayerState.PLAYING
        } as IPlayStateEvent));

    progress$ = this.fromEvent('onStateChange')
                    .switchMap(event => {
                        if (event.data !== YT.PlayerState.PLAYING) {
                            return Observable.empty();
                        } else {
                            return Observable.interval(100);
                        }
                     })
                    .map(_ => {
                        const event = {
                            player: this,
                            type: 'videoprogress',
                            time: this.getCurrentTime()
                        } as IProgressStateEvent;
                        return event;
                    });

    // TODO: There is no specific event from youtube to indicate that the video is
    // being loaded, for now this recipe is disabled. Eventually we can combine onStateChange with
    // an interval to poll when the event happens
    loaded$ = Observable.empty<ILoadedStateEvent>();
        // .fromEvent('progress')
        // .map(_ => {
        //     const event = {
        //         player: this,
        //         type: 'loaded',
        //         loaded: this.getLoadedPercent()
        //     } as ILoadedStateEvent;
        //     return event;
        // });
    getDuration (): number {
        return this.player.getDuration();
    }

    getCurrentTime (): number {
        return this.player.getCurrentTime();
    }

    getLoadedPercent (): number {
        return this.player.getVideoLoadedFraction() * 100;
    }

    seeking$ = new Subject<ISeekingEvent>();
    seeked$ = new Subject<ISeekedEvent>();

    seekTo (sec): Promise<any> {
        const initialTime = this.getCurrentTime();

        // Seek to sec
        this.player.seekTo(sec, true);

        // Inform of the intent to seek
        // this.emit('seekToBegin', {newTime: sec, oldTime: initialTime});
        this.seeking$.next({
            player: this,
            type: 'seeking'
        } as ISeekingEvent);

        // Inform when seek is ready
        Observable
            // Check every 50ms
            .interval(200)
            // If the current time (not pure)
            .map(_ => this.getCurrentTime())
            // Means that the player has finished seeking
            .filter(currentTime => {
                // If we intent to go backwards:
                if (sec < initialTime ) {
                    // We complete when current time is lower
                    // than the initial one
                    if (currentTime < initialTime) {
                        return true;
                    }

                }
                // If we intent to go forward:
                else {
                    // We complete once we pass the intended mark
                    if (currentTime > sec || sec - currentTime < 0.1) {
                        return true;
                    }
                }
                return false;
                // There may be a third scenario where the player is paused, you pushed
                // forward and it complete but just next to sec.
            })
            .take(1)
            .mapTo({player: this, type: 'seeked'} as ISeekedEvent)
            .subscribe(nextValue => this.seeked$.next(nextValue));

        return this.seeked$.take(1).toPromise();
    }

    // -------------------
    // -     Rate     -
    // -------------------
    playbackRate$ = this.fromEvent('onPlaybackRateChange')
                        .map(_ => {
                            const event = {
                                player: this,
                                type: 'ratechange',
                                rate: this.getPlaybackRate()
                            } as IRateChangeEvent;
                            return event;
                        });

    getPlaybackRate () {
        return this.player.getPlaybackRate();
    }

    setPlaybackRate (suggestedRate: number) {
        return this.player.setPlaybackRate(suggestedRate);
    }

    getAvailablePlaybackRates () {
        return this.player.getAvailablePlaybackRates();
    }

    // -------------------
    // -      Volume     -
    // -------------------

    toggleMute () {
        if (this.isMuted()) {
            this.unMute();
        } else {
            this.mute();
        }
    };

    isMuted () {
        return this._muted || this._volume === 0;
    };

    setVolume (volume) {
        const changed = this._volume !== volume;
        // If volume is 0, then set as muted, if not is unmuted
        this._setMuted(volume === 0);
        this._volume = volume;
        this.player.setVolume(volume);
        if (changed) {
            this.eventEmmiter.next({player: this, type: 'volumechange'});
        }
    };

    getVolume () {
        if (this._muted) {
            return 0;
        }
        return this._volume;
    };

    volumeState$ = this.eventEmmiter
        .filter(event => event.type === 'volumechange')
        .map(_ => {
            const event = {
                player: this,
                type: 'volumechange',
                volume: this.getVolume(),
                isMuted: this.isMuted()
            } as IVolumeStateEvent;
            return event;
        });

    // TODO: Maybe refactor into property setter
    private _setMuted (muted) {
        const changed = this._muted !== muted;
        this._muted = muted;
        if (changed) {
            this.eventEmmiter.next({player: this, type: 'volumechange'});
        }
    };

    private mute () {
        this._setMuted(true);
        this.player.mute();
    };

    private unMute () {
        this._setMuted(false);
        this.player.unMute();
    };


    //
    //
    //
    ready$ = this.fromEvent('onReady');

    // -------------------
    // -  REFACTOR THIS  -
    // -------------------


    setOverlayElement (elm) {
        this._element = elm;
    }

    getOverlayElement () {
        return this._element;
    }

    // TODO: Deprecate
    onProgress (fn, resolution?) {
        if (typeof resolution === 'undefined') {
            resolution = 100;
        }
        let promise = null;
        const startInterval = () => {
            if (promise === null) {
                promise = imports.$interval(fn, resolution);
            }
        };
        const stopInterval = () => {
            imports.$interval.cancel(promise);
            promise = null;
        };

        const cancel = function () {
            stopInterval();
            // TODO: something more to destroy / release stuff.
        };

        this.on('onStateChange', (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
                startInterval();
            } else {
                stopInterval();
            }
        });

        if (this.getPlayerState() === YT.PlayerState.PLAYING) {
            startInterval();
        }
        return cancel;
    }

    /**
     * Its like seekTo, but fires an event when the seek is complete
     *//*
    eventSeekTo (sec, allowSeekAhead) {
        const initialTime = this.player.getCurrentTime();

        // If there is a blocking marker, don't allow to seek further than it
        angular.forEach(this.markerList.getMarkers(), (marker) => {
            // If its not blocking, we dont care
            if (!marker.getBlockOnFF()) {
                return;
            }

            // If the marker is in the seek time, force the sec to be at the marker time
            if (marker.startedIn(initialTime, sec)) {
                sec = marker.startTime;
            }
        });

        // Seek to sec
        this.player.seekTo(sec, allowSeekAhead);
        // Inform of the intent to seek
        this.emit('seekToBegin', {newTime: sec, oldTime: initialTime});

        const seekPromise = imports.$q.defer();
        // Check on a time interval that the seek has been completed
        const promise = imports.$interval(() => {
            const currentTime = this.player.getCurrentTime();
            let seekCompleted = false;


            if (sec < initialTime ) {
                // If we intent to go backwards, we complete when current time is lower
                // than the initial one
                if (currentTime < initialTime) {
                    seekCompleted = true;
                }

            } else {
                // If we intent to go forward, we complete once we pass the intended mark
                if ( currentTime >= sec ) {
                    seekCompleted = true;
                }
            }
            // There may be a third scenario where the player is paused, you pushed
            // forward and it complete but just next to sec.

            // Once its complete, for whatever reason, fire the event and cancel this interval
            if (seekCompleted) {
                imports.$interval.cancel(promise);
                const ans = {newTime: sec, oldTime: initialTime};
                this.emit('seekToCompleted', ans);
                seekPromise.resolve(ans);
            }
        }, 50);
        return seekPromise.promise;
    }*/

    startLoading (sec) {
        let unregister;
        const pauseAfterStart =  event => {
            if (event.data === YT.PlayerState.PLAYING) {
                if (typeof sec === 'number') {
                    this.seekTo(sec);
                }
                unregister();
                this.player.pauseVideo();
            }
        };
        unregister = this.on('onStateChange', pauseAfterStart);
        this.player.playVideo();
    }

    private _eventsInitialized = false;
    private _eventHash: string;
    private _initializeEventListener () {
        if (this._eventsInitialized ) {
            return;
        }
        this._eventHash = uuid();
        const events = ['onStateChange', 'onPlaybackQualityChange', 'onPlaybackRateChange',
                        'onError', 'onApiChange', 'onReady'];
        angular.forEach(events, name => {
            this.player.addEventListener(name, data => {
                this.emit(name, data);
            });
        });
        this._eventsInitialized = true;
    }

    // TODO: Deprecate this shit
    on (name, handler) {
        this._initializeEventListener();

        return imports.$rootScope.$on(this._eventHash + name, (e, eventData) => {
            handler(eventData);
        });
    };
    // TODO: Deprecate this shit
    emit (name, data?) {
        imports.$rootScope.$emit(this._eventHash + name, data);
    };

    private _markerListener = false;
    private _initializeMarkerListener () {
        // Only initialize markers once
        if ( this._markerListener ) {
            return;
        }
        this._markerListener = true;

        const runMarker = marker => {
            if (marker.start()) {
                // Emit an event with the marker
                this.emit('markerRun', marker);
            }
        };
        const stopMarker = marker => {
            marker.end();
            // Emit an event with the marker
            this.emit('markerStop', marker);
        };


        let lastMarkerTime = -1;
        this.onProgress(() => {
            const currentTime = this.getCurrentTime();
            let newLastTime = lastMarkerTime;
            angular.forEach(this.markerList.getMarkers(), marker => {
                // If the marker time has past and we haven't launched this marker yet
                if (marker.startedIn(lastMarkerTime, currentTime) ) {
                    runMarker(marker);
                    newLastTime = Math.max(newLastTime, marker.startTime);
                }
                // If the marker has ended
                if (marker.endedIn(lastMarkerTime, currentTime) && marker.isRunning()) {
                    stopMarker(marker);
                    newLastTime = Math.max(newLastTime, marker.endTime);
                }
            });
            lastMarkerTime = newLastTime;
        });

        this.on('seekToCompleted', seekTime => {
            angular.forEach(this.markerList.getMarkers(), marker => {
                if (marker.isRunning()) {
                    // If the marker is running and the seek throws it out of range, stop it
                    if (!marker.inRange(seekTime.newTime)) {
                        stopMarker(marker);
                    }
                }else {
                    // If the marker is not running, see if we need to start it
                    if (marker.shouldLaunchOnSeek(seekTime)) {
                        runMarker(marker);
                    }
                }

            });
            lastMarkerTime = seekTime.newTime;
        });
    };

    // TODO: Revisit... I think with the addond of the player factory this
    // shouldnt be needed
    setMarkerList (list) {
        this._initializeMarkerListener();
        this.markerList = list;
        this.markerList.setPlayer(this);
        this.emit('markerListChanged');
    };

    addMarker (marker) {
        return this.markerList.add(marker);
    };

    removeMarker (markerId) {
        return this.markerList.removeById(markerId);
    };

    getMarkers () {
        return this.markerList.getMarkers();
    };

    getMarker (id) {
        return this.markerList.getMarker(id);
    };

    getHumanPlaybackQuality () {
        return convertToYoutube(this.player.getPlaybackQuality());
    };

    getHumanIntendedPlaybackQuality (showRealAuto) {
        let ans = convertToYoutube(this._intendedQuality);
        if (ans === 'Auto' && showRealAuto && this.getHumanPlaybackQuality() !== 'Auto') {
            ans += ' (' + this.getHumanPlaybackQuality() + ')';
        }
        return ans;
    };

    setHumanPlaybackQuality (q) {
        const quality = convertFromYoutube(q);
        this.setPlaybackQuality(quality);
        this.emit('onIntentPlaybackQualityChange');
    };

    setPlaybackQuality (q: YT.SuggestedVideoQuality) {
        this._intendedQuality = q;
        this.player.setPlaybackQuality(q);
    };

    destroy () {
        return this.player.destroy();
    }

    // TODO: Deprecated in favour of load?
    loadVideoById (videoId: string, startSeconds?: number, suggestedQuality?: string) {
        this.player.loadVideoById(videoId, startSeconds, suggestedQuality);
        return this;
    }

    fromEvent (eventName: string): Observable<YT.EventArgs> {
        const addHandler = (h) => this.player.addEventListener(eventName, h);
        const removeHandler = (h) => this.player.removeEventListener(eventName, h);
        return Observable.fromEventPattern(addHandler, removeHandler);
    }

    getAvailableQualityLevels () {
        return this.player.getAvailableQualityLevels();
    }

    getPlayerState () {
        return this.player.getPlayerState();
    }


}


        // // TODO: Inherit better than these :S once i know if this is the way I want to access the object
        // angular.forEach([
        //     'getOptions', 'loadModule', 'loadVideoById', 'loadVideoByUrl', 'cueVideoById', 'cueVideoByUrl', 'cuePlaylist',
        //     'loadPlaylist', 'playVideo', 'pauseVideo', 'stopVideo', 'seekTo', 'clearVideo',
        //     'nextVideo', 'previousVideo', 'playVideoAt',
        //     'setSize', 'getPlaybackRate', 'setPlaybackRate', 'getAvailablePlaybackRates',
        //     'setLoop', 'setShuffle', 'getVideoLoadedFraction', 'getPlayerState', 'getCurrentTime',
        //     'getPlaybackQuality', 'setPlaybackQuality', 'getAvailableQualityLevels', 'getDuration',
        //     'getVideoUrl', 'getVideoEmbedCode', 'getPlaylist', 'getPlaylistIndex', 'getIframe', 'destroy'
        //     // 'addEventListener', 'removeEventListener','mute',unMute,isMuted,getVolume,setVolume
        // ], function(name) {
        //     YoutubePlayer.prototype[name] = function() {
        //         return this.player[name].apply(this.player, arguments);
        //     };
        // });

