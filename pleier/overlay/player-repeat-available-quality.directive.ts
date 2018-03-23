import {Directive, bindToCtrlCallOnInit} from '../ng-helper/facade';
// import {convertToYoutubeArray} from '../players/youtube/youtube-quality-map.service';
// import {YoutubePlayer} from '../players/youtube/youtube-player.model';
import {PleierComponent} from '../players/pleier.component';

// TODO: this is similar to a behaviour directive, refactor so we don't
// need to use the repeat logic
@Directive({
    selector: 'playerRepeatAvailableQuality',
    link: bindToCtrlCallOnInit(['pleier']),
    require: ['^pleier'],
    replace: true,
    priority: 1000,

    // BUUU :'(
    template: function (tElm) {
        tElm.removeAttr('player-repeat-available-quality');
        tElm.attr('ng-repeat', '$quality in availableQuality');
        return (tElm as any)[0].outerHTML;
    }
})
export class PlayerRepeatAvailableQualityDirective {
    private pleier: PleierComponent;

    static $inject = ['$scope', '$attrs'];
    // constructor (private scope: any, private attrs: ng.IAttributes) {
    constructor () {
    }

    ngOnInit () {
        this.pleier
            .player$
            .subscribe(player => {
                // Youtube doesnt inform you on the available qualities until loading video
                // TODO: re-implement feature
                // const unbind = player.on('onStateChange', (event: YT.OnStateChangeEvent ) => {
                //     if (event.data === YT.PlayerState.PLAYING) {
                //         unbind();
                //         this.scope.availableQuality = convertToYoutubeArray(player.getAvailableQualityLevels());
                //         if (this.attrs.hasOwnProperty('reverse')) {
                //             this.scope.availableQuality.reverse();
                //         }

                //     }
                // });
                // So default is Auto
                // this.scope.availableQuality = ['Auto'];
            });
    }
}




