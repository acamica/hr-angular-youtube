import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import {RxPlayerComponent} from 'src/directive/rx-player.component';

@Directive({
    selector: 'playerCurrentTime',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer']
})
export class PlayerCurrentTimeComponent {
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$element'];
    constructor (private elm) {
    }

    ngOnInit () {
        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) => {
                player.onProgress(() =>
                    this.elm.html(player.getHumanReadableCurrentTime())
                , 250);
                player.on('seekToCompleted', () => {
                    this.elm.html(player.getHumanReadableCurrentTime());
                });
            });
    }
}
