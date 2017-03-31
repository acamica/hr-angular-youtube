import {IVideoPlayer} from '../players/video-player.model';
import {IMarker, startedIn, endedIn, Range} from './marker.model';
import {Observable} from 'rxjs/Observable';
import {Store, combineReducers} from '../util/store.util';
import '../util/rx/debug/index';


export class MarkerRunner {
    private state: Store<IState, IActions>;

    constructor (private player: IVideoPlayer, markers: IMarker[]) {
        // Create the reducers that manage the state of which marker
        // is running and which is idle starting with the given markers
        const reducers = createMarkerRunnerReducers(markers);

        this.state = new Store<IState, IActions>(reducers);

        // While video playing, generate a range consisting of the last value
        // and the current time, like so [lastValue, currentTime]
        // eg [-1, 0.2]
        //    [0.2, 0.4]
        //    [0.4, 0.6]
        const progressRange$ = this.player
            .progress$
            .map(ev => ev.time)
            .scan((range, currentTime) => [range[1], currentTime], [-1, -1])
            .share();

        // Recipy to know when to start an idle marker
        const markerStart$ =
            // While the video is playing, see if in the current range the marker
            progressRange$.switchMap(
                (range: Range) => this.state.select()
                    .map(({idle}) => idle)
                    .switchMap(idleMarkers => Observable.from(idleMarkers))
                    .filter(marker => startedIn(marker, range))
            )
            .share();

        const markerEnd$ = progressRange$.switchMap(
                (range: Range) => this.state.select()
                    .map(({running}) => running)
                    .switchMap(runningMarkers => Observable.from(runningMarkers))
                    .filter(marker => endedIn(marker, range))
            )
            .share();

        // currentMarkerRange$.subscribe();
        Observable.merge(
            markerEnd$.map(marker => ({type: 'END_MARKER', payload: {marker}} as IEndMarkerAction)),
            markerStart$.map(marker => ({type: 'START_MARKER', payload: {marker}} as IStartMarkerAction))
        ).subscribe(action => this.state.dispatch(action));

        markerStart$.subscribe(marker => marker.onStart(player));
        // markerStart$.subscribe();
        markerEnd$
            .filter(marker => typeof marker.onEnd === 'function')
            .subscribe(marker => marker.onEnd(player));

    }
}

interface IStartMarkerAction {
    type: 'START_MARKER';
    payload: {
        marker: IMarker;
    };
}

interface IEndMarkerAction {
    type: 'END_MARKER';
    payload: {
        marker: IMarker;
    };
}

type IActions = IStartMarkerAction | IEndMarkerAction;
interface IState {
    idle: IMarker[];
    running: IMarker[];
}
function createMarkerRunnerReducers (markers: IMarker[]) {
    function idle (idleMarkers = markers, action: IActions) {
        switch (action.type) {
            case 'START_MARKER':
                return removeMarker(action.payload.marker, idleMarkers);
            case 'END_MARKER':
                return [...idleMarkers, action.payload.marker];
            default:
                return idleMarkers;
        }
    }

    function running (runningMarkers = [], action: IActions) {
        switch (action.type) {
            case 'START_MARKER':
                return [...runningMarkers, action.payload.marker];
            case 'END_MARKER':
                return removeMarker(action.payload.marker, runningMarkers);
            default:
                return runningMarkers;
        }
    }
    return combineReducers({idle, running});
}



function removeMarker (marker: IMarker, list: IMarker[]) {
    const index = list.indexOf(marker);
    if (index === -1) {
        return list;
    } else {
        return [
            ...list.slice(0, index),
            ...list.slice(index + 1)
        ];
    }
}

