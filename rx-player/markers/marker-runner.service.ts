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
        // TODO: Move this state into the reducers
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
            // If its not really a range, don't pass it trough
            .filter(range => range[0] !== range[1])
            .share();

        const idleMarkers$ = this.state.select().map(({idle}) => idle);
        const runningMarkers$ = this.state.select().map(({running}) => running);

        // *************************
        // * MARKER START RECIPIES *
        // *************************
        // While the video is playing, see if which markers have started in the playing range
        const startWhenPlayerPlaysTrough$ =
            // While playing
            progressRange$
                // Join the playing range with the idle markers
                .withLatestFrom(idleMarkers$, (range: Range, markers) => ({range, markers}))
                // Get a list of markers that have started in this range
                .map(({range, markers}) => markers.filter(marker => startedIn(marker, range)))
                // Only fire an event when we have markers that met the condition
                .filter(markersToStart => markersToStart.length > 0)
        ;

        const startWhenPlayerSeeksInto$ =
            // When seeked
            seekTo$
                // Join the seek time with the idle markers
                .withLatestFrom(idleMarkers$, (time, markers) => ({time, markers}))
                // Get a list of markers that have started in this range
                .map(({time, markers}) => markers.filter(marker => timeInMarkerRange(time, marker)))
                // Only fire an event when we have markers that met the condition
                .filter(markersToStart => markersToStart.length > 0)
        ;

        // Recipy to know when to start an idle marker
        const markerStart$ = Observable.merge(
                startWhenPlayerPlaysTrough$,
                startWhenPlayerSeeksInto$
            )
            .share()
        ;

        // ***********************
        // * MARKER END RECIPIES *
        // ***********************
        // While video is playing end the markers once we pass the end mark
        const endWhenPlayerPlaysTrough$ =
            progressRange$
                // Join the range with the running markers
                .withLatestFrom(runningMarkers$, (range: Range, markers) => ({range, markers}))
                // Get a list of markers that have ended in this range
                .map(({markers, range}) => markers.filter(marker => endedIn(marker, range)))
                // Only fire an event when we have markers that met the condition
                .filter(markersToEnd => markersToEnd.length > 0)
        ;

        // When the video seeks, end all markers that fell out of range
        const endWhenPlayerSeeksOutOf$ = seekTo$
                // Join the time with the running markers
                .withLatestFrom(runningMarkers$, (time, markers) => ({time, markers}))
                // Get a list of markers that are no longer in range
                .map(({markers, time}) => markers.filter(marker => !timeInMarkerRange(time, marker)))
                // Only fire an event when we have markers that met the condition
                .filter(markersToEnd => markersToEnd.length > 0)
        ;

        // Recipy to know when a running marker should stop
        const markerEnd$ = Observable.merge(
                endWhenPlayerPlaysTrough$, // .debug('play trough'),
                endWhenPlayerSeeksOutOf$ // .info('seeks out')
            )
            .share()
        ;


        // TODO: I should probably add a destroy to stop the subscribe
        // currentMarkerRange$.subscribe();
        Observable.merge(
            markerEnd$.map(markers => ({type: 'END_MARKERS', payload: {markers}} as IEndMarkersAction)), // .debug('marker_end'),
            markerStart$.map(markers => ({type: 'START_MARKERS', payload: {markers}} as IStartMarkersAction)) // .debug('MARKER_START')
        ).subscribe(action => this.state.dispatch(action));

        markerStart$
            .switchMap(values => Observable.from(values))
            .subscribe(marker => marker.onStart(player))
        ;

        markerEnd$
            .switchMap(values => Observable.from(values))
            .filter(marker => typeof marker.onEnd === 'function')
            .subscribe(marker => marker.onEnd(player))
        ;

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

// TODO: Move into an array util
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

