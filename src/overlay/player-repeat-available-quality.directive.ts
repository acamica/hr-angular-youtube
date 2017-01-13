declare const YT;
import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {convertToYoutubeArray} from 'src/service/youtube-quality-map.service';

// TODO: this is similar to a behaviour directive, refactor so we don't
// need to use the repeat logic
@Directive({
    selector: 'playerRepeatAvailableQuality',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer'],
    replace: true,
    priority: 1000,

    // BUUU :'(
    template: function (tElm) {
        tElm.removeAttr('player-repeat-available-quality');
        tElm.attr('ng-repeat', '$quality in availableQuality');
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
            .then(player => {
                // Youtube doesnt inform you on the available qualities until loading video
                const unbind = player.on('onStateChange', (event) => {
                    if (event.data === YT.PlayerState.PLAYING) {
                        unbind();
                        this.scope.availableQuality = convertToYoutubeArray(player.getAvailableQualityLevels());
                        if (this.attrs.hasOwnProperty('reverse')) {
                            this.scope.availableQuality.reverse();
                        }

                    }
                });
                // So default is Auto
                this.scope.availableQuality = ['Auto'];
            });
    }
}




