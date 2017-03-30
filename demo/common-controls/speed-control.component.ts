import {Component} from 'rx-player/ng-helper/facade';
@Component({
    selector: 'speedControl',
    template: `
        <span class="control-element dropdown-control" uib-dropdown style="float:right">
            <div class="dropdown-toggle" uib-dropdown-toggle>
                <span player-current-speed="ctrl.player">1</span>x</div>
            <ul class="dropdown-control-options dropdown-menu">
                <li player-repeat-available-speed reverse ng-class="{'active': $speed == video.getPlaybackRate()}">
                    <a dropdown-toggle player-set-speed="$speed">{{$speed}}x</a>
                </li>
            </ul>
        </span>
    `,
    scope: {
        player: '='
    }
})
export class SpeedControlComponent {

}
