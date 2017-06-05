namespace YT {
    // tslint:disable-next-line: interface-name
    export interface Player {
        removeEventListener<TEvent extends PlayerEvent> (eventName: keyof Events, handler: ((event: TEvent) => void)): void;
    }
}
