import {Observable} from 'rxjs/Observable';
import {IVideoPlayer} from './video-player.model';

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
