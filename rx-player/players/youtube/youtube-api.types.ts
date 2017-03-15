namespace YT {
    export type VideoQuality = 'highres' | 'hd1080' | 'hd720' | 'large' | 'medium' | 'small';
    export type SuggestedVideoQuality = 'default';

    // tslint:disable-next-line: interface-name
    export interface Player {
        getPlaybackQuality (): VideoQuality;
        setPlaybackQuality (suggestedQuality: SuggestedVideoQuality): void;
        getAvailableQualityLevels (): VideoQuality[];
        removeEventListener (event: string, handler: EventHandler): void;
    }
}
