import * as angular from 'angular';
import {Observable, observeScopeDestroy} from '../util/rx/facade';
import {Component, mockNgOnInitLink, composeLinkFn, localTemplateVariableLink} from '../ng-helper/facade';
import {IVideoPlayer} from '../players/video-player.model';


@Component({
    selector: 'playerVolumeHorizontal',
    templateUrl: '/template/overlay/player-volume-horizontal.component.html',
    link: composeLinkFn([
        mockNgOnInitLink(['player']),
        localTemplateVariableLink
    ]),
    scope: {
        player: '='
    },
    transclude: true,
})
export class PlayerVolumeHorizontalComponent {
    private player: Observable<IVideoPlayer>;
    isMuted: Observable<boolean>;

    static $inject = ['$element', '$scope'];
    constructor (private elm, private $scope) {
    }

    private $volumeBar = angular.element(this.elm[0].querySelector('.hr-yt-volume-hr-bar'));
    private $settedBar = angular.element(this.elm[0].querySelector('.hr-yt-setted'));
    private $handle    = angular.element(this.elm[0].querySelector('.hr-yt-handle'));

    private updateVolumeBar (volume) {
        let handleX = volume * this.$volumeBar[0].clientWidth - this.$handle[0].clientWidth / 2  ;
        handleX = Math.min(Math.max(0, handleX), this.$volumeBar[0].clientWidth - this.$handle[0].clientWidth / 2);
        this.$settedBar.css('width', volume * 100 + '%');
        this.$handle.css('left', handleX + 'px');
    }

    ngOnInit () {
        const scopeDestroy$ = observeScopeDestroy(this.$scope);
        // Update the volume bar whenever we change volume
        this.player
            // For every volume event
            .switchMap(player => player.volumeState$.mapTo(player))
            // And once for the initial value
            .merge(this.player.take(1))
            // Get the volume
            .map(player => player.getVolume())
            .takeUntil(scopeDestroy$)
            // And update the volume bar
            .subscribe(volume => {
                this.updateVolumeBar(volume / 100);
            });

        // Recipy to see if its muted
        this.isMuted = this.player
                            // For every volume event
                            .switchMap(player => player.volumeState$.mapTo(player))
                            // And once for the initial value
                            .merge(this.player.take(1))
                            // See if we are muted
                            .map(player => player.isMuted())
                            .takeUntil(scopeDestroy$);
    }

    updateVolume (volume) {
        this.setVolume(volume);
        this.updateVolumeBar(volume);
    }

    setVolume (volume) {
        this.player
            .take(1)
            .subscribe(player => player.setVolume(volume * 100));
    }

    toggleMute () {
        this.player
            .take(1)
            .subscribe(player => player.toggleMute());
    }
}
