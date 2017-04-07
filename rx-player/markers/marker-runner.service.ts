import {IVideoPlayer} from '../players/video-player.model';
import {IMarker, startedIn, endedIn, Range, timeInMarkerRange} from './marker.model';
import {Observable} from 'rxjs/Observable';
import {Store, combineReducers} from '../util/store.util';

// TODO: REMOVE THIS
// TODO: REMOVE THIS
// TODO: REMOVE THIS
// TODO: REMOVE THIS
// TODO: REMOVE THIS
// import '../util/rx/debug/index'; // TODO: REMOVE THIS
// TODO: REMOVE THIS
// TODO: REMOVE THIS
// TODO: REMOVE THIS
// TODO: REMOVE THIS

export class MarkerRunner {
    private state: Store<IState, IActions>;

    constructor (private player: IVideoPlayer, markers: IMarker[]) {
        // Create the reducers that manage the state of which marker
        // is running and which is idle starting with the given markers
        const reducers = createMarkerRunnerReducers(markers);

        this.state = new Store<IState, IActions>(reducers);
        this.state.select().subscribe(); // TODO: I need to subscribe here to mantain the state
                                        // I should add a destroy maybe?

        // While video playing, generate a range consisting of the last value
        // and the current time, like so [lastValue, currentTime]
        // eg [-1, 0.2]
        //    [0.2, 0.4]
        //    [0.4, 0.6]
        // const progressRange$ = this.player
        //     .progress$
        //     .map(ev => ev.time)
        //     .scan((range, currentTime) => [range[1], currentTime], [-1, -1])
        //     .share();
        const seekTo$ = this.player.seeked$.map(ev => ev.player.getCurrentTime())
            ; // .debug('seeked');
        const progressRange$ = Observable.merge(
                this.player.progress$.map(ev => ({type: 'PROGRESS_UPDATE', payload: ev.time})),
                seekTo$.map(time => ({type: 'SEEK_FINISHED', payload: time}))
            )
            .scan((range, action) => {
                switch (action.type) {
                    case 'PROGRESS_UPDATE':
                        return [range[1], action.payload];
                    case 'SEEK_FINISHED':
                        return [action.payload, action.payload];
                }
            }, [-1, -1])
            .share();

        const idleMarkers$ = this.state.select().map(({idle}) => idle);
        const runningMarkers$ = this.state.select().map(({running}) => running);

        // Recipy to know when to start an idle marker
        const markerStart$ =
            // While the video is playing, see if in the current range the marker
            progressRange$
                .mergeMap(
                (range: Range) => idleMarkers$
                    .take(1)
                    .map(markers =>
                        markers.filter(marker => startedIn(marker, range))
                    )
                    .filter(markersToStart => markersToStart.length > 0)
            )
            .share()
        ;

        // Recipy to know when a running marker should stop
        const endWhenPlayerPlaysTrough$ =  progressRange$.mergeMap(
                (range: Range) => runningMarkers$
                                        .take(1)
                                        .map(markers =>
                                            markers.filter(marker => endedIn(marker, range))
                                        )
                                        .filter(markersToEnd => markersToEnd.length > 0)
        );

        const endWhenPlayerSeeksOutOf$ = seekTo$.mergeMap(
                (time: number) => runningMarkers$
                                        .take(1)
                                        .map(markers =>
                                            markers.filter(marker => !timeInMarkerRange(time, marker))
                                        )
                                        .filter(markersToEnd => markersToEnd.length > 0)
                                        // .takeUntil(Observable.timer(100))
        );

        const markerEnd$ = Observable.merge(
                endWhenPlayerPlaysTrough$, // .debug('play trough'),
                endWhenPlayerSeeksOutOf$ // .info('seeks out')
            )
            .share();

        // currentMarkerRange$.subscribe();
        Observable.merge(
            markerEnd$.map(markers => ({type: 'END_MARKERS', payload: {markers}} as IEndMarkersAction))
                , // .debug('marker_end'),
            markerStart$.map(markers => ({type: 'START_MARKERS', payload: {markers}} as IStartMarkersAction)) // .debug('MARKER_START')
        ).subscribe(action => this.state.dispatch(action));

        markerStart$
            .switchMap(values => Observable.from(values))
            .subscribe(marker => marker.onStart(player));

        markerEnd$
            .switchMap(values => Observable.from(values))
            .filter(marker => typeof marker.onEnd === 'function')
            .subscribe(marker => marker.onEnd(player));

        // this.state.select().map(state => state.idle).debug('idle').subscribe();
        // this.state.select().map(state => state.running).debug('running').subscribe();
    }
}

interface IStartMarkersAction {
    type: 'START_MARKERS';
    payload: {
        markers: IMarker[];
    };
}

interface IEndMarkersAction {
    type: 'END_MARKERS';
    payload: {
        markers: IMarker[];
    };
}

type IActions = IStartMarkersAction | IEndMarkersAction;
interface IState {
    idle: IMarker[];
    running: IMarker[];
}

// TODO: Tengo que evitar repetidos, y ver tema de checkeo por identidad
function createMarkerRunnerReducers (markers: IMarker[]) {
    function idle (idleMarkers = markers, action: IActions) {
        switch (action.type) {
            case 'START_MARKERS':
                // Remove the started markers from the idle state
                return idleMarkers.filter(marker => action.payload.markers.indexOf(marker) === -1);
            case 'END_MARKERS':
                // Add the ended markers into the idle state once again
                // return [...idleMarkers, ...action.payload.markers];
                return concatUnique(idleMarkers, action.payload.markers);
            default:
                return idleMarkers;
        }
    }

    function running (runningMarkers = [], action: IActions) {
        switch (action.type) {
            case 'START_MARKERS':
                // console.log('WWWWAT');
                // Add the started markers into the running state
                // return [...runningMarkers, ...action.payload.markers];
                return concatUnique(runningMarkers, action.payload.markers);
            case 'END_MARKERS':
                // Remove the ended markers from the running state
                return runningMarkers.filter(marker => action.payload.markers.indexOf(marker) === -1);
            default:
                return runningMarkers;
        }
    }
    return combineReducers({idle, running});
}

function concatUnique<T> (a: T[], b: T[]): T[] {
    return a.concat(b.filter(item => a.indexOf(item) === -1));
}

// function removeItem<T> (item: T, list: T[]) {
//     const index = list.indexOf(item);
//     if (index === -1) {
//         return list;
//     } else {
//         return [
//             ...list.slice(0, index),
//             ...list.slice(index + 1)
//         ];
//     }
// }

