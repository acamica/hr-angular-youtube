import * as angular from 'angular';
import {Component} from 'pleier/ng-helper/facade';
import {fromAngularWatch} from 'pleier/util/rx/facade';
import {setPlayerVarDefaultOption} from 'pleier/players/youtube/youtube.service';
import {IVideoSource, IYoutubeVideoSource, PleierComponent} from 'pleier/main';
import 'pleier/main';

// TODO: Refactor to @Injectable and providers
// http://blog.rangle.io/configurable-services-in-angular-2/
// Create the app module and configure it
angular
    .module('demoControls', ['pleier', 'pleierTpls']);
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
    directives: [PleierComponent],
})
export class ControlsDemoComponent {
    videoId = 'QjX9Wu-MJ-s';
    videoSource: IVideoSource;
    playerCtrl: PleierComponent;

    static $inject = ['$scope'];
    constructor ($scope: ng.IScope) {
        fromAngularWatch(() => this.videoId, $scope)
            .map(videoId => {
                return {
                    player: 'YoutubePlayer',
                    youtubeId: videoId
                } as IYoutubeVideoSource;
            })
            .subscribe(source => this.videoSource = source);
    }

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
