import {Component, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import * as angular from 'angular';

@Component({
    selector: 'playerVolumeHorizontal',
    templateUrl: '/template/overlay/player-volume-horizontal.component.html',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    transclude: true,
    require: ['^youtubePlayer']
})
export class PlayerVolumeHorizontalComponent {
    private youtubePlayer: any;

    static $inject = ['$element', '$scope'];
    constructor (private elm, private scope) {
    }

    ngOnInit() {
        const $volumeBar = angular.element(this.elm[0].querySelector('.hr-yt-volume-hr-bar'));
        const $settedBar = angular.element(this.elm[0].querySelector('.hr-yt-setted'));
        const $handle    = angular.element(this.elm[0].querySelector('.hr-yt-handle'));

        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) => {
                const updateVolumeBar = (volume) => {
                    let handleX = volume * $volumeBar[0].clientWidth - $handle[0].clientWidth / 2  ;
                    handleX = Math.min(Math.max(0, handleX),$volumeBar[0].clientWidth - $handle[0].clientWidth / 2);
                    $settedBar.css('width', volume * 100 + '%');
                    $handle.css('left', handleX + 'px');
                };

                this.scope.toggleMute = function() {
                    player.toggleMute();
                };

                this.scope.onSliderMove = function (volume) {
                    player.setVolume(volume * 100);
                    updateVolumeBar(volume);
                };

                this.scope.onSliderUp = function (volume) {
                    player.setVolume(volume * 100);
                    updateVolumeBar(volume);
                };

                this.scope.$watch(
                    () => player.getVolume(),
                    (volumeFromModel) => updateVolumeBar(volumeFromModel / 100)
                );
            });
    }
}
