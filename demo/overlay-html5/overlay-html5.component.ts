import * as angular from 'angular';
import {Component} from 'pleier/ng-helper/facade';
import {PleierComponent} from 'pleier/main';
import {PlayPauseComponent, TimeControlComponent} from '../common-controls/facade';
import 'pleier/players/html5/html5-player.service';
import 'pleier/ng-helper/async.filter';
import 'ui.bootstrap';

// Create the app module and configure it
angular
    .module('demoOverlayHTML5', ['pleier', 'pleierTpls', 'ui.bootstrap']);


@Component({
    selector: 'overlayDemoHtml5',
    templateUrl: '/demo/overlay-html5/overlay-html5.component.html',
    directives: [PleierComponent, PlayPauseComponent, TimeControlComponent],
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




