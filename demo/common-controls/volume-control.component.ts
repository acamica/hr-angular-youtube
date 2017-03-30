import {Component} from 'rx-player/ng-helper/facade';
@Component({
    selector: 'volumeControl',
    template: `
        <span class="control-element">
            <player-volume-horizontal player="ctrl.player" #volume-ctrl>
                <i ng-show="volumeCtrl.isMuted | async:this" class="fa fa-volume-off"></i>
                <i ng-hide="volumeCtrl.isMuted | async:this" class="fa fa-volume-up"></i>
            </player-volume-horizontal>
        </span>
    `,
    scope: {
        player: '='
    }
})
export class VolumeControlComponent {

}
