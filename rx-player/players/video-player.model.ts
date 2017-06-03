import {Observable} from '../util/rx/facade';

export interface IVideoPlayer {
    // TODO: For each one of this sections, maybe separate as adaptors, diferent interfaces
    // that each player can conform to.
    // -------------------
    // -     Loading     -
    // -------------------

    load<T extends IVideoPlayer> (source: any): Observable<T>;
    // maybe add a ready$ ?

    // -------------------
    // -     Playing     -
    // -------------------

    play (): void;
    pause (): void;
    isPlaying (): boolean;
    playState$: Observable<IPlayStateEvent>;
    progress$: Observable<IProgressStateEvent>;
    loaded$: Observable<ILoadedStateEvent>;
    getDuration (): number;
    getCurrentTime (): number;
    getLoadedPercent (): number;
    seeking$: Observable<ISeekingEvent>;
    seeked$: Observable<ISeekedEvent>;
    seekTo (sec: number): Promise<boolean>;
    ended$: Observable<IEndedEvent>;

    // -------------------
    // -     Rate     -
    // -------------------
    playbackRate$:  Observable<IRateChangeEvent>;
    getPlaybackRate (): number;
    setPlaybackRate (rate: number): void;
    getAvailablePlaybackRates (): number[];

    // -------------------
    // -      Volume     -
    // -------------------

    toggleMute (): void;
    isMuted (): boolean;
    mute (): void;
    unmute (): void;
    setVolume (volume: number): void; // [0 to 100]
    getVolume (): number;
    volumeState$: Observable<IVolumeStateEvent>;

    // -------------------------
    // -  TODO: REFACTOR THIS  -
    // -------------------------
    options: any;
    setOverlayElement (elm: any): void;
    destroy (): void;
}

export interface IYoutubeVideoSource {
    player: 'YoutubePlayer';
    youtubeId: string;
}

export interface IHTML5VideoSource {
    player: 'HTML5Player';
    sources: IHTML5Source[];
}

export interface IHTML5Source {
    src: string;
    type: string;
}

// TODO: See if this can be extended with custom data sources
export type IVideoSource = IYoutubeVideoSource | IHTML5VideoSource;

export interface IHTML5PlayerOptions {
    player: 'HTML5Player';
    height?: string;
    width?: string;
}
export interface IYoutubePlayerOptions extends YT.PlayerOptions {
    player: 'YoutubePlayer';
}

// TODO: See if this can be extended with custom data sources
export type IVideoOptions = IYoutubePlayerOptions | IHTML5PlayerOptions;

// type IPlayStateEvent = any; // TODO: Minify to selected events
    // StartEvent | PauseEvent | StopEvent
export interface IPlayStateEvent {
    player: IVideoPlayer;
    type: 'playstate';
    isPlaying: boolean;
    hasEnded: boolean;
}

export interface IVolumeStateEvent {
    player: IVideoPlayer;
    type: 'volumechange';
    volume: number;
    isMuted: boolean;
}

export interface IProgressStateEvent {
    player: IVideoPlayer;
    type: 'videoprogress';
    time: number;
}

export interface IRateChangeEvent {
    player: IVideoPlayer;
    type: 'ratechange';
    rate: number;
}

export interface ILoadedStateEvent {
    player: IVideoPlayer;
    type: 'loaded';
    loaded: number;
}

export interface ISeekingEvent {
    player: IVideoPlayer;
    type: 'seeking';
    // from: number;
    // to: number;
}

export interface ISeekedEvent {
    player: IVideoPlayer;
    type: 'seeked';
    // from: number;
    // to: number;
}

export interface IEndedEvent {
    player: IVideoPlayer;
    type: 'ended';
}

