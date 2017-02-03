import {Observable} from 'rxjs/Observable';

export interface IVideoPlayer {
    play (): void;
    pause (): void;
    load<T extends IVideoPlayer> (source: any): Observable<T>;

    // Refactor these
    setOverlayElement (elm: any): void;
    destroy (): void;
}
