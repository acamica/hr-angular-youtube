import * as angular from 'angular';
import {Component} from 'src/ng-helper/facade';
import {RxPlayerComponent} from 'src/directive/rx-player.component';
import 'src/main';
import 'rxPlayerTpl';
import 'ui.bootstrap';
import 'src/ng-helper/async.filter';

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




