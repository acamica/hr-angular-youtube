import {Component, mockNgOnInitLink} from 'pleier/ng-helper/facade';
import {Observable} from 'pleier/util/rx/facade';
import {IVideoPlayer} from 'pleier/main';
@Component({
    selector: 'playPauseControl',
    template: `
        <div class="control-element">
            <div ng-click="ctrl.play()" ng-hide="ctrl.isPlaying$ | async:this">
                <i class="fa fa-play"></i>
            </div>
            <div ng-click="ctrl.pause()" ng-show="ctrl.isPlaying$ | async:this">
                <i class="fa fa-pause"></i>
            </div>
        </div>
    `,
    scope: {
        player: '='
    },

    link: mockNgOnInitLink(['player'])
})
export class PlayPauseComponent {
    private player: Observable<IVideoPlayer>;

    play () {
        this.player
            .take(1)
            .subscribe(player => player.play());
    }

    pause () {
        this.player
            .take(1)
            .subscribe(player => player.pause());
    }

    isPlaying$: Observable<boolean>;
    ngOnInit () {
        this.isPlaying$ = this.player
                    .switchMap(player => player.playState$.mapTo(player))
                    .map(player => player.isPlaying())
                    .startWith(false);
    }
}
