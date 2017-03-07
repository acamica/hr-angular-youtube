import {Observable, observeScopeDestroy} from 'src/util/rx/facade';
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
        const scopeDestroy$ = observeScopeDestroy(this.$scope);
        player$
            // Whenever the player updates its progress or a seek is completed
            .switchMap(player =>
                Observable.merge(
                    player.progress$,
                    player.seeked$
                ).mapTo(player))
            // Get the current time in readable form
            // .map(event => event.time)
            .map(player => player.getCurrentTime())
            .map(time => readableTime(time))
            .takeUntil(scopeDestroy$)
            // And assing it to the HTML
            .subscribe(readableTime => this.elm.html(readableTime));
    }
}
