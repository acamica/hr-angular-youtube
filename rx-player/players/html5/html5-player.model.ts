import * as angular from 'angular';
import {Observable} from '../../util/rx/facade';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {PlainModel} from '../../ng-helper/plain-model';
// import {convertToYoutube, convertFromYoutube} from 'src/service/youtube-quality-map.service';
// import {youtubeReadableTime} from 'src/service/youtube-readable-time.service';
// import {uuid} from 'src/util/uuid.service';
import {
    IHTML5VideoSource,
    IHTML5PlayerOptions,
    IVideoPlayer,
    IVolumeStateEvent,
    IProgressStateEvent,
    IRateChangeEvent,
    ILoadedStateEvent,
    ISeekingEvent,
    ISeekedEvent,
    IPlayStateEvent,
    IEndedEvent
} from '../../players/video-player.model';


@PlainModel({
    name: 'HTML5Player',
})
export class HTML5Player
                            implements IVideoPlayer {

    private video = document.createElement('video') as HTMLVideoElement;

    constructor (elm: ng.IAugmentedJQuery, public options: IHTML5PlayerOptions) {
        const $video = angular.element(this.video);

        $video.css('display', 'block');
        $video.css('height', '100%');
        $video.css('width', '100%');

        angular.element(elm).replaceWith($video);
    }


    // -------------------
    // -     Loading     -
    // -------------------
    load (source: IHTML5VideoSource): Observable<HTML5Player> {
        this.setVideoSources(source);
        // this.video.load();
        // this.video.preload = 'metadata';
        return Observable
            .fromEvent(this.video, 'loadedmetadata')
            .mapTo(this);
    }

    private setVideoSources (source: IHTML5VideoSource) {
        const $video = angular.element(this.video);
        $video.empty();

        source.sources
            .map(source => angular.element(`<source src="${source.src}" type="${source.type}">`))
            .forEach(sourceElm => $video.append(sourceElm));
    }
    ready$ = new BehaviorSubject(this);

    // ready$ = Observable
    //             .fromEvent(this.video, 'loadstart')
    //             .mapTo(this);

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

    playState$: Observable<IPlayStateEvent> = Observable.merge(
        Observable
            .fromEvent(this.video, 'play')
            .mapTo({
                player: this,
                type: 'playstate',
                isPlaying: true,
                hasEnded: this.video.ended
            } as IPlayStateEvent),
        Observable
            .fromEvent(this.video, 'pause')
            // .map(ev => {console.log('pause', ev, this.video); return ev;})
            .mapTo({
                player: this,
                type: 'playstate',
                isPlaying: false,
                hasEnded: this.video.ended
            } as IPlayStateEvent),

    );

    // TODO: This is the same as in youtube player. Chance to refactor
    progress$: Observable<IProgressStateEvent> = this.playState$
                    .switchMap(state => {
                        if (state.isPlaying) {
                            return Observable.interval(100);
                        } else {
                            return Observable.empty();
                        }
                     })
                    .map(_ => {
                        const event = {
                            player: this,
                            type: 'videoprogress',
                            time: this.getCurrentTime()
                        } as IProgressStateEvent;
                        return event;
                    });

    loaded$: Observable<ILoadedStateEvent> = Observable
        .fromEvent(this.video, 'progress')
        .map(_ => {
            const event = {
                player: this,
                type: 'loaded',
                loaded: this.getLoadedPercent()
            } as ILoadedStateEvent;
            return event;
        });

    getDuration () {
        return this.video.duration;
    }

    getCurrentTime () {
        return this.video.currentTime;
    }

    // TODO: Aparently there is a bug when the video is already cached, and the buffered
    // returns empty or something (check progress bar)
    getLoadedPercent (): number {
        // Get the loaded ranges
        const timeRange = this.video.buffered;
        let end = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < timeRange.length; i++) {
            const rangeEnd = timeRange.end(i);
            end = Math.max(end, rangeEnd);
        }
        return end / this.getDuration() * 100;
    };

    seeking$: Observable<ISeekingEvent> = Observable
        .fromEvent(this.video, 'seeking')
        .map(_ => {
            const event = {
                player: this,
                type: 'seeking'
            } as ISeekingEvent;
            return event;
        });

    seeked$: Observable<ISeekedEvent> = Observable
        .fromEvent(this.video, 'seeked')
        .map(_ => {
            const event = {
                player: this,
                type: 'seeked'
            } as ISeekedEvent;
            return event;
        });

    seekTo (sec: number): Promise<ISeekedEvent> {
        this.video.currentTime = sec;
        return this.seeked$.take(1).toPromise();
    }

    ended$: Observable<IEndedEvent> = Observable
        .fromEvent(this.video, 'ended')
        .map(_ => {
            const event = {
                player: this,
                type: 'ended'
            } as IEndedEvent;
            return event;
        });

    // -------------------
    // -     Rate     -
    // -------------------
    playbackRate$: Observable<IRateChangeEvent> = Observable
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
        if (this.isMuted()) {
            this.unmute();
        } else {
            this.mute();
        }
    }

    isMuted (): boolean {
        return this.video.muted || this.video.volume === 0;
    }

    mute (): void {
        this.video.muted = true;
    }

    unmute (): void {
        this.video.muted = false;
        // If its muted and with no volume, unmuting sets to half volume
        if (this.video.volume === 0) {
            this.video.volume = 0.5;
        }
    }

    setVolume (volume: number) {
        this.video.volume = volume / 100;
        this.video.muted = volume === 0;
    }

    getVolume (): number {
        return this.video.muted ? 0 : this.video.volume * 100;
    };

    volumeState$: Observable<IVolumeStateEvent> = Observable
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
