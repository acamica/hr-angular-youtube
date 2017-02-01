import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';

@Directive({
    selector: 'playerCurrentTime',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer']
})
export class PlayerCurrentTimeComponent {
    private youtubePlayer: any;

    static $inject = ['$element'];
    constructor (private elm) {
    }

    ngOnInit() {
        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) => {
                player.onProgress(() =>
                    this.elm.html(player.getHumanReadableCurrentTime())
                , 250);
                player.on('seekToCompleted', () => {
                    this.elm.html(player.getHumanReadableCurrentTime());
                });
            });
    }
}
