import * as angular from 'angular';
import {PlainModel} from 'src/ng-helper/plain-model';
import {convertToYoutube, convertFromYoutube} from 'src/service/youtube-quality-map.service';
import {youtubeReadableTime} from 'src/service/youtube-readable-time.service';
import {uuid} from 'src/util/uuid.service';

const imports = {
    // TODO: Remove in favour of plain promises
    '$q': undefined as ng.IQService,
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
export class YoutubePlayer {

    player: YT.Player;
    markerList: any;
    private _muted = false;
    private _volume = 100;
    private _intendedQuality: YT.SuggestedVideoQuality = 'default';
    private _element: any;
    constructor(elmOrId, private options) {

        const op = angular.copy(options);
        // TODO: Add a fit to parent or something like that
        op.width = '100%';
        op.height = '100%';

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

    setOverlayElement (elm) {
        this._element = elm;
    }

    getOverlayElement () {
        return this._element;
    }


    getHumanReadableDuration () {
        return youtubeReadableTime(this.getDuration());
    }

    getHumanReadableCurrentTime () {
        return youtubeReadableTime(this.getCurrentTime());
    }


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

        const cancel = function() {
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
     */
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
    }

    startLoading (sec) {
        let unregister;
        const pauseAfterStart =  event => {
            if (event.data === YT.PlayerState.PLAYING) {
                if (typeof sec === 'number') {
                    this.eventSeekTo(sec, true);
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

    on (name, handler) {
        this._initializeEventListener();

        return imports.$rootScope.$on(this._eventHash + name, (e, eventData) => {
            handler(eventData);
        });
    };

    emit(name, data?) {
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


    setVolume (volume) {
        // If volume is 0, then set as muted, if not is unmuted
        this._setMuted(volume === 0);
        this._volume = volume;
        this.player.setVolume(volume);
    };

    getVolume () {
        if (this._muted) {
            return 0;
        }
        return this._volume;
    };

    private _setMuted (muted) {
        const changed = this._muted !== muted;
        this._muted = muted;
        if (changed) {
            this.emit('muteChange');
        }
    };

    mute () {
        this._setMuted(true);
        this.player.mute();
    };

    unMute () {
        this._setMuted(false);
        this.player.unMute();
    };

    isMuted () {
        return this._muted;
    };

    toggleMute () {
        if (this.isMuted()) {
            this.unMute();
        } else {
            this.mute();
        }
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

    // TODO: See what to do with this proxy methods
    getDuration() {
        return this.player.getDuration();
    }

    getCurrentTime() {
        return this.player.getCurrentTime();
    }
    getPlayerState() {
        return this.player.getPlayerState();
    }

    destroy() {
        return this.player.destroy();
    }

    loadVideoById(videoId: string, startSeconds?: number, suggestedQuality?: string) {
        return this.player.loadVideoById(videoId, startSeconds, suggestedQuality);
    }

    getPlaybackRate() {
        return this.player.getPlaybackRate();
    }

    playVideo() {
        return this.player.playVideo();
    }

    pauseVideo() {
        return this.player.pauseVideo();
    }

    getVideoLoadedFraction() {
        return this.player.getVideoLoadedFraction();
    }

    getAvailablePlaybackRates() {
        return this.player.getAvailablePlaybackRates();
    }

    setPlaybackRate(suggestedRate: number) {
        return this.player.setPlaybackRate(suggestedRate);
    }

    getAvailableQualityLevels() {
        return this.player.getAvailableQualityLevels();
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

