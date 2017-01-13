import {Component, bindToCtrlCallOnInit} from 'src/ng-helper/facade';

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
            .then(player => this.elm.on('click', () => player.pauseVideo()));
    }
}
