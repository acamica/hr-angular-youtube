import {Observable, ReplaySubject, Observer} from '../../util/rx/facade';
import {YoutubePlayer} from '../../players/youtube/youtube-player.model';
import {IVideoPlayer, IYoutubePlayerOptions} from '../../players/video-player.model';
import {registerVideoPlayer} from '../player-factory.service';
import {getService} from '../../ng-helper/facade';

const youtubeApiLoaded$ = new ReplaySubject(1);

function createYoutubePlayer$ (element: ng.IAugmentedJQuery, options: IYoutubePlayerOptions): Observable<YoutubePlayer> {
    return Observable.create((observer: Observer<IVideoPlayer>) => {
        // console.info('createYoutubePlayer: starting promise');
        let player: YoutubePlayer;

        // Get the YoutubePlayer constructor
        getService<typeof YoutubePlayer>('YoutubePlayer')
            // Create an instance of the player
            .then(YoutubePlayer => new YoutubePlayer(element, options))
            .then(p => {
                player = p;
                observer.next(player);
            });

        return () => {
            if (player) {
                // console.info('createYoutubePlayer: destroying youtube player');
                player.destroy();
            }
        };
    });
}

export function createVideoPlayer (options: IYoutubePlayerOptions, $videoDiv: ng.IAugmentedJQuery): Observable<IVideoPlayer> {
    const newOptions = normalizeOptions(options);
    // console.info('createVideoPlayer: creating new recipy!');
            // Wait until the youtube api is loaded
    return youtubeApiLoaded$
            // .info('createVideoPlayer: api loaded2')
            // Then create a video player and attach it to the element
            .switchMap(_ => createYoutubePlayer$($videoDiv, newOptions))
            // .info('createVideoPlayer: Youtube player created')
            // Then wait until the player is ready to play before informing to the consumer
            .switchMap(player => player.ready$.mapTo(player))
            ;
}

registerVideoPlayer('YoutubePlayer', {
    createVideoPlayer
});

// : YT.PlayerOptions
let defaultOptions: any = {
    playerVars: {
        origin: location.origin + '/',
        enablejsapi: 1
    },
    height: '100%',
    width: '100%'
};



// TODO: Find better names
function normalizeOptions (options: IYoutubePlayerOptions): IYoutubePlayerOptions {

    // const newOptions: any = {};
    // // Override main options
    // angular.extend(newOptions, angular.copy(defaultOptions), options);
    // // Override player var options
    // newOptions.playerVars = {}; // For some reason if I dont reset this angular.extend doesnt work as expected
    // angular.extend(newOptions.playerVars, angular.copy(defaultOptions.playerVars), options.playerVars);
    const newOpts =  {
        ...defaultOptions,
        ...options,
        playerVars: {
            ...defaultOptions.playerVars,
            ...options.playerVars
        }
    };
    return newOpts;
}

// TODO: use keyof
export function setYoutubeDefaultOption (option: string, value: any) {
    defaultOptions[option] = value;
}

export function setYoutubeDefaultOptions (options: IYoutubePlayerOptions) {
    defaultOptions = options;
}

export function setPlayerVarDefaultOption (option: string, value: any) {
    defaultOptions.playerVars[option] = value;
}

// TODO: Type this
export function setPlayerVarDefaultOptions (playerVars: any) {
    defaultOptions.playerVars = playerVars;
}


// When the youtube API loads it executes this function that emits a value in a
// shared subject
declare var window: {
    onYouTubeIframeAPIReady: () => void;
};
window['onYouTubeIframeAPIReady'] = () => {
    youtubeApiLoaded$.next(null);
};

// TODO: Previously this was configured during angular 1 config stage and the script loaded
// in the run. Right now in the meantime we always load it. See how to handle this once
// we migrate to ng2
const autoload = true;

if (autoload) {
    // Add the iframe api to the dom
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}


// TODO: This was moved from the old code, I dont think is needed anymore. We should probably
// add yhis to the index if we nee to use it.
// Add a default handler to avoid missing the event. This can happen if you add the script manually,
// which can be useful for performance
// if (typeof window['onYouTubeIframeAPIReady'] === 'undefined') {
//     window['onYouTubeIframeAPIReady'] = function () {
//         setTimeout(function (){
//             window['onYouTubeIframeAPIReady']();
//         }, 100);
//     };
// }




