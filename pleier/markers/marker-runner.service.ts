import {IVideoPlayer} from '../players/video-player.model';
import {IMarker, startedIn, Range, timeInMarkerRange} from './marker.model';
import {Observable} from 'rxjs/Observable';
import {Store, combineReducers, IPayloadAction} from '../util/store.util';
import {concatUnique} from '../util/immutable/facade';

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

interface IMarkerRunnerState {
    idle: IMarker[];
    running: IMarker[];
    progressRange: [number, number];
}

export class MarkerRunner {
    private state: Store<IMarkerRunnerState, IActions>;

    constructor (private player: IVideoPlayer, markers: IMarker[]) {
        // Create the reducers that manage the service state
        const reducers = createMarkerRunnerReducers(markers);
        this.state = new Store<IMarkerRunnerState, IActions>(reducers);

        const idleMarkers$ = this.state.select('idle');
        const runningMarkers$ = this.state.select('running');
        const progressRange$ = this.state.select('progressRange')
            // If its a point more than a range, don't pass it trough
            // .filter(range => range[0] !== range[1])
            // .debug('progressRange$')
        ;
        // TODO: There is still a "bug" with progressRange being called multiple times after
        // a seek https://app.asana.com/0/240284596047949/339201762226565
        // progressRange$
        //     .debug('progressRange$')
        //     .subscribe();


        const seekTo$ = this.player.seeked$.map(ev => ev.player.getCurrentTime())
        ; // .debug('seeked');


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
                // Get the current time
                .map(range => range[1])
                // Join the time with the running markers
                .withLatestFrom(runningMarkers$, (time, markers) => ({time, markers}))
                // Get a list of markers that are no longer in range
                .map(({markers, time}) => markers.filter(marker => !timeInMarkerRange(time, marker)))
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

        // ***********
        // * ACTIONS *
        // ***********
        const markerEndActions$ =
            markerEnd$
                .map(markers => ({type: 'END_MARKERS', payload: {markers}} as IEndMarkersAction))
                // .debug('marker_end', (action) => action.payload.markers)
        ;

        const markerStartActions$ =
            markerStart$
                .map(markers => ({type: 'START_MARKERS', payload: {markers}} as IStartMarkersAction))
                // .debug('marker_start', (action) => action.payload.markers)

        ;

        const progressUpdateActions$ =
            this.player.progress$
                .map(ev => ({type: 'PROGRESS_UPDATE', payload: {time: ev.time}} as IProgressUpdateAction))
        ;

        const seekFinishedActions$ =
            seekTo$
                .map(time => ({type: 'SEEK_FINISHED', payload: {time}} as ISeekFinishedAction))
                // .info(action => `seek_finished: ${action.payload.time}`)
        ;

        // ****************
        // * SIDE EFFECTS *
        // ****************

        // TODO: I should probably add a destroy to stop the subscribe
        // currentMarkerRange$.subscribe();
        Observable.merge(
            markerEndActions$,
            markerStartActions$,
            progressUpdateActions$,
            seekFinishedActions$
        )
            // .info(action => `dispatch ${action.type}`)
            .subscribe(action => this.state.dispatch(action))
        ;

        // When a marker starts call its onStart method
        markerStart$
            .switchMap(values => Observable.from(values))
            .subscribe(marker => marker.onStart(player))
        ;

        markerEnd$
            .switchMap(values => Observable.from(values))
            .filter(marker => typeof marker.onEnd === 'function')
            .subscribe(marker => marker.onEnd(player))
        ;

        // TODO: Comment or delete this
        // this.state.select()
        //     .map(({idle, running}) => ({idle, running}))
        //     .distinctUntilChanged((a, b) => a.idle === b.idle && a.running === b.running)
        //     .debug('runningState')
        //     .subscribe();
    }
}

type IStartMarkersAction = IPayloadAction<'START_MARKERS', {markers: IMarker[]}>;
type IEndMarkersAction = IPayloadAction<'END_MARKERS', {markers: IMarker[]}>;
type IProgressUpdateAction = IPayloadAction<'PROGRESS_UPDATE', {time: number}>;
type ISeekFinishedAction = IPayloadAction<'SEEK_FINISHED', {time: number}>;

type IActions = IStartMarkersAction | IEndMarkersAction | IProgressUpdateAction | ISeekFinishedAction;

// TODO: Tengo que evitar repetidos, y ver tema de checkeo por identidad
function createMarkerRunnerReducers (markers: IMarker[]) {
    function idle (idleMarkers = markers, action: IActions) {
        switch (action.type) {
            case 'START_MARKERS':
                // Remove the started markers from the idle state
                return idleMarkers.filter(marker => action.payload.markers.indexOf(marker) === -1);
            case 'END_MARKERS':
                // Add the ended markers into the idle state once again
                return concatUnique(idleMarkers, action.payload.markers);
            default:
                return idleMarkers;
        }
    }

    function running (runningMarkers: IMarker[] = [], action: IActions) {
        switch (action.type) {
            case 'START_MARKERS':
                // Add the started markers into the running state
                return concatUnique(runningMarkers, action.payload.markers);
            case 'END_MARKERS':
                // Remove the ended markers from the running state
                return runningMarkers.filter(marker => action.payload.markers.indexOf(marker) === -1);
            default:
                return runningMarkers;
        }
    }

    // While video playing, generate a range consisting of the last value
    // and the current time, like so [lastValue, currentTime]
    // eg [-1, -1]
    //    [-1, 0.2]
    //    [0.2, 0.4]
    //    [0.4, 0.6]
    function progressRange (range = [-1, -1] as Range, action: IActions): Range {
        switch (action.type) {
            case 'PROGRESS_UPDATE':
                const lastTime = Math.max(range[1], action.payload.time - 1);
                return [lastTime, action.payload.time];
            case 'SEEK_FINISHED':
                return [action.payload.time, action.payload.time];
            default:
                return range;
        }
    }
    return combineReducers({idle, running, progressRange});
}

