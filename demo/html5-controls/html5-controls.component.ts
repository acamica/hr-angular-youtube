import {Component} from 'pleier/ng-helper/component';
import * as angular from 'angular';
import {PleierComponent} from 'pleier/players/pleier.component';
import 'pleier/players/html5/html5-player.service';
import 'pleier/main';

// Create the app module
angular.module('demoHtml5Controls', ['pleier', 'pleierTpls']);

@Component({
    selector: 'html5ControlsDemo',
    templateUrl: '/demo/html5-controls/html5-controls.component.html',
    directives: [PleierComponent]
})
export class Html5ControlsDemoComponent {
    videoSource = {
        player: 'HTML5Player',
        sources: [{
            src: 'https://media.w3.org/2010/05/sintel/trailer.ogv',
            type: 'video/ogg'
        }]
    };
    playerCtrl: PleierComponent;

    play () {
        this.playerCtrl.player$
            .take(1)
            .subscribe(player => player.play());
    }

    pause () {
        this.playerCtrl.player$
            .take(1)
            .subscribe(player => player.pause());
    }
}

