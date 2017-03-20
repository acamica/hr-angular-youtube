import {Observable, observeScopeDestroy} from '../util/rx/facade';
import {IVideoPlayer} from '../players/video-player.model';
import {Directive, mockNgOnInitFromAttr} from '../ng-helper/facade';

@Directive({
    selector: 'playerCurrentSpeed',
    link: mockNgOnInitFromAttr('playerCurrentSpeed'),
})
export class PlayerCurrentSpeedDirective {

    static $inject = ['$scope', '$element', '$attrs', '$parse'];
    constructor (private $scope, private elm, private attr, private $parse) {
    }

    ngOnInit () {
        const player$ = this.$parse(this.attr.playerCurrentSpeed)(this.$scope) as Observable<IVideoPlayer>;
        const scopeDestroy$ = observeScopeDestroy(this.$scope);
        player$
            .switchMap(player => player.playbackRate$)
            .map(event => event.rate)
            .takeUntil(scopeDestroy$)
            .subscribe(rate => {
                this.elm.html(rate);
            });
    }
}


