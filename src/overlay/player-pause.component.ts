import {Component, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/service/youtube-player.model';

@Component({
    selector: 'playerPause',
    templateUrl: '/template/overlay/player-pause.component.html',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    transclude: true,
    require: ['^youtubePlayer']
})
export class PlayerPauseComponent {
    private youtubePlayer: any;

    static $inject = ['$element'];
    constructor (private elm) {
    }

    ngOnInit() {
        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) =>
                this.elm.on('click', () => player.pause())
            );
    }
}
