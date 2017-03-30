import {Component} from 'rx-player/ng-helper/facade';
@Component({
    selector: 'timeControl',
    template: `
        <span class="control-element">
            <span player-current-time="ctrl.player">0:00</span>
                /
            <span player-total-time="ctrl.player">0:00</span>
        </span>
    `,
    scope: {
        player: '='
    }
})
export class TimeControlComponent {

}
