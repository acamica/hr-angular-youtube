import * as angular from 'angular';
import {Observable, Subject} from '../../util/rx/facade';
import {PlainModel} from '../../ng-helper/plain-model';
import {convertToYoutube, convertFromYoutube} from '../../players/youtube/youtube-quality-map.service';
import {uuid} from '../../util/uuid.service';
import {
    IYoutubePlayerOptions,
    IYoutubeVideoSource,
    IVideoPlayer,
    IVolumeStateEvent,
    IProgressStateEvent,
    IRateChangeEvent,
    ILoadedStateEvent,
    ISeekingEvent,
    ISeekedEvent,
    IPlayStateEvent,
    IEndedEvent
} from '../../players/video-player.model';

export interface IPlayerEvent {
    type: string;
    player: IVideoPlayer;
}

const imports = {
    // TODO: Remove in favour of rxjs
    '$interval': undefined as ng.IIntervalService,
    // TODO: Remove at all cost (events, rxjs)
    '$rootScope': undefined as ng.IRootScopeService
};
@PlainModel({
    name: 'YoutubePlayer',
    $inject: imports
})
export class YoutubePlayer
                            implements IVideoPlayer {

    player: YT.Player;
    private _muted = false;
    private _volume = 100;
    private _intendedQuality: YT.SuggestedVideoQuality = 'default';
    private _element: any;
    // TODO: Improve, maybe add a store
    private eventEmmiter = new Subject<IPlayerEvent>();

    constructor (elm: ng.IAugmentedJQuery, public options: IYoutubePlayerOptions) {
        const op = angular.copy(this.options);
        // TODO: Add a fit to parent or something like that

        // op.width = '100%';
        // op.height = '100%';
        op.width = options.width;
        op.height = options.height;
        // console.debug('YoutubePlayer: creating underliying youtube player with options', op);
        this.player = new YT.Player(elm[0], op);

        this.on('onStateChange', (event: YT.OnStateChangeEvent) => {
            if (event.data === YT.PlayerState.PLAYING) {
                this.setVolume(this.player.getVolume());
                this._setMuted(this.player.isMuted());
            }
        });
        // If a marker is added, make sure the marker listener is initialized
        // TODO: delete
        // this.on('markerAdd', (marker) => {
        //     this._initializeMarkerListener();
        //     marker.setPlayer(this);
        // });

        // // If a marker is removed make sure its stoped
        // this.on('markerRemove', marker => marker.end());
    }

    // -------------------
    // -     Loading     -
    // -------------------

    /**
     * Loads a source and emit a single value when the video is loaded
     */
    // TODO: type youtube source
    load (source: IYoutubeVideoSource): Observable<YoutubePlayer> {
        const loadVideo$ = this.fromEvent<YT.OnStateChangeEvent>('onStateChange')
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
    playState$: Observable<IPlayStateEvent> = this
        .fromEvent<YT.OnStateChangeEvent>('onStateChange')
        .filter(ev => [YT.PlayerState.PLAYING, YT.PlayerState.ENDED, YT.PlayerState.PAUSED].indexOf(ev.data) !== -1)
        .map(ev => ({
            player: this,
            type: 'playstate',
            isPlaying: ev.data === YT.PlayerState.PLAYING,
            hasEnded: ev.data === YT.PlayerState.ENDED // TODO: Add practically finished?
        } as IPlayStateEvent));

    // TODO: This is the same as in html5 player. Chance to refactor
    progress$: Observable<IProgressStateEvent> = this.playState$
                    .switchMap(state => {
                        if (state.isPlaying) {
                            return Observable.interval(100);
                        } else {
                            return Observable.empty();
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
    loaded$: Observable<ILoadedStateEvent> = Observable.empty<ILoadedStateEvent>();
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

    seekTo (sec: number): Promise<ISeekedEvent> {
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

    ended$: Observable<IEndedEvent> = this.fromEvent<YT.OnStateChangeEvent>('onStateChange')
        .map(ev => {
            // If youtube says its ended, we ended
            if (ev.data === YT.PlayerState.ENDED) {
                return true;
            }
            // But sometimes it lingers, so we help a little
            if (ev.data === YT.PlayerState.BUFFERING) {
                const isPracticallyFinished = this.getDuration() - this.getCurrentTime() <= 1;
                // If we are buffering we check if the video practically finished
                return isPracticallyFinished;
            }
            return false;
        })
        .filter(hasEnded => hasEnded)
        // Make sure we don't get two end events in one second
        .throttleTime(1000)
        .map(_ => {
            const event = {
                player: this,
                type: 'ended'
            } as IEndedEvent;
            return event;
        });

    // -------------------
    // -     Rate     -
    // -------------------
    playbackRate$: Observable<IRateChangeEvent> = this.fromEvent('onPlaybackRateChange')
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
            this.unmute();
        } else {
            this.mute();
        }
    }

    isMuted () {
        return this._muted || this._volume === 0;
    }

    mute () {
        this.player.mute();
        this._setMuted(true); // This triggers event
    }

    unmute () {
        this.player.unMute();
        this._setMuted(false); // This triggers event
    }

    setVolume (volume: number) {
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

    volumeState$: Observable<IVolumeStateEvent> = this.eventEmmiter
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
    private _setMuted (muted: boolean) {
        const changed = this._muted !== muted;
        this._muted = muted;
        // If its muted and with no volume, unmuting sets to half volume
        if (muted && this._volume === 0) {
            this.setVolume(50);
        } else if (changed) {
            this.eventEmmiter.next({player: this, type: 'volumechange'});
        }
    };


    //
    //
    //
    ready$ = this.fromEvent('onReady');

    // -------------------
    // -  REFACTOR THIS  -
    // -------------------


    setOverlayElement (elm: Element) {
        this._element = elm;
    }

    getOverlayElement () {
        return this._element;
    }

    // TODO: Deprecate
    onProgress (fn: any, resolution?: any) {
        if (typeof resolution === 'undefined') {
            resolution = 100;
        }
        let promise: any = null;
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

        this.on('onStateChange', (event: any) => {
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

    startLoading (sec: number) {
        let unregister: any;
        const pauseAfterStart =  (event: any) => {
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
        angular.forEach(events, (name: keyof YT.Events) => {
            this.player.addEventListener(name, data => {
                this.emit(name, data);
            });
        });
        this._eventsInitialized = true;
    }

    // TODO: Deprecate this shit
    on (name: any, handler: any) {
        this._initializeEventListener();

        return imports.$rootScope.$on(this._eventHash + name, (e, eventData) => {
            handler(eventData);
        });
    };
    // TODO: Deprecate this shit
    emit (name: any, data?: any) {
        imports.$rootScope.$emit(this._eventHash + name, data);
    };

    getHumanPlaybackQuality () {
        return convertToYoutube(this.player.getPlaybackQuality());
    };

    getHumanIntendedPlaybackQuality (showRealAuto: any) {
        let ans = convertToYoutube(this._intendedQuality);
        if (ans === 'Auto' && showRealAuto && this.getHumanPlaybackQuality() !== 'Auto') {
            ans += ' (' + this.getHumanPlaybackQuality() + ')';
        }
        return ans;
    };

    setHumanPlaybackQuality (q: any) {
        const quality: any = convertFromYoutube(q);
        this.setPlaybackQuality(quality);
        this.emit('onIntentPlaybackQualityChange');
    };

    setPlaybackQuality (q: YT.SuggestedVideoQuality) {
        this._intendedQuality = q;
        this.player.setPlaybackQuality(q);
    };

    private destroyed = false;
    destroy (): void {
        this.player.destroy();
        this.destroyed = true;
    }

    // TODO: Deprecated in favour of load?
    loadVideoById (videoId: string, startSeconds?: number, suggestedQuality?: YT.SuggestedVideoQuality) {
        this.player.loadVideoById(videoId, startSeconds, suggestedQuality);
        return this;
    }

    fromEvent <T extends YT.Events> (eventName: keyof YT.Events): Observable<T> {
        const addHandler = (h: any) => this.player.addEventListener(eventName, h);
        const removeHandler = (h: any) => {
            if (!this.destroyed) {
                this.player.removeEventListener(eventName, h);
            }
        };
        return Observable.fromEventPattern(addHandler, removeHandler);
    }

    getAvailableQualityLevels () {
        return this.player.getAvailableQualityLevels();
    }

    getPlayerState () {
        return this.player.getPlayerState();
    }


}
