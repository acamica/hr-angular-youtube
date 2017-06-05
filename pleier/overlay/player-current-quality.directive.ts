import {Directive, bindToCtrlCallOnInit} from '../ng-helper/facade';
import {YoutubePlayer} from '../players/youtube/youtube-player.model';
import {PleierComponent} from '../players/pleier.component';

@Directive({
    selector: 'playerCurrentQuality',
    link: bindToCtrlCallOnInit(['pleier']),
    require: ['^pleier']
})
export class PlayerCurrentQualityComponent {
    private pleier: PleierComponent;

    static $inject = ['$element', '$attrs'];
    constructor (private elm: ng.IAugmentedJQuery, private attrs: ng.IAttributes) {
    }

    ngOnInit () {
        this.pleier
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


