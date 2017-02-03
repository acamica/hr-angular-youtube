import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import {RxPlayerComponent} from 'src/directive/rx-player.component';

@Directive({
    selector: 'playerCurrentSpeed',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer']
})
export class PlayerCurrentSpeedDirective {
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$element'];
    constructor (private elm) {
    }

    ngOnInit () {
        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) => {
                const setPlaybackRate = () => this.elm.html(player.getPlaybackRate());
                player.on('onPlaybackRateChange', setPlaybackRate);
                setPlaybackRate();
            });
    }
}


