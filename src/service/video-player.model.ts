import {Observable} from 'rxjs/Observable';


export interface IVideoPlayer {
    play (): void;
    pause (): void;
    load<T extends IVideoPlayer> (source: any): Observable<T>;


    // TO SEE
    isPlaying (): boolean;
    playState$: Observable<IPlayStateEvents>;

    // Refactor these
    setOverlayElement (elm: any): void;
    destroy (): void;
}

type IPlayStateEvents = any; // TODO: Minify to selected events
    // StartEvent | PauseEvent | StopEvent
