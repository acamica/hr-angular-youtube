import {Observable} from '../util/rx/facade';
import {IVideoPlayer} from '../players/video-player.model';

//
// TODO: Try to deprecate this in favour of having local adaptors in each component
// Try to deprecate Try to deprecate Try to deprecate Try to deprecate Try to deprecate
// Try to deprecate Try to deprecate Try to deprecate Try to deprecate Try to deprecate
// Try to deprecate Try to deprecate Try to deprecate Try to deprecate Try to deprecate
// Try to deprecate Try to deprecate Try to deprecate Try to deprecate Try to deprecate
// Try to deprecate Try to deprecate Try to deprecate Try to deprecate Try to deprecate
export class RxVideoInterface {
    // implements IVideoPlayer {

    constructor (private player$: Observable<IVideoPlayer>) {

    }

    play () {
        this.player$
            .take(1)
            .subscribe(player => player.play());
    }

    pause () {
        this.player$
            .take(1)
            .subscribe(player => player.pause());
    }


    isPlaying = this.player$
                    .switchMap(player => player.playState$.mapTo(player))
                    .map(player => player.isPlaying())
                    .startWith(false);

    isNotPlaying = this.isPlaying.map(isPlaying => !isPlaying);

}
