import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import {RxPlayerComponent} from 'src/directive/rx-player.component';
import {readableTime} from 'src/service/readable-time.service';

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
            // Get the duration of the video
            .map(player => player.getDuration())
            .map(time => readableTime(time))
            // And assing it to the HTML
            .subscribe(readableTime => this.elm.html(readableTime));
    }
}
