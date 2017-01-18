import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';
import {YoutubePlayer} from 'src/service/youtube-player.model';

@Directive({
    selector: 'playerCurrentQuality',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer']
})
export class PlayerCurrentQualityComponent {
    private youtubePlayer: any;

    static $inject = ['$element', '$attrs'];
    constructor (private elm, private attrs) {
    }

    ngOnInit() {
        this.youtubePlayer
            .getPlayer()
            .then((player: YoutubePlayer) => {
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


