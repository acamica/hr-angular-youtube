import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import {RxPlayerComponent} from 'src/directive/rx-player.component';

@Directive({
    selector: 'playerTotalTime',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer']
})
export class PlayerTotalTimeDirective {
    private rxPlayer: RxPlayerComponent;


    static $inject = ['$element'];
    constructor (private elm) {
    }

    ngOnInit () {
        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) => {
                this.elm.html(player.getHumanReadableDuration());
            });
    }
}
