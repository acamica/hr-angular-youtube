import * as angular from 'angular';
let defaultOptions = {
    playerVars: {
        origin: location.origin + '/',
        enablejsapi: 1
    }
};
let autoload = true;

export class Provider {
    setAutoLoad (auto) {
        autoload = auto;
    };

    setOptions (options) {
        defaultOptions = options;
    };

    getOptions () {
        return defaultOptions;
    };

    setOption (name, value) {
        defaultOptions[name] = value;
    };

    setPlayerVarOption (name, value) {
        defaultOptions.playerVars[name] = value;
    };

    $get = ['$window', '$q', '$injector', function ($window, $q, $injector) {

        const apiLoaded = $q.defer();

        const apiLoadedPromise = apiLoaded.promise;

        // Youtube callback when API is ready
        $window.onYouTubeIframeAPIReady = function () {
            apiLoaded.resolve();
        };

        return {
            loadPlayer: function (playerFactoryName, elmOrId, options) {
                return apiLoadedPromise.then(function(){
                    const YoutubePlayer = $injector.get(playerFactoryName);

                    const videoReady = $q.defer();
                    let newOptions: any = {};
                    // Override main options
                    angular.extend(newOptions, angular.copy(defaultOptions), options);
                    // Override player var options
                    newOptions.playerVars = {}; // For some reason if I dont reset this angular.extend doesnt work as expected
                    angular.extend(newOptions.playerVars, angular.copy(defaultOptions.playerVars), options.playerVars);

                    const player = new YoutubePlayer(elmOrId, newOptions);
                    player.on('onReady', function() {
                        videoReady.resolve(player);
                    });
                    return videoReady.promise;
                });

            },
            getAutoLoad: function () {
                return autoload;
            }

        };
    }];
}


angular.module('hrAngularYoutube').provider('youtube', new Provider());


