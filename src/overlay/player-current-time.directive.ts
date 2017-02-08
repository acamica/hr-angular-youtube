import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import {RxPlayerComponent} from 'src/directive/rx-player.component';
import {readableTime} from 'src/service/readable-time.service';

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
            // Whenever the player updates its progress
            .switchMap(player => player.progress$)
            // Get the current time in readable form
            .map(event => event.time)
            .map(time => readableTime(time))
            // And assing it to the HTML
            .subscribe(readableTime => this.elm.html(readableTime));
    }
}
