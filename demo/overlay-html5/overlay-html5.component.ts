import * as angular from 'angular';
import {Component, mockNgOnInitLink} from 'rx-player/ng-helper/facade';
import {Observable} from 'rx-player/util/rx/facade';
import {RxPlayerComponent} from 'rx-player/players/rx-player.component';
import 'rx-player/main';
import 'rx-player/players/html5/html5-player.service';
import 'rx-player/ng-helper/async.filter';
import 'ui.bootstrap';

// Create the app module and configure it
angular
    .module('demoOverlayHTML5', ['rxPlayer', 'rxPlayerTpls', 'ui.bootstrap']);


@Component({
    selector: 'overlayDemoHtml5',
    templateUrl: '/demo/overlay-html5/overlay-html5.component.html',
    link: mockNgOnInitLink(['playerCtrl']),
    directives: [RxPlayerComponent],
})
export class ControlsDemoHTML5Component {
    videoSource = {
        player: 'HTML5Player',
        sources: [{
            src: 'https://media.w3.org/2010/05/sintel/trailer.ogv',
            type: 'video/ogg'
        }]
    };
    // videoSource = {
    //     player: 'YoutubePlayer',
    //     youtubeId: 'QjX9Wu-MJ-s'
    // };
    static $inject = ['$scope'];
    constructor (private $scope) {

    }


    play () {
        this.$scope['playerCtrl'].player$
            .take(1)
            .subscribe(player => player.play());
    }

    pause () {
        this.$scope['playerCtrl'].player$
            .take(1)
            .subscribe(player => player.pause());
    }

    isPlaying: Observable<boolean>;
    ngOnInit () {
        this.isPlaying = this.$scope['playerCtrl'].player$
                    .switchMap(player => player.playState$.mapTo(player))
                    .map(player => player.isPlaying())
                    .startWith(false);
    }
}




