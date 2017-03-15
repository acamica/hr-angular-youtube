import * as angular from 'angular';
import {Component} from 'rx-player/ng-helper/facade';
import {RxPlayerComponent} from 'rx-player/directive/rx-player.component';
import 'rx-player/main';
import 'ui.bootstrap';
import 'rx-player/ng-helper/async.filter';

// TODO: Refactor to @Injectable and providers
// http://blog.rangle.io/configurable-services-in-angular-2/
// Create the app module and configure it
angular
    .module('demoOverlay', ['rxPlayer', 'rxPlayerTpls', 'ui.bootstrap'])
    .config(['youtubeProvider', configureYoutubeProvider]);

function configureYoutubeProvider (youtubeProvider) {
    // This options are the ones from here
    // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
    youtubeProvider.setPlayerVarOption('controls', 0);
    youtubeProvider.setPlayerVarOption('rel', 0);
    youtubeProvider.setPlayerVarOption('modestbranding', 1);
}


@Component({
    selector: 'overlayDemo',
    templateUrl: '/demo/overlay/overlay.component.html',
    directives: [RxPlayerComponent],
})
export class ControlsDemoComponent {
    videoSource = {
        player: 'YoutubePlayer',
        youtubeId: 'QjX9Wu-MJ-s'
    };
}




