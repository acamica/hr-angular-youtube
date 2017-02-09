import {Observable} from 'src/util/rx/facade';
import {IVideoPlayer} from 'src/service/video-player.model';
import {Directive, mockNgOnInitFromAttr} from 'src/ng-helper/facade';

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
        player$
            .switchMap(player => player.playbackRate$)
            .map(event => event.rate)
            .subscribe(rate => {
                this.elm.html(rate);
            });
    }
}


