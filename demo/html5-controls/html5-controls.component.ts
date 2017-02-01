import {Component} from 'src/ng-helper/component';
import * as angular from 'angular';
import {RxPlayerComponent} from 'src/directive/rx-player.component';
import 'src/service/html5-player.service';

import 'src/main';
import 'rxPlayerTpl';

// Create the app module
angular.module('demoHtml5Controls', ['rxPlayer', 'rxPlayerTpls']);

@Component({
    selector: 'html5ControlsDemo',
    templateUrl: '/demo/html5-controls/html5-controls.component.html',
    directives: [RxPlayerComponent]
})
class Html5ControlsDemoComponent {
    videoSource = {
        player: 'HTML5Player',
        sources: [{
            src: 'https://media.w3.org/2010/05/sintel/trailer.ogv',
            type: 'video/ogg'
        }]
    };

    static $inject = [];
    constructor() {
    }
}
