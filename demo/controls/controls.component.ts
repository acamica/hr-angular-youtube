import * as angular from 'angular';
import {Component} from 'rx-player/ng-helper/facade';
import {RxPlayerComponent} from 'rx-player/directive/rx-player.component';
import {fromAngularWatch} from 'rx-player/util/rx/facade';
import {setPlayerVarDefaultOption} from 'rx-player/players/youtube/youtube.service';
import 'rx-player/main';

// TODO: Refactor to @Injectable and providers
// http://blog.rangle.io/configurable-services-in-angular-2/
// Create the app module and configure it
angular
    .module('demoControls', ['rxPlayer', 'rxPlayerTpls']);
    // .config(['youtubeProvider', configureYoutubeProvider]);


// function configureYoutubeProvider (youtubeProvider) {
//     // This options are taken from here
//     // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
setPlayerVarDefaultOption('controls', 0);
setPlayerVarDefaultOption('showinfo', false);
setPlayerVarDefaultOption('modestbranding', 1);
setPlayerVarDefaultOption('disablekb', 1);
// }

setPlayerVarDefaultOption('controls', 0);
setPlayerVarDefaultOption('rel', 0);
setPlayerVarDefaultOption('modestbranding', 1);
// setPlayerVarDefaultOption('showinfo', 0);
setPlayerVarDefaultOption('disablekb', 1);
setPlayerVarDefaultOption('iv_load_policy', 3);
setPlayerVarDefaultOption('cc_load_policy', 1);
// setPlayerVarDefaultOption('cc_lang_pref', 'es');

// Undocumented options (not sure if works)
setPlayerVarDefaultOption('disableCast', 1);
setPlayerVarDefaultOption('nologo', 0);
@Component({
    selector: 'controlsDemo',
    templateUrl: '/demo/controls/controls.component.html',
    directives: [RxPlayerComponent],
})
export class ControlsDemoComponent {
    videoId = 'QjX9Wu-MJ-s';
    videoSource: any;

    static $inject = ['$scope'];
    constructor ($scope) {
        fromAngularWatch(() => this.videoId, $scope)
            .map(videoId => {
                return {
                    player: 'YoutubePlayer',
                    youtubeId: videoId
                };
            })
            .subscribe(source => this.videoSource = source);
    }

}
