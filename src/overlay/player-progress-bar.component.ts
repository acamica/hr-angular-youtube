import {Observable} from 'src/util/rx/facade';
import {Component, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {RxPlayerComponent} from 'src/directive/rx-player.component';
import * as angular from 'angular';

@Component({
    selector: 'playerProgressBar',
    templateUrl: '/template/overlay/player-progress-bar.component.html',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer']
})
export class PlayerProgressBar {
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$element', '$scope'];
    constructor (private elm, private scope) {
    }

    ngOnInit () {
        const $played = angular.element(this.elm[0].querySelector('.hr-yt-played'));
        const $loaded = angular.element(this.elm[0].querySelector('.hr-yt-loaded'));
        const $handle = angular.element(this.elm[0].querySelector('.hr-yt-handle'));

        // TODO: See what happens when it ends
            // if (player.getPlayerState() === YT.PlayerState.ENDED ) {
            //     played = 100;
            //     loaded = 100;

            // } else {
            //     played = 100 * player.getCurrentTime() / duration;
            //     loaded = player.getVideoLoadedFraction() * 100;
            // }

        // Need to pass this
        // loaded = player.getVideoLoadedFraction() * 100;
        const updateProgress = (sec: number, duration: number, loaded: number) => {
            const played = 100 * sec / duration;
            // This was calculated manually, but cant have
            // outerwidth without adding jquery
            const handleOuterWidth = 15;
            let handleX = played * this.elm[0].clientWidth / 100 - handleOuterWidth / 2  ;
            handleX = Math.min(Math.max(0, handleX), this.elm[0].clientWidth - handleOuterWidth);
            $loaded.css('width', loaded + '%');
            $played.css('width', played + '%');
            $handle.css('left', handleX + 'px');
        };

        // TODO: see if needed Update the progress every time there state changes
        // player.on('onStateChange', updateProgress);


        // When someone seeks the video update the progress to the intended seek time
        // player.on('seekToBegin', (seekTime) => updateProgress(seekTime.newTime));


        /* SEEK
        let playStatus = null;
        this.scope.onSliderDown = function () {
            // Save the status of the player at the begining of the dragndrop
            playStatus = player.getPlayerState();
            player.pause();
        };

        this.scope.onSliderMove = function (percentage) {
            // See what second it corresponds to
            const sec = Math.round(duration * percentage);
            // player.eventSeekTo(sec, false);
            updateProgress(sec);
        };

        this.scope.onSliderUp = function (percentage) {
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
        */
        // TODO: Reenable once the markers are refactored
        // this.scope.markers = player.getMarkers();
        // player.on('markerListChanged', () =>  this.scope.markers = player.getMarkers());

        this.rxPlayer
            .player$
            .switchMap(player =>
                Observable
                    .merge(player.progress$, player.loaded$)
                    .mapTo(player)
            )
            .map(player => {
                return {
                    time: player.getCurrentTime(),
                    duration: player.getDuration(),
                    loaded: player.getLoadedPercent()
                };
            })
            .subscribe(({time, duration, loaded}) => {
                console.log('loaded', loaded);
                updateProgress(time, duration, loaded);
                // const duration = player.getDuration();


                // // Update the progress on an interval when playing
                // player.onProgress(function (){
                //     // The interval calls updateProgress with a number, so we need to add this inner fn
                //     updateProgress();
                // });

            });
    }
}


