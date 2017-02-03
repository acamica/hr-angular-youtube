import {Component, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import {RxPlayerComponent} from 'src/directive/rx-player.component';

@Component({
    selector: 'playerPause',
    templateUrl: '/template/overlay/player-pause.component.html',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    transclude: true,
    require: ['^rxPlayer']
})
export class PlayerPauseComponent {
    private rxPlayer: RxPlayerComponent;


    static $inject = ['$element'];
    constructor (private elm) {
    }

    ngOnInit () {
        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) =>
                this.elm.on('click', () => player.pause())
            );
    }
}
