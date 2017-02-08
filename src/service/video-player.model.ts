import {Observable} from 'src/util/rx/facade';

export interface IVideoPlayer {
    load<T extends IVideoPlayer> (source: any): Observable<T>;

    // Playing
    play (): void;
    pause (): void;

    // Volume
    toggleMute (): void;
    isMuted (): boolean;

    setVolume (volume: number): void; // [0 to 100]
    getVolume (): number;
    volumeState$: Observable<IVolumeStateEvent>;

    // See if refactor
    isPlaying (): boolean;
    playState$: Observable<IPlayStateEvent>;

    // Im sure I want to refactor
    setOverlayElement (elm: any): void;
    destroy (): void;
}

type IPlayStateEvent = any; // TODO: Minify to selected events
    // StartEvent | PauseEvent | StopEvent

export type IVolumeStateEvent = {
    player: IVideoPlayer;
    type: 'volumechange';
    volume: number;
    isMuted: boolean;
};
