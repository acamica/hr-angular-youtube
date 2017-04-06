import {Observable} from '../../util/rx/facade';
import {HTML5Player, IHTML5PlayerOptions} from '../../players/html5/html5-player.model';
import {IVideoPlayer} from '../../players/video-player.model';
import {registerVideoPlayer} from '../player-factory.service';
import {getService} from '../../ng-helper/facade';

HTML5Player; // Hack to make typescript fetch that file
const Factory = {
    createVideoPlayer
};
registerVideoPlayer('HTML5Player', Factory);


export function loadPlayer (elm, options: IHTML5PlayerOptions): Promise<HTML5Player> {
        // TODO: Refactor to observables
        // Get the YoutubePlayer constructor
        return getService<typeof HTML5Player>('HTML5Player')
            // Create an instance of the player
            .then(HTML5Player => new HTML5Player(elm, options))
            // When the player says its ready, so do we
            // .then(player => new Promise(resolve => player.on('onReady', () => resolve(player))));
            .then(player => player.ready$.take(1).toPromise());
}



// TODO: This is so far equal to the YoutubePlayer fn
export function createVideoPlayer (options: IHTML5PlayerOptions, $videoDiv): Observable<IVideoPlayer> {
    return Observable.create(observer => {
        options.height = options.height || '100%';
        options.width = options.width || '100%';

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
