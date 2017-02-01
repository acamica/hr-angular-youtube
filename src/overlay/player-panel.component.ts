import {Component, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';

@Component({
    selector: 'playerPanel',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer'],
    transclude: true,
    templateUrl: '/template/overlay/player-panel.component.html',
})
export class PlayerPanelComponent {
    private youtubePlayer: any;

    static $inject = ['$element', '$scope', '$attrs', '$animate', '$timeout'];
    constructor (private elm, private scope, private attrs, private $animate, private $timeout) {
    }

    ngOnInit() {
        const $overlay = this.youtubePlayer.getOverlayElement();
        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) => {
                let whoWantsToShow = {};

                const show = (cause) => {
                    whoWantsToShow[cause] = true;
                    this.$animate.addClass(this.elm, 'ng-show');
                };

                const hide = (cause) => {
                    delete whoWantsToShow[cause];
                    if (Object.keys(whoWantsToShow).length === 0 ) {
                        this.$animate.removeClass(this.elm, 'ng-show');
                    }
                };

                if ('showOnHover' in this.attrs && this.attrs.showOnHover !== false) {
                    const showOnHover = parseInt(this.attrs.showOnHover);
                    let cancelTimerFn = null;
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

                const showOnPause = (event) => {
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

