export interface IVideoPlayer {
    play(): void;
    pause(): void;

    // Refactor these
    setOverlayElement(elm: any): void;
    destroy(): void;
    loadVideoById(id: string): IVideoPlayer;
}
