import * as angular from 'angular';
import {Component, mockNgOnInitLink} from 'rx-player/ng-helper/facade';
import {RxPlayerComponent} from 'rx-player/main';
import {Observable} from 'rx-player/util/rx/facade';
import {setPlayerVarDefaultOption} from 'rx-player/players/youtube/youtube.service';
import 'ui.bootstrap';
import 'rx-player/ng-helper/async.filter';

// TODO: Refactor to @Injectable and providers
// http://blog.rangle.io/configurable-services-in-angular-2/
// Create the app module and configure it
angular
    .module('demoOverlay', ['rxPlayer', 'rxPlayerTpls', 'ui.bootstrap']);

// This options are the ones from here
// https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
setPlayerVarDefaultOption('controls', 0);
setPlayerVarDefaultOption('rel', 0);
setPlayerVarDefaultOption('modestbranding', 1);


@Component({
    selector: 'overlayDemo',
    templateUrl: '/demo/overlay/overlay.component.html',
    link: mockNgOnInitLink(['playerCtrl']),
    directives: [RxPlayerComponent],
})
export class ControlsDemoComponent {
    videoSource = {
        player: 'YoutubePlayer',
        youtubeId: 'QjX9Wu-MJ-s'
    };
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




