import * as angular from 'angular';
import {Component} from 'pleier/ng-helper/facade';
import {PleierComponent} from 'pleier/main';
import {setPlayerVarDefaultOption} from 'pleier/players/youtube/youtube.service';
import {PlayPauseComponent, TimeControlComponent} from '../common-controls/facade';

import 'ui.bootstrap';
import 'pleier/ng-helper/async.filter';

// TODO: Refactor to @Injectable and providers
// http://blog.rangle.io/configurable-services-in-angular-2/
// Create the app module and configure it
angular
    .module('demoOverlay', ['pleier', 'pleierTpls', 'ui.bootstrap']);

// This options are the ones from here
// https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
setPlayerVarDefaultOption('controls', 0);
setPlayerVarDefaultOption('rel', 0);
setPlayerVarDefaultOption('modestbranding', 1);


@Component({
    selector: 'overlayDemo',
    templateUrl: '/demo/overlay/overlay.component.html',
    directives: [PleierComponent, PlayPauseComponent, TimeControlComponent],
})
export class OverlayDemoComponent {
    videoSource = {
        player: 'YoutubePlayer',
        youtubeId: 'QjX9Wu-MJ-s'
    };

    playerCtrl: PleierComponent;
}




