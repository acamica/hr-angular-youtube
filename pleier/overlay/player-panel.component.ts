import {Component, bindToCtrlCallOnInit} from '../ng-helper/facade';
import {YoutubePlayer} from '../players/youtube/youtube-player.model';
import {PleierComponent} from '../players/pleier.component';

type IShowReason = 'showOnHover' | 'showOnPause';

@Component({
    selector: 'playerPanel',
    link: bindToCtrlCallOnInit(['pleier']),
    require: ['^pleier'],
    transclude: true,
    templateUrl: '/template/overlay/player-panel.component.html',
})
export class PlayerPanelComponent {
    private pleier: PleierComponent;

    static $inject = ['$element', '$attrs', '$animate', '$timeout'];
    constructor (
            private elm: ng.IAugmentedJQuery,
            private attrs: ng.IAttributes,
            private $animate: any,
            private $timeout: ng.ITimeoutService) {
    }

    ngOnInit () {
        const $overlay = this.pleier.getOverlayElement();
        this.pleier
            .player$
            .subscribe((player: YoutubePlayer) => {
                const whoWantsToShow: any = {};

                const show = (cause: IShowReason) => {
                    whoWantsToShow[cause] = true;
                    this.$animate.addClass(this.elm, 'ng-show');
                };

                const hide = (cause: IShowReason) => {
                    delete whoWantsToShow[cause];
                    if (Object.keys(whoWantsToShow).length === 0 ) {
                        this.$animate.removeClass(this.elm, 'ng-show');
                    }
                };

                if ('showOnHover' in this.attrs && this.attrs.showOnHover !== false) {
                    const showOnHover = parseInt(this.attrs.showOnHover);
                    let cancelTimerFn: ng.IPromise<void> = null;
                    const cancelTimer = () => {
                        if (cancelTimerFn !== null) {
                            this.$timeout.cancel(cancelTimerFn);
                        }
                        cancelTimerFn = null;
                    };

                    $overlay.on('mouseenter', () => {
                        cancelTimer();
                        show('showOnHover');
                        if (!isNaN(showOnHover)) {
                            cancelTimerFn = this.$timeout(() => hide('showOnHover'), showOnHover);
                        }
                    });

                    $overlay.on('mouseleave', () => {
                        cancelTimer();
                        hide('showOnHover');
                    });
                }

                const showOnPause = (event: {data: YT.PlayerState}) => {
                    if (event.data === YT.PlayerState.PLAYING) {
                        hide('showOnPause');
                    } else {
                        show('showOnPause');
                    }
                };
                if ('showOnPause' in this.attrs && this.attrs.showOnPause !== false) {
                    player.on('onStateChange', showOnPause);
                    showOnPause({data: player.getPlayerState()});
                }
            });
    }
}

