import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';

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
            .then(player => {
                const setPlaybackRate = () => this.elm.html(player.getPlaybackRate());
                player.on('onPlaybackRateChange', setPlaybackRate);
                setPlaybackRate();
            });
    }
}


