import {Directive, bindToCtrlCallOnInit} from 'src/ng-helper/facade';

@Directive({
    selector: 'playerTotalTime',
    link: bindToCtrlCallOnInit(['youtubePlayer']),
    require: ['^youtubePlayer']
})
export class PlayerTotalTimeDirective {
    private youtubePlayer: any;

    static $inject = ['$element'];
    constructor (private elm) {
    }

    ngOnInit() {
        this.youtubePlayer
            .getPlayer()
            .then(player => {
                this.elm.html(player.getHumanReadableDuration());
            });
    }
}
