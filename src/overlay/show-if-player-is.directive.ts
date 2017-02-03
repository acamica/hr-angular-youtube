import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import {RxPlayerComponent} from 'src/directive/rx-player.component';

@Directive({
    selector: 'showIfPlayerIs',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer']
})
export class ShowIfPlayerIsDirective {
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$element', '$animate', '$attrs'];
    constructor (private elm, private $animate, private attrs) {
        // By default hide
        $animate.addClass(elm, 'ng-hide');
    }

    ngOnInit () {
        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) => {
                // Convert it first into the array of string
                const stringStates = this.attrs.showIfPlayerIs.toUpperCase().split(',');

                // Convert the states list into an array of state numbers
                const states = stringStates.map(state => {
                    if (YT.PlayerState.hasOwnProperty(state)) {
                        return YT.PlayerState[state];
                    } else {
                        throw new Error('Video state ' + state + ' is not defined');
                    }
                });

                const hideOrShow = (event) => {
                    if (states.indexOf(event.data) !== -1) {
                        this.$animate.removeClass(this.elm, 'ng-hide');
                    } else {
                        this.$animate.addClass(this.elm, 'ng-hide');
                    }
                };
                // Subscribe to the state change event
                player.on('onStateChange', hideOrShow);
                // Show or hide based on initial status
                hideOrShow({data: player.getPlayerState()});
            });
    }
}
