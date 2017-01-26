import {Component} from 'src/ng-helper/component';
import * as angular from 'angular';
import 'src/main';
import 'rxPlayerTpl';

// Create the app module
angular.module('demoHtml5Controls', ['rxPlayer', 'rxPlayerTpls']);

@Component({
    selector: 'html5ControlsDemo',
    templateUrl: '/demo/html5-controls/html5-controls.component.html'
})
class Html5ControlsDemoComponent {
    private video: HTMLVideoElement;

    static $inject = ['$element'];
    constructor(private elm) {
        this.video = this.elm.find('video')[0];
    }

    playVideo() {
        this.video.play();
    }
    pauseVideo() {
        this.video.pause();
    }

}
