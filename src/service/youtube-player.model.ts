declare const YT;
import * as angular from 'angular';
import {convertToYoutube, convertFromYoutube} from 'src/service/youtube-quality-map.service';
import {youtubeReadableTime} from 'src/service/youtube-readable-time.service';
import {uuid} from 'src/util/uuid.service';

angular.module('hrAngularYoutube')

.factory('YoutubePlayer', ['$q', '$interval', '$rootScope', 'YoutubeMarkerList',
    function ($q, $interval, $rootScope, YoutubeMarkerList) {


        const YoutubePlayer = function(elmOrId, options) {

            this.options = options;

            const op = angular.copy(options);
            // TODO: Add a fit to parent or something like that
            op.width = '100%';
            op.height = '100%';

            const self = this;

            this.player = new YT.Player(elmOrId, op);

            this.markerList = new YoutubeMarkerList();
            this._muted = false;
            this._volume = 100;
            this._intendedQuality = 'auto';

            this.on('onStateChange', function(event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    self.setVolume(self.player.getVolume());
                    self._setMuted(self.player.isMuted());
                }
            });
            // If a marker is added, make sure the marker listener is initialized
            this.on('markerAdd', function(marker) {
                self._initializeMarkerListener();
                marker.setPlayer(self);
            });

            // If a marker is removed make sure its stoped
            this.on('markerRemove', function(marker) {
                marker.end();
            });

        };

        // TODO: Inherit better than these :S once i know if this is the way I want to access the object
        angular.forEach([
            'getOptions', 'loadModule', 'loadVideoById', 'loadVideoByUrl', 'cueVideoById', 'cueVideoByUrl', 'cuePlaylist',
            'loadPlaylist', 'playVideo', 'pauseVideo', 'stopVideo', 'seekTo', 'clearVideo',
            'nextVideo', 'previousVideo', 'playVideoAt',
            'setSize', 'getPlaybackRate', 'setPlaybackRate', 'getAvailablePlaybackRates',
            'setLoop', 'setShuffle', 'getVideoLoadedFraction', 'getPlayerState', 'getCurrentTime',
            'getPlaybackQuality', 'setPlaybackQuality', 'getAvailableQualityLevels', 'getDuration',
            'getVideoUrl', 'getVideoEmbedCode', 'getPlaylist', 'getPlaylistIndex', 'getIframe', 'destroy'
            // 'addEventListener', 'removeEventListener','mute',unMute,isMuted,getVolume,setVolume
        ], function(name) {
            YoutubePlayer.prototype[name] = function() {
                return this.player[name].apply(this.player, arguments);
            };
        });

        YoutubePlayer.prototype.setOverlayElement = function (elm) {
            this._element = elm;
        };

        YoutubePlayer.prototype.getOverlayElement = function () {
            return this._element;
        };


        YoutubePlayer.prototype.getHumanReadableDuration = function () {
            return youtubeReadableTime(this.getDuration());
        };

        YoutubePlayer.prototype.getHumanReadableCurrentTime = function () {
            return youtubeReadableTime(this.getCurrentTime());
        };



        YoutubePlayer.prototype.onProgress = function (fn, resolution) {
            if (typeof resolution === 'undefined') {
                resolution = 100;
            }
            let promise = null;
            const startInterval = function () {
                if (promise === null) {
                    promise = $interval(fn, resolution);
                }
            };
            const stopInterval = function () {

                $interval.cancel(promise);
                promise = null;
            };

            const cancel = function() {
                stopInterval();
                // TODO: something more to destroy / release stuff.
            };

            this.on('onStateChange', function(event) {
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
        };



        /**
         * Its like seekTo, but fires an event when the seek is complete
         */
        YoutubePlayer.prototype.eventSeekTo = function (sec, allowSeekAhead) {
            const self = this;
            const initialTime = this.player.getCurrentTime();

            // If there is a blocking marker, don't allow to seek further than it
            angular.forEach(self.markerList.getMarkers(), function(marker) {
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
            self.emit('seekToBegin', {newTime: sec, oldTime: initialTime});

            const seekPromise = $q.defer();
            // Check on a time interval that the seek has been completed
            const promise = $interval(function() {
                const currentTime = self.player.getCurrentTime();
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
                    $interval.cancel(promise);
                    const ans = {newTime: sec, oldTime: initialTime};
                    self.emit('seekToCompleted', ans);
                    seekPromise.resolve(ans);
                }
            }, 50);
            return seekPromise.promise;
        };

        YoutubePlayer.prototype.startLoading = function (sec) {
            const self = this;
            let unregister;
            const pauseAfterStart = function (event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    if (typeof sec === 'number') {
                        self.eventSeekTo(sec, true);
                    }
                    unregister();
                    self.player.pauseVideo();
                }
            };
            unregister = this.on('onStateChange', pauseAfterStart);
            this.player.playVideo();
        };

        YoutubePlayer.prototype._initializeEventListener = function () {
            if (this._eventsInitialized ) {
                return;
            }
            const self = this;
            this._eventHash = uuid();
            const events = ['onStateChange', 'onPlaybackQualityChange', 'onPlaybackRateChange',
                            'onError', 'onApiChange', 'onReady'];
            angular.forEach(events, function(name) {
                self.player.addEventListener(name, function(data) {
                    self.emit(name,data);
                });
            });
            this._eventsInitialized = true;
        };


        YoutubePlayer.prototype.on = function (name, handler) {
            this._initializeEventListener();

            return $rootScope.$on(this._eventHash + name, function(e, eventData) {
                handler(eventData);
            });
        };

        YoutubePlayer.prototype.emit = function(name, data) {
            $rootScope.$emit(this._eventHash + name, data);
        };

        YoutubePlayer.prototype._initializeMarkerListener = function () {
            // Only initialize markers once
            if ( this._markerListener ) {
                return;
            }
            this._markerListener = true;

            const runMarker = function (marker) {
                if (marker.start()) {
                    // Emit an event with the marker
                    self.emit('markerRun', marker);
                }
            };
            const stopMarker = function (marker) {
                marker.end();
                // Emit an event with the marker
                self.emit('markerStop', marker);
            };



            const self = this;
            let lastMarkerTime = -1;
            this.onProgress(function() {
                const currentTime = self.getCurrentTime();
                let newLastTime = lastMarkerTime;
                angular.forEach(self.markerList.getMarkers(), function(marker) {
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

            this.on('seekToCompleted', function(seekTime){
                angular.forEach(self.markerList.getMarkers(), function(marker) {
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
        YoutubePlayer.prototype.setMarkerList = function (list) {
            this._initializeMarkerListener();
            this.markerList = list;
            this.markerList.setPlayer(this);
            this.emit('markerListChanged');
        };

        YoutubePlayer.prototype.addMarker = function (marker) {
            return this.markerList.add(marker);
        };

        YoutubePlayer.prototype.removeMarker = function (markerId) {
            return this.markerList.removeById(markerId);
        };

        YoutubePlayer.prototype.getMarkers = function () {
            return this.markerList.getMarkers();
        };

        YoutubePlayer.prototype.getMarker = function (id) {
            return this.markerList.getMarker(id);
        };


        YoutubePlayer.prototype.setVolume = function (volume) {
            // If volume is 0, then set as muted, if not is unmuted
            this._setMuted(volume === 0);
            this._volume = volume;
            this.player.setVolume(volume);
        };

        YoutubePlayer.prototype.getVolume = function () {
            if (this._muted) {
                return 0;
            }
            return this._volume;
        };

        YoutubePlayer.prototype._setMuted = function (muted) {
            const changed = this._muted !== muted;
            this._muted = muted;
            if (changed) {
                this.emit('muteChange');
            }
        };

        YoutubePlayer.prototype.mute = function () {
            this._setMuted(true);
            this.player.mute();
        };

        YoutubePlayer.prototype.unMute = function () {
            this._setMuted(false);
            this.player.unMute();
        };

        YoutubePlayer.prototype.isMuted = function () {
            return this._muted;
        };

        YoutubePlayer.prototype.toggleMute = function () {
            if (this.isMuted()) {
                this.unMute();
            } else {
                this.mute();
            }
        };

        YoutubePlayer.prototype.getHumanPlaybackQuality = function () {
            return convertToYoutube(this.player.getPlaybackQuality());
        };


        YoutubePlayer.prototype.getHumanIntendedPlaybackQuality = function (showRealAuto) {
            let ans = convertToYoutube(this._intendedQuality);
            if (ans === 'Auto' && showRealAuto && this.getHumanPlaybackQuality() !== 'Auto') {
                ans += ' (' + this.getHumanPlaybackQuality() + ')';
            }
            return ans;
        };

        YoutubePlayer.prototype.setHumanPlaybackQuality = function (q) {
            const quality = convertFromYoutube(q);
            this.setPlaybackQuality(quality);
            this.emit('onIntentPlaybackQualityChange');
        };

        YoutubePlayer.prototype.setPlaybackQuality = function (q) {
            this._intendedQuality = q;
            this.player.setPlaybackQuality(q);
        };


        return YoutubePlayer;
    }
]);
