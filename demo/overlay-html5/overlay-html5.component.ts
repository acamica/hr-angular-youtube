import * as angular from 'angular';
import {Component} from 'rx-player/ng-helper/facade';
import {RxPlayerComponent} from 'rx-player/directive/rx-player.component';
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


}




