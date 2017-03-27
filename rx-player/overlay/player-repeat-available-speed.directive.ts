import {Directive, bindToCtrlCallOnInit} from '../ng-helper/facade';
import {RxPlayerComponent} from '../players/rx-player.component';
// TODO: this is similar to a behaviour directive, refactor so we don't
// need to use the repeat logic
// We could add the whole control into a component, expose the available speeds
// and use a normal ng-repeat
@Directive({
    selector: 'playerRepeatAvailableSpeed',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer'],
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
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$scope', '$attrs'];
    constructor (private scope, private attrs) {
    }

    ngOnInit () {
        this.rxPlayer
            .player$
            .subscribe(player => {
                this.scope.availableSpeeds = player.getAvailablePlaybackRates();
                if (this.attrs.hasOwnProperty('reverse')) {
                    this.scope.availableSpeeds.reverse();
                }
            });
    }
}

