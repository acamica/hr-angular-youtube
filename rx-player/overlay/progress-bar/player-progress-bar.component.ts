import {Observable, observeScopeDestroy, Subject} from '../../util/rx/facade';
import {Component, mockNgOnInitLink} from '../../ng-helper/facade';
import {IVideoPlayer} from '../../players/facade';
import {IMarker} from '../../markers/facade';
import {Store, IPayloadAction, ISimpleAction} from '../../util/store.util';
import * as angular from 'angular';

interface IProgressBarState {
    wasPlaying: boolean; // Indicates if the video player was playing before a progress seek
    isSeeking: boolean;
    seekPercentage: number;
}

const initialState = {
    wasPlaying: false,
    isSeeking: false,
    seekPercentage: 0
};

// TODO: see if we want to have the whole marker or if we can
// get by just by using the start time
export interface IProgressBarMarker {
    marker: IMarker;
    barCssClass?: string;
}

@Component({
    selector: 'playerProgressBar',
    templateUrl: '/template/overlay/progress-bar/player-progress-bar.component.html',
    scope: {
        markers: '<?',
        player: '<'
    },
    link: mockNgOnInitLink(['player'])
})
export class PlayerProgressBar {
    private player: Observable<IVideoPlayer>;

    markers: IProgressBarMarker[] | null;

    static $inject = ['$element', '$scope'];
    constructor (private elm, private scope) {

    }

    sliderDown$ = new Subject<void>();
    sliderMove$ = new Subject<number>();
    sliderUp$ = new Subject<number>();

    ngOnInit () {
        const $played = angular.element(this.elm[0].querySelector('.hr-yt-played'));
        const $loaded = angular.element(this.elm[0].querySelector('.hr-yt-loaded'));
        const $handle = angular.element(this.elm[0].querySelector('.hr-yt-handle'));
        // const $bar = angular.element(this.elm[0].querySelector('.hr-yt-bar'));

        const updateProgressBar = (sec: number, duration: number, loaded: number) => {
            const played = 100 * sec / duration;
            // This was calculated manually, but cant have
            // outerwidth without adding jquery
            const handleOuterWidth = 15;
            let handleX = played * this.elm[0].clientWidth / 100 - handleOuterWidth / 2  ;
            handleX = Math.min(Math.max(0, handleX), this.elm[0].clientWidth - handleOuterWidth);
            $loaded.css('width', loaded + '%');
            $played.css('width', played + '%');
            $handle.css('left', handleX + 'px');
        };

        const stateStore = new Store(progressBarStateReducer);

        const scopeDestroy$ = observeScopeDestroy(this.scope);

        const stateWhenSeekingChange$ = stateStore
            .select()
            // When the player starts or stop seeking
            .distinctUntilChanged((s1, s2) => s1.isSeeking === s2.isSeeking);

        // Recipy for updating the progress bar when the player is playing
        const updateWhenPlayer$ = this.player
            .switchMap(player =>
                Observable
                    // The events that cause a progress bar update are:
                    .merge(
                        // Whenever the player updates its play progress
                        player.progress$,
                        // When the player loads more data
                        player.loaded$,
                        // Whenever the player completes a seek
                        player.seeked$
                    )
                    // Get the time in percentage
                    .map(_ => player.getCurrentTime() / player.getDuration())
            );

        // Recipy for updating the progress bar
        stateWhenSeekingChange$
            .switchMap(state => {

                if (state.isSeeking) {
                    // If seeking update every mouse move
                    return this.sliderMove$;
                } else {
                    // If not, update when the video player does
                    return updateWhenPlayer$;
                }
            })
            // Get the progress from the mouse move percentage and player data
            .withLatestFrom(this.player, (percentage, player) => ({
                time: Math.round(player.getDuration() * percentage),
                duration: player.getDuration(),
                loaded: player.getLoadedPercent()
            }))

            .takeUntil(scopeDestroy$)
            // Update the progress bar
            .subscribe(({time, duration, loaded}) => updateProgressBar(time, duration, loaded));


        // Update the state that says if the video player was playing before seeking start
        stateStore.select()
            .switchMap(state => {
                if (state.isSeeking) {
                    // If it's seeking we don't update this state
                    return Observable.empty<boolean>();
                } else {
                    // If it's not seeking, then every time the play state changes, see if its playing
                    return this.player
                                .switchMap(player => player.playState$)
                                .map(ev => ev.isPlaying);
                }
            })
            .takeUntil(scopeDestroy$)
            .subscribe(wasPlaying =>
                stateStore.dispatch({
                    type: 'SET_WAS_PLAYING',
                    payload: wasPlaying
                })
            );


        // Update the video player:
        // When seeking starts pause the video player
        // When seeking ends go to the selected percentage and start playing if it was playing before
        stateWhenSeekingChange$
            // Get the player as well
            .withLatestFrom(this.player, (state, player) => ({state, player}))
            .takeUntil(scopeDestroy$)
            .subscribe(({state, player}) => {
                // If it starts seeking, pause the feed
                if (state.isSeeking) {
                    player.pause();
                } else {
                    // When we know where to seek, do it and check if we need to play again
                    player
                        .seekTo(state.seekPercentage * player.getDuration())
                        .then(_ => {
                            if (state.wasPlaying) {
                                player.play();
                            }
                        });
                }
            });

        Observable
            .merge(
                this.sliderDown$.mapTo({type: 'START_SEEKING'} as IStartSeeking),
                this.sliderUp$.map(percentage => ({type: 'STOP_SEEKING', payload: percentage} as IStopSeeking))
            )
            .takeUntil(scopeDestroy$)
            .subscribe(action => stateStore.dispatch(action));

    }

}


type ISetWasPlaying = IPayloadAction<'SET_WAS_PLAYING', boolean>;
type IStartSeeking = ISimpleAction<'START_SEEKING'>;
type IStopSeeking = IPayloadAction<'STOP_SEEKING', number>;

type IProgressBarActions = ISetWasPlaying | IStartSeeking | IStopSeeking;

function progressBarStateReducer (state = initialState, action: IProgressBarActions): IProgressBarState {
    switch (action.type) {
        case 'SET_WAS_PLAYING':
            return {...state, wasPlaying: action.payload};
        case 'START_SEEKING':
            return {...state, isSeeking: true};
        case 'STOP_SEEKING':
            return {...state, isSeeking: false, seekPercentage: action.payload};
        default:
            return state;
    }
}

