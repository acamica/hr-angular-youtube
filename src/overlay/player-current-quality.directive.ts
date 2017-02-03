import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import {RxPlayerComponent} from 'src/directive/rx-player.component';

@Directive({
    selector: 'playerCurrentQuality',
    link: bindToCtrlCallOnInit(['rxPlayer']),
    require: ['^rxPlayer']
})
export class PlayerCurrentQualityComponent {
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$element', '$attrs'];
    constructor (private elm, private attrs) {
    }

    ngOnInit () {
        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) => {
                const setPlaybackQuality = () => {
                    let quality;
                    if (this.attrs.hasOwnProperty('intendedQuality')) {
                        let showRealAuto = false;
                        if (this.attrs.hasOwnProperty('showRealAuto')) {
                            showRealAuto = true;
                        }
                        quality = player.getHumanIntendedPlaybackQuality(showRealAuto);
                    } else {
                        quality = player.getHumanPlaybackQuality ();
                    }
                    this.elm.html(quality);
                };
                player.on('onPlaybackQualityChange', setPlaybackQuality);
                player.on('onIntentPlaybackQualityChange', setPlaybackQuality);
                setPlaybackQuality();
            });
    }
}


