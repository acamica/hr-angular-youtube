import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import {RxPlayerComponent} from 'src/directive/rx-player.component';

@Directive({
    selector: 'showIfMuted',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer']
})
export class ShowIfMutedDirective {
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$element', '$animate', '$attrs'];
    constructor (private elm, private $animate, private attrs) {
        // By default hide
        $animate.addClass(elm, 'ng-hide');
    }

    ngOnInit () {
        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) => {
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
