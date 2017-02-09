import * as angular from 'angular';
import {Component} from 'src/ng-helper/facade';
import {RxPlayerComponent} from 'src/directive/rx-player.component';
import 'src/main';
import 'src/players/html5/html5-player.service';
import 'src/ng-helper/async.filter';
import 'rxPlayerTpl';
import 'ui.bootstrap';

// TODO: Refactor to @Injectable and providers
// http://blog.rangle.io/configurable-services-in-angular-2/
// Create the app module and configure it
angular
    .module('demoOverlayHTML5', ['rxPlayer', 'rxPlayerTpls', 'ui.bootstrap'])
    .config(['youtubeProvider', configureYoutubeProvider]);

function configureYoutubeProvider (youtubeProvider) {
    // This options are the ones from here
    // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
    youtubeProvider.setPlayerVarOption('controls', 0);
    youtubeProvider.setPlayerVarOption('rel', 0);
    youtubeProvider.setPlayerVarOption('modestbranding', 1);
}


@Component({
    selector: 'overlayDemoHtml5',
    templateUrl: '/demo/overlay-html5/overlay-html5.component.html',
    directives: [RxPlayerComponent],
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




