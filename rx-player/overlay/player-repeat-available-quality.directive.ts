import {Directive, bindToCtrlCallOnInit} from '../ng-helper/facade';
import {convertToYoutubeArray} from '../players/youtube/youtube-quality-map.service';
import {YoutubePlayer} from '../players/youtube/youtube-player.model';
import {RxPlayerComponent} from '../directive/rx-player.component';

// TODO: this is similar to a behaviour directive, refactor so we don't
// need to use the repeat logic
@Directive({
    selector: 'playerRepeatAvailableQuality',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer'],
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
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$scope', '$attrs'];
    constructor (private scope, private attrs) {
    }

    ngOnInit () {
        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) => {
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




