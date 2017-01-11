import {Component, bindToCtrlCallOnInit} from 'src/ng-helper/facade';

@Component({
    selector: 'playerPlay',
    templateUrl: '/template/overlay/player-play.component.html',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    transclude: true,
    require: ['^youtubePlayer']
})
export class PlayerPlay {
    private youtubePlayer: any;

    static $inject = ['$element'];
    constructor (private elm) {
        console.log('Im in typescript :)');
    }

    ngOnInit() {
        this.youtubePlayer
            .getPlayer()
            .then(player => this.elm.on('click', () => player.playVideo()));
    }
}
