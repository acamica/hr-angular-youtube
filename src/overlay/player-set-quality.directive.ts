import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';

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
            .then(player =>
                this.elm.on('click', () =>
                        this.scope.$apply(() =>
                            player.setHumanPlaybackQuality(fn(this.scope))
                        )
                )
            );
    }
}
