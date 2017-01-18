import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/service/youtube-player.model';
@Directive({
    selector: 'playerSetQuality',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer']
})
export class PlayerCurrentTimeComponent {
    private youtubePlayer: any;

    static $inject = ['$element', '$parse', '$attrs', '$scope'];
    constructor (private elm, private $parse, private attrs, private scope) {
    }

    ngOnInit() {
        const fn = this.$parse(this.attrs.playerSetQuality);

        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) =>
                this.elm.on('click', () =>
                        this.scope.$apply(() =>
                            player.setHumanPlaybackQuality(fn(this.scope))
                        )
                )
            );
    }
}
