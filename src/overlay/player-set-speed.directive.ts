import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';

@Directive({
    selector: 'playerSetSpeed',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer']
})
export class PlayerSetSpeedDirective {
    private youtubePlayer: any;

    static $inject = ['$element', '$attrs', '$parse', '$scope'];
    constructor (private elm, private attrs, private $parse, private scope) {
    }

    ngOnInit() {
        const speedFn = this.$parse(this.attrs.playerSetSpeed);
        this.youtubePlayer
            .getPlayer()
            .then(player =>
                this.elm.on('click', () =>
                    this.scope.$apply(() => {
                        const speed = speedFn(this.scope);
                        player.setPlaybackRate(speed);
                    })
                )
            );
    }
}
