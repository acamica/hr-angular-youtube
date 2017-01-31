import {Component, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/service/youtube-player.model';

@Component({
    selector: 'playerPlay',
    templateUrl: '/template/overlay/player-play.component.html',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    transclude: true,
    require: ['^youtubePlayer']
})
export class PlayerPlayComponent {
    private youtubePlayer: any;

    static $inject = ['$element'];
    constructor (private elm) {
    }

    ngOnInit() {
        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) =>
                this.elm.on('click', () => player.play())
            );

    }
}
