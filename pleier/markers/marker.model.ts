import {IVideoPlayer} from '../players/video-player.model';
export interface IMarkerLike {
    startTime: number;
    endTime: number;
}
// TODO: Revisit marker interface, try to remove onStart and onEnd to manage
// the side effects separate from the data. Its prefered to have a type property in
// the actual markers and to action outside the object
export interface IMarker {
    startTime: number;
    endTime: number;
    onStart: (player: IVideoPlayer) => void;
    onEnd?: (player: IVideoPlayer) => void;
}

export type Range = [number, number];

function numberInRange (n: number, range: Range) {
    const [start, end] = range;
    return n > start && n < end;
}

function numberInRangeInclusive (n: number, range: Range) {
    const [start, end] = range;
    return n >= start && n <= end;
}
//
export const startedIn =
    (marker: IMarkerLike, range: Range) => numberInRange(marker.startTime, range);

export const endedIn =
    (marker: IMarkerLike, range: Range) => numberInRange(marker.endTime, range);

export const timeInMarkerRange =
    (time: number, marker: IMarkerLike) => numberInRangeInclusive(time, [marker.startTime, marker.endTime]);
