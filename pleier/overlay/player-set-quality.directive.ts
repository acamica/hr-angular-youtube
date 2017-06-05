import {Directive, bindToCtrlCallOnInit} from '../ng-helper/facade';
import {YoutubePlayer} from '../players/youtube/youtube-player.model';
import {PleierComponent} from '../players/pleier.component';

@Directive({
    selector: 'playerSetQuality',
    link: bindToCtrlCallOnInit(['pleier']),
    require: ['^pleier']
})
export class PlayerSetQualityDirective {
    private pleier: PleierComponent;

    static $inject = ['$element', '$parse', '$attrs', '$scope'];
    constructor (
            private elm: ng.IAugmentedJQuery,
            private $parse: ng.IParseService,
            private attrs: ng.IAttributes,
            private scope: ng.IScope) {
    }

    ngOnInit () {
        const fn = this.$parse(this.attrs.playerSetQuality);

        this.pleier
            .player$
            .subscribe((player: YoutubePlayer) =>
                this.elm.on('click', () =>
                        this.scope.$apply(() =>
                            player.setHumanPlaybackQuality(fn(this.scope))
                        )
                )
            );
    }
}
