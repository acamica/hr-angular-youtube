import {Component} from 'src/ng-helper/component';
import 'src/main';
import 'rxPlayerTpl';

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
