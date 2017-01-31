// import * as angular from 'angular';
// import {Observable} from 'rxjs/Observable';
import {PlainModel} from 'src/ng-helper/plain-model';
// import {convertToYoutube, convertFromYoutube} from 'src/service/youtube-quality-map.service';
// import {youtubeReadableTime} from 'src/service/youtube-readable-time.service';
// import {uuid} from 'src/util/uuid.service';
import {IVideoPlayer} from 'src/service/video-player.model';

@PlainModel({
    name: 'YoutubePlayer',
})
export class HTML5Player
                            implements IVideoPlayer {
    private video: HTMLVideoElement;

    play() {
        this.video.play();
    }

    pause() {
        this.video.pause();
    }

    // Refactor these
    setOverlayElement(elm: any) {
        // TODO: Delete as soon as posible
    }

    destroy() {
    }

    loadVideoById(id: string) {
        return this;
    }


}
