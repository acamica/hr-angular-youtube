// TODO: Delete this?
import * as angular from 'angular';
import {Observable} from 'rxjs/Observable';
import {YoutubePlayer} from 'src/service/youtube-player.model';
import {IVideoPlayer} from 'src/service/video-player.model';
import {registerVideoPlayer} from 'src/service/rx-video.service';
import {getInjector} from 'src/ng-helper/facade';

const Factory = {
    createVideoPlayer
};
registerVideoPlayer('YoutubePlayer', Factory);

let defaultOptions = {
    playerVars: {
        origin: location.origin + '/',
        enablejsapi: 1
    }
};
let autoload = true;

export const apiLoadedPromise = new Promise(resolve => {
    // Youtube callback when API is ready
    window['onYouTubeIframeAPIReady'] = resolve;
});

export function loadPlayer (elmOrId, options): Promise<YoutubePlayer> {
    return apiLoadedPromise.then(function(){
        let newOptions: any = {};
        // Override main options
        angular.extend(newOptions, angular.copy(defaultOptions), options);
        // Override player var options
        newOptions.playerVars = {}; // For some reason if I dont reset this angular.extend doesnt work as expected
        angular.extend(newOptions.playerVars, angular.copy(defaultOptions.playerVars), options.playerVars);

        // Get the angular 1 injector
        return getInjector()
            // Get the YoutubePlayer constructor
            .then(injector => injector.get('YoutubePlayer') as typeof YoutubePlayer)
            // Create an instance of the player
            .then(YoutubePlayer => new YoutubePlayer(elmOrId, newOptions))
            // When the player says its ready, so do we
            .then(player => new Promise(resolve => player.on('onReady', () => resolve(player))));
    });
}



export interface IYoutubePlayerOptions {
    height: string;
    width: string;
}

export function createVideoPlayer(options: IYoutubePlayerOptions, $videoDiv): Observable<IVideoPlayer> {
    return Observable.create(observer => {
        options.height = options.height || '390';
        options.width = options.width || '640';

        // TODO: Need to see where to put this after refactor
        // this.elm.css('height', convertToUnits(options.height));
        // this.elm.css('width', convertToUnits(options.width));
        let player: IVideoPlayer | null;

        loadPlayer($videoDiv, options).then(p => {
            player = p;
            // player.setOverlayElement($overlayElm); // TODO: do i need this?
            observer.next(player);
        });

        return () => {
            if (player) {
                player.destroy();
            }
        };
    });
}
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

    $get = function () {
        return {
            loadPlayer,
            getAutoLoad: function () {
                return autoload;
            }

        };
    };
}


angular.module('rxPlayer').provider('youtube', new Provider());


