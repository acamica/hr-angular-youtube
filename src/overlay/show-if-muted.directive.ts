import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';

@Directive({
    selector: 'showIfMuted',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer']
})
export class ShowIfMutedDirective {
    private youtubePlayer: any;

    static $inject = ['$element', '$animate', '$attrs'];
    constructor (private elm, private $animate, private attrs) {
        // By default hide
        $animate.addClass(elm, 'ng-hide');
    }

    ngOnInit() {
        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) => {
                const hideOrShow = () => {
                    let show = !player.isMuted();
                    if (this.attrs.showIfMuted === 'true') {
                        show = !show;
                    }

                    if ( show ) {
                        this.$animate.removeClass(this.elm, 'ng-hide');
                    } else {
                        this.$animate.addClass(this.elm, 'ng-hide');
                    }
                };
                hideOrShow();
                player.on('muteChange', hideOrShow);
            });
    }
}
