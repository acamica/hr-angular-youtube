import {Component, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import * as angular from 'angular';

@Component({
    selector: 'playerProgressBar',
    templateUrl: '/template/overlay/player-progress-bar.component.html',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer']
})
export class PlayerProgressBar {
    private youtubePlayer: any;

    static $inject = ['$element', '$scope'];
    constructor (private elm, private scope) {
    }

    ngOnInit() {
        const $played = angular.element(this.elm[0].querySelector('.hr-yt-played'));
        const $loaded = angular.element(this.elm[0].querySelector('.hr-yt-loaded'));
        const $handle = angular.element(this.elm[0].querySelector('.hr-yt-handle'));

        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) => {
                const duration = player.getDuration();

                const updateProgress = (sec?) => {
                    let played, loaded;
                    if (player.getPlayerState() === YT.PlayerState.ENDED ) {
                        played = 100;
                        loaded = 100;
                    } else if ( typeof sec === 'number') {
                        played = 100 * sec / duration;
                        loaded = player.getVideoLoadedFraction() * 100;
                    } else {
                        played = 100 * player.getCurrentTime() / duration;
                        loaded = player.getVideoLoadedFraction() * 100;
                    }
                    // This was calculated manually, but cant have
                    // outerwidth without adding jquery
                    const handleOuterWidth = 15;
                    let handleX = played * this.elm[0].clientWidth / 100 - handleOuterWidth / 2  ;
                    handleX = Math.min(Math.max(0, handleX), this.elm[0].clientWidth - handleOuterWidth);
                    $loaded.css('width', loaded + '%');
                    $played.css('width', played + '%');
                    $handle.css('left', handleX + 'px');
                };
                // Update the progress on an interval when playing
                player.onProgress(function(){
                    // The interval calls updateProgress with a number, so we need to add this inner fn
                    updateProgress();
                });

                // When someone seeks the video update the progress to the intended seek time
                player.on('seekToBegin', (seekTime) => updateProgress(seekTime.newTime));

                // Update the progress every time there state changes
                player.on('onStateChange', updateProgress);


                let playStatus = null;
                this.scope.onSliderDown = function () {
                    // Save the status of the player at the begining of the dragndrop
                    playStatus = player.getPlayerState();
                    player.pause();
                };

                this.scope.onSliderMove = function(percentage) {
                    // See what second it corresponds to
                    const sec = Math.round(duration * percentage);
                    // player.eventSeekTo(sec, false);
                    updateProgress(sec);
                };

                this.scope.onSliderUp = function(percentage) {
                    // See what second it corresponds to
                    const sec = Math.round(duration * percentage);
                    if (playStatus === YT.PlayerState.PLAYING || playStatus === YT.PlayerState.PAUSED) {
                        // Load it in the player
                        player.eventSeekTo(sec, true);
                    } else {
                        player.startLoading(sec);
                    }

                    // If it was playin before, play now as well
                    if (playStatus === YT.PlayerState.PLAYING) {
                        player.play();
                    }
                };

                this.scope.markers = player.getMarkers();

                player.on('markerListChanged', () =>  this.scope.markers = player.getMarkers());
            });
    }
}


