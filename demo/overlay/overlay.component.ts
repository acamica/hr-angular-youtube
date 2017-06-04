import * as angular from 'angular';
import {Component} from 'rx-player/ng-helper/facade';
import {RxPlayerComponent} from 'rx-player/main';
import {setPlayerVarDefaultOption} from 'rx-player/players/youtube/youtube.service';
import {PlayPauseComponent, TimeControlComponent} from '../common-controls/facade';

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
    directives: [RxPlayerComponent, PlayPauseComponent, TimeControlComponent],
})
export class OverlayDemoComponent {
    videoSource = {
        player: 'YoutubePlayer',
        youtubeId: 'QjX9Wu-MJ-s'
    };

    playerCtrl: RxPlayerComponent;
}




