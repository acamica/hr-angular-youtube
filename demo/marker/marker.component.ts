import * as angular from 'angular';
import {Component, mockNgOnInitLink} from 'rx-player/ng-helper/facade';
import {RxPlayerComponent} from 'rx-player/players/rx-player.component';
import {PlayPauseComponent, TimeControlComponent} from '../common-controls/facade';
import {Observable} from 'rx-player/util/rx/facade';
import {setPlayerVarDefaultOption, IVideoPlayer} from 'rx-player/main';
import {MarkerRunner} from 'rx-player/markers/marker-runner.service';
// import {setPlayerVarDefaultOption} from 'rx-player/main';
import 'ui.bootstrap';
import 'rx-player/ng-helper/async.filter';

// Create the app module and configure it
angular
    .module('demoMarker', ['rxPlayer', 'rxPlayerTpls', 'ui.bootstrap']);

setPlayerVarDefaultOption('controls', 0);
setPlayerVarDefaultOption('rel', 0);
setPlayerVarDefaultOption('modestbranding', 1);

@Component({
    selector: 'markerDemo',
    templateUrl: '/demo/marker/marker.component.html',
    link: mockNgOnInitLink(['playerCtrl']),
    directives: [RxPlayerComponent, PlayPauseComponent, TimeControlComponent],
})
export class ControlsDemoComponent {
    videoSource = {
        player: 'HTML5Player',
        sources: [{
            src: 'https://media.w3.org/2010/05/sintel/trailer.ogv',
            type: 'video/ogg'
        }]
    };
    // videoSource = {
    //     player: 'YoutubePlayer',
    //     youtubeId: 'QjX9Wu-MJ-s'
    // };

    static $inject = ['$scope'];
    constructor (private $scope) {
    }



    ngOnInit () {
        const player$ = this.$scope['playerCtrl'].player$ as Observable<IVideoPlayer>;
        const markers = [
            {
                startTime: 3,
                endTime: 4,
                onStart: () => console.log('first marker started'),
                onEnd: () => console.log('first marker ended')
            },
            {
                startTime: 4,
                endTime: 5,
                onStart: () => console.log('second marker (without onEnd)')
            }
        ];
        player$
            .subscribe(player => new MarkerRunner(player, markers));
        // $scope.$watch('player1', function (player) {
        // player.mute();
        // player.addMarker(new YoutubeMarker({
        //     startTime: 3,
        //     showMarker: false,
        //     handler: function () {
        //         console.log('Basic marker!');
        //     }
        // }));


        // player.addMarker(new YoutubeTemplateMarker({
        //     startTime: 10,
        //     duration: 3,
        //     template: '<div class="example-marker">This only shows when the video passes normally</div>',
        // }));

        // player.addMarker(new YoutubeTemplateMarker({
        //     startTime: 15,
        //     duration: 3,
        //     launchOnSeek: true,
        //     template: '<div class="example-marker">This shows even if you seek trough</div>'
        // }));

        // player.addMarker(new YoutubeTemplateMarker({
        //     startTime: 30,
        //     blockFF: true,
        //     fireOnce: true,
        //     template: '<div class="full-screen-marker-example">This blocks your seek, but only once' +
        //               '<button ng-click="closeMarker()">close</button></div>',
        //     link: function (player, $scope) {
        //         console.log('linkin!');
        //         let self = this;
        //         $scope.closeMarker = function () {
        //             self.destroy();
        //             player.playVideo();
        //         };
        //         player.pauseVideo();
        //     }
        // }));

    // });
    }
}



