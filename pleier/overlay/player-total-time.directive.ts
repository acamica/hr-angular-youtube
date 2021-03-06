import {Observable} from '../util/rx/facade';
import {IVideoPlayer} from '../players/video-player.model';
import {Directive, mockNgOnInitFromAttr} from '../ng-helper/facade';
import {readableTime} from '../util/readable-time.util';

@Directive({
    selector: 'playerTotalTime',
    link: mockNgOnInitFromAttr('playerTotalTime'),
    require: ['^pleier']
})
export class PlayerTotalTimeDirective {

    static $inject = ['$scope', '$element', '$attrs', '$parse'];
    constructor (
            private $scope: ng.IScope,
            private elm: ng.IAugmentedJQuery,
            private attr: ng.IAttributes,
            private $parse: ng.IParseService) {
    }

    ngOnInit () {
        const player$ = this.$parse(this.attr.playerTotalTime)(this.$scope) as Observable<IVideoPlayer>;
        player$
            // Get the duration of the video
            .map(player => player.getDuration())
            .map(time => readableTime(time))
            // And assing it to the HTML
            .subscribe(readableTime => this.elm.html(readableTime));
    }
}
