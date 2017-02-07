// TODO: Delete this?
import {Observable} from 'src/util/rx/facade';
import {HTML5Player, IHTML5PlayerOptions} from 'src/players/html5/html5-player.model';
import {IVideoPlayer} from 'src/service/video-player.model';
import {registerVideoPlayer} from 'src/service/rx-video.service';
import {getInjector} from 'src/ng-helper/facade';
HTML5Player; // Hack to make typescript fetch that file
const Factory = {
    createVideoPlayer
};
registerVideoPlayer('HTML5Player', Factory);


export function loadPlayer (elm, options: IHTML5PlayerOptions): Promise<HTML5Player> {

        // Get the angular 1 injector
        return getInjector()
            // Get the YoutubePlayer constructor
            .then(injector => injector.get('HTML5Player') as typeof HTML5Player)
            // Create an instance of the player
            .then(HTML5Player => new HTML5Player(elm, options));
            // When the player says its ready, so do we
            // .then(player => new Promise(resolve => player.on('onReady', () => resolve(player))));
}



// TODO: This is so far equal to the YoutubePlayer fn
export function createVideoPlayer (options: IHTML5PlayerOptions, $videoDiv): Observable<IVideoPlayer> {
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
