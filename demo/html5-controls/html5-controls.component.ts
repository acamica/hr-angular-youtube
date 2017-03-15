import {Component} from 'rx-player/ng-helper/component';
import * as angular from 'angular';
import {RxPlayerComponent} from 'rx-player/directive/rx-player.component';
import 'rx-player/players/html5/html5-player.service';
import 'rx-player/main';

// Create the app module
angular.module('demoHtml5Controls', ['rxPlayer', 'rxPlayerTpls']);

@Component({
    selector: 'html5ControlsDemo',
    templateUrl: '/demo/html5-controls/html5-controls.component.html',
    directives: [RxPlayerComponent]
})
export class Html5ControlsDemoComponent {
    videoSource = {
        player: 'HTML5Player',
        sources: [{
            src: 'https://media.w3.org/2010/05/sintel/trailer.ogv',
            type: 'video/ogg'
        }]
    };
}

