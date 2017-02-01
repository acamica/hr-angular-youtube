import * as angular from 'angular';
// import {Observable} from 'rxjs/Observable';
import {PlainModel} from 'src/ng-helper/plain-model';
// import {convertToYoutube, convertFromYoutube} from 'src/service/youtube-quality-map.service';
// import {youtubeReadableTime} from 'src/service/youtube-readable-time.service';
// import {uuid} from 'src/util/uuid.service';
import {IVideoPlayer} from 'src/service/video-player.model';

export interface IHTML5Source {
    src: string;
    type: string;
}
export interface IHTML5PlayerOptions {
    height: string;
    width: string;
    sources: IHTML5Source[];
}

@PlainModel({
    name: 'HTML5Player',
})
export class HTML5Player
                            implements IVideoPlayer {

    constructor(elm: HTML5Player, options: IHTML5PlayerOptions) {
        const video = angular.element('<video></video>');
        options.sources
            .map(source => angular.element(`<source src="${source.src}" type="${source.type}">`))
            .forEach(sourceElm => video.append(sourceElm));

        angular.element(elm).replaceWith(video);
        this.video = video[0] as HTMLVideoElement;
    }

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
