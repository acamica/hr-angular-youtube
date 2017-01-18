import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/service/youtube-player.model';
// TODO: this is similar to a behaviour directive, refactor so we don't
// need to use the repeat logic
@Directive({
    selector: 'playerRepeatAvailableSpeed',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer'],
    replace: true,
    priority: 1000,

    // BUUU :'(
    template: function (tElm) {
        tElm.removeAttr('player-repeat-available-speed');
        tElm.attr('ng-repeat', '$speed in availableSpeeds');
        return tElm[0].outerHTML;
    }
})
export class PlayerRepeatAvailableSpeedDirective {
    private youtubePlayer: any;

    static $inject = ['$element', '$scope', '$attrs'];
    constructor (private elm, private scope, private attrs) {
    }

    ngOnInit() {
        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) => {
                this.scope.availableSpeeds = player.getAvailablePlaybackRates();
                if (this.attrs.hasOwnProperty('reverse')) {
                    this.scope.availableSpeeds.reverse();
                }
            });
    }
}

