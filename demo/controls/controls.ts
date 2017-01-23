import * as angular from 'angular';
import 'src/main';
import 'rxPlayerTpl';

angular.module('demoControls', ['rxPlayer', 'rxPlayerTpls'])
.config(['youtubeProvider', function(youtubeProvider) {
    // This options are the ones from here
    // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
    youtubeProvider.setPlayerVarOption('controls', 0);
    youtubeProvider.setPlayerVarOption('showinfo', false);
    youtubeProvider.setPlayerVarOption('modestbranding', 1);
    youtubeProvider.setPlayerVarOption('disablekb', 1);
}])

.controller('ControlsDemoCtrl', function(){
    this.id = 'QjX9Wu-MJ-s';
});
