import {Directive, bindToCtrlCallOnInit} from '../ng-helper/facade';
import {YoutubePlayer} from '../players/youtube/youtube-player.model';
import {RxPlayerComponent} from '../players/rx-player.component';

@Directive({
    selector: 'playerSetSpeed',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer']
})
export class PlayerSetSpeedDirective {
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$element', '$attrs', '$parse', '$scope'];
    constructor (
            private elm: ng.IAugmentedJQuery,
            private attrs: ng.IAttributes,
            private $parse: ng.IParseService,
            private scope: ng.IScope) {
    }

    ngOnInit () {
        const speedFn = this.$parse(this.attrs.playerSetSpeed);

        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) =>
                this.elm.on('click',
                () =>
                    this.scope.$apply(() => {
                        const speed = speedFn(this.scope);
                        player.setPlaybackRate(speed);
                    })
                )
            );
    }
}
