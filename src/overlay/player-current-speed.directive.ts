import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/service/youtube-player.model';

@Directive({
    selector: 'playerCurrentSpeed',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer']
})
export class PlayerCurrentSpeedDirective {
    private youtubePlayer: any;

    static $inject = ['$element'];
    constructor (private elm) {
    }

    ngOnInit() {
        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) => {
                const setPlaybackRate = () => this.elm.html(player.getPlaybackRate());
                player.on('onPlaybackRateChange', setPlaybackRate);
                setPlaybackRate();
            });
    }
}


