import {Observable} from 'rxjs/Observable';
import {IRxVideoPlayer} from './rx-video-player.model';
import {IVideoPlayer} from './video-player.model';

export class RxVideoInterface implements IRxVideoPlayer {

    constructor(private player$: Observable<IVideoPlayer>) {

    }

    play() {
        this.player$
            .take(1)
            .subscribe(player => player.play());
    }

    pause() {
        this.player$
            .take(1)
            .subscribe(player => player.pause());
    }

}
