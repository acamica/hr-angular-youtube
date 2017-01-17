System.register(["angular", "src/main", "hrAngularYoutubeTpl", "ui.bootstrap"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular;
    return {
        setters: [
            function (angular_1) {
                angular = angular_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            }
        ],
        execute: function () {
            angular.module('demoOverlay', ['hrAngularYoutube', 'hrAngularYoutubeTpls', 'ui.bootstrap'])
                .config(['youtubeProvider', function (youtubeProvider) {
                    // This options are the ones from here
                    // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
                    youtubeProvider.setPlayerVarOption('controls', 0);
                    youtubeProvider.setPlayerVarOption('rel', 0);
                    youtubeProvider.setPlayerVarOption('modestbranding', 1);
                }])
                .controller('OverlayDemoCtrl', ['$scope', function ($scope) {
                    $scope.id = 'QjX9Wu-MJ-s';
                }]);
        }
    };
});
