import {Component} from '../../ng-helper/facade';
import {Observable, observeScopeDestroy} from '../../util/rx/facade';
import {IVideoPlayer} from '../../players/facade';
import {IMarker} from '../../markers/facade';

@Component({
    selector: 'progressBarMarker',
    scope: {
        player: '<',
        marker: '='
    }
})
export class ProgressBarMarker {
    private player: Observable<IVideoPlayer>;
    private marker: IMarker;

    static $inject = ['$element', '$scope'];
    constructor (private elm, private scope) {
    }

    $onInit () {
        const scopeDestroy$ = observeScopeDestroy(this.scope);
        this.player
            .takeUntil(scopeDestroy$)
            .subscribe(player => {
                const duration = player.getDuration();
                // If the marker has extra css, add it
                // if (marker.barCss !== '') {
                //     this.elm.addClass(marker.barCss);
                // }

                const setRelativeTime = () => {
                    const relativeTime = 100 * this.marker.startTime / duration;
                    this.elm.css('left', relativeTime + '%');
                };

                setRelativeTime();

                // if (this.marker.hasOwnProperty('mutable') && this.marker.mutable) {
                //     this.scope.$watch(
                //         function () {
                //             return this.marker.startTime;
                //         },
                //         function (newTime, oldTime) {
                //             if (newTime === oldTime) {
                //                 return;
                //             }
                //             setRelativeTime();
                //         }
                //     );
                // }
            });
    }
}
