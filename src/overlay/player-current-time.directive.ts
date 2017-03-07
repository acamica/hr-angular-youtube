import {Observable} from 'src/util/rx/facade';
import {IVideoPlayer} from 'src/service/video-player.model';
import {Directive, mockNgOnInitFromAttr} from 'src/ng-helper/facade';
import {readableTime} from 'src/service/readable-time.service';

@Directive({
    selector: 'playerCurrentTime',
    link: mockNgOnInitFromAttr('playerCurrentTime'),
})
export class PlayerCurrentTimeComponent {

    static $inject = ['$scope', '$element', '$attrs', '$parse'];
    constructor (private $scope, private elm, private attr, private $parse) {
    }

    ngOnInit () {
        const player$ = this.$parse(this.attr.playerCurrentTime)(this.$scope) as Observable<IVideoPlayer>;

        player$
            // TODO: ADD takeUntilScopeDestroy as switchMap doesn't care if the source completed
            // Whenever the player updates its progress
            .switchMap(player => player.progress$)
            // Get the current time in readable form
            .map(event => event.time)
            .map(time => readableTime(time))
            // And assing it to the HTML
            .subscribe(readableTime => this.elm.html(readableTime));
    }
}
