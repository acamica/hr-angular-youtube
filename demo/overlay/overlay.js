// /* global angular */
angular.module('demoOverlay', ['hrAngularYoutube', 'ui.bootstrap'])
    .config(['youtubeProvider', function(youtubeProvider) {
        // This options are the ones from here
        // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
        youtubeProvider.setPlayerVarOption('controls',0);
        youtubeProvider.setPlayerVarOption('rel',0);
        youtubeProvider.setPlayerVarOption('modestbranding',1);
    }])
    .controller('OverlayDemoCtrl', ['$scope', function($scope){
        $scope.id = 'QjX9Wu-MJ-s';
    }]);

System.import('src/main').then(function () {

    // Manually bootstrap angular (same as ng-app but after the module loader kicks in)
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['demoOverlay'], {strictDi: true, debugInfoEnabled: true});
    });

});


