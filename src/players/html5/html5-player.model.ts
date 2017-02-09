import * as angular from 'angular';
import {Observable} from 'src/util/rx/facade';

import {PlainModel} from 'src/ng-helper/plain-model';
// import {convertToYoutube, convertFromYoutube} from 'src/service/youtube-quality-map.service';
// import {youtubeReadableTime} from 'src/service/youtube-readable-time.service';
// import {uuid} from 'src/util/uuid.service';
import {
    IVideoPlayer,
    IVolumeStateEvent,
    IProgressStateEvent,
    IRateChangeEvent
} from 'src/service/video-player.model';

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

    private video = document.createElement('video') as HTMLVideoElement;

    constructor (elm: HTML5Player, options: IHTML5PlayerOptions) {
        const $video = angular.element(this.video);
        options.sources
            .map(source => angular.element(`<source src="${source.src}" type="${source.type}">`))
            .forEach(sourceElm => $video.append(sourceElm));

        angular.element(elm).replaceWith($video);
    }

    // -------------------
    // -     Loading     -
    // -------------------
    load ({sources}): Observable<HTML5Player> {
        // debugger;
        // this.video.load();
        // this.video.preload = 'metadata';
        return Observable
            .fromEvent(this.video, 'loadedmetadata')
            .mapTo(this);
    }

    ready$ = Observable
                .fromEvent(this.video, 'loadstart')
                .mapTo(this);

    // -------------------
    // -     Playing     -
    // -------------------
    play () {
        this.video.play();
    }

    pause () {
        this.video.pause();
    }

    isPlaying () {
        return !this.video.paused;
    }

    // TODO: Map to the correct event
    playState$ = Observable.merge(
        Observable.fromEvent(this.video, 'play'),
        Observable.fromEvent(this.video, 'pause'),
    );

    progress$ = Observable
        .fromEvent(this.video, 'timeupdate')
        .map(_ => {
            const event = {
                player: this,
                type: 'videoprogress',
                time: this.getCurrentTime()
            } as IProgressStateEvent;
            return event;
        });

    getDuration () {
        return this.video.duration;
    }

    getCurrentTime () {
        return this.video.currentTime;
    }

    // -------------------
    // -     Rate     -
    // -------------------
    playbackRate$ = Observable
        .fromEvent(this.video, 'ratechange')
        .map(_ => {
            const event = {
                player: this,
                type: 'ratechange',
                rate: this.getPlaybackRate()
            } as IRateChangeEvent;
            return event;
        });

    getPlaybackRate () {
        return this.video.playbackRate;
    }

    setPlaybackRate (rate: number) {
        this.video.playbackRate = rate;
    }

    getAvailablePlaybackRates (): number[] {
        return [1, 1.25, 1.5, 1.75, 2];
    }

    // -------------------
    // -      Volume     -
    // -------------------

    toggleMute () {
        this.video.muted = !this.video.muted;
    }

    isMuted (): boolean {
        return this.video.muted || this.video.volume === 0;
    }

    setVolume (volume: number) {
        this.video.volume = volume / 100;
        this.video.muted = volume === 0;
    }

    getVolume (): number {
        return this.video.muted ? 0 : this.video.volume * 100;
    };

    volumeState$ = Observable
        .fromEvent(this.video, 'volumechange')
        .map(_ => {
            const event = {
                player: this,
                type: 'volumechange',
                volume: this.getVolume(),
                isMuted: this.isMuted()
            } as IVolumeStateEvent;
            return event;
        });

    // -------------------
    // -  REFACTOR THIS  -
    // -------------------

    setOverlayElement (elm: any) {
        // TODO: Delete as soon as posible
    }

    destroy () {
    }

}
