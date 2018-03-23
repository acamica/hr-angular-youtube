import {Directive, bindToCtrlCallOnInit} from '../ng-helper/facade';
import {PleierComponent} from '../players/pleier.component';
// TODO: this is similar to a behaviour directive, refactor so we don't
// need to use the repeat logic
// We could add the whole control into a component, expose the available speeds
// and use a normal ng-repeat

export interface IDirectiveScope extends ng.IScope {
    availableSpeeds: number[];
}

@Directive({
    selector: 'playerRepeatAvailableSpeed',
    link: bindToCtrlCallOnInit(['pleier']),
    require: ['^pleier'],
    replace: true,
    priority: 1000,

    // BUUU :'(
    template: function (tElm) {
        tElm.removeAttr('player-repeat-available-speed');
        tElm.attr('ng-repeat', '$speed in availableSpeeds');
        return (tElm as any)[0].outerHTML;
    }
})
export class PlayerRepeatAvailableSpeedDirective {
    private pleier: PleierComponent;

    static $inject = ['$scope', '$attrs'];
    constructor (private scope: IDirectiveScope, private attrs: ng.IAttributes) {
    }

    ngOnInit () {
        this.pleier
            .player$
            .subscribe(player => {
                this.scope.availableSpeeds = player.getAvailablePlaybackRates();
                if (this.attrs.hasOwnProperty('reverse')) {
                    this.scope.availableSpeeds.reverse();
                }
            });
    }
}

