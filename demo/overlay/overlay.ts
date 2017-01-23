import * as angular from 'angular';
import 'src/main';
import 'rxPlayerTpl';
import 'ui.bootstrap';

angular.module('demoOverlay', ['rxPlayer', 'rxPlayerTpls', 'ui.bootstrap'])
    .config(['youtubeProvider', function(youtubeProvider) {
        // This options are the ones from here
        // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
        youtubeProvider.setPlayerVarOption('controls', 0);
        youtubeProvider.setPlayerVarOption('rel', 0);
        youtubeProvider.setPlayerVarOption('modestbranding', 1);
    }])
    .controller('OverlayDemoCtrl', ['$scope', function($scope){
        $scope.id = 'QjX9Wu-MJ-s';
    }]);




