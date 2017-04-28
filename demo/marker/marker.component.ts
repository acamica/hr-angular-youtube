import * as angular from 'angular';
import {Observable} from 'rx-player/util/rx/facade';
import {Component, mockNgOnInitLink} from 'rx-player/ng-helper/facade';
import {PlayPauseComponent, TimeControlComponent} from '../common-controls/facade';
import {
    setPlayerVarDefaultOption,
    IVideoPlayer,
    MarkerRunner,
    RxPlayerComponent,
    ComponentMarker, IMarker, IProgressBarMarker
} from 'rx-player/main';

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
    // videoSource = {
    //     player: 'HTML5Player',
    //     sources: [{
    //         src: 'https://media.w3.org/2010/05/sintel/trailer.ogv',
    //         type: 'video/ogg'
    //     }]
    // };
    videoSource = {
        player: 'YoutubePlayer',
        youtubeId: 'QjX9Wu-MJ-s'
    };

    static $inject = ['$scope', '$element'];
    constructor (private $scope, private elm) {
    }
    markersToShow: IProgressBarMarker[];

    ngOnInit () {
        const player$ = this.$scope['playerCtrl'].player$ as Observable<IVideoPlayer>;
        const markers: IMarker[] = [
            {
                startTime: 3,
                endTime: 7,
                onStart: () => console.log('from 3'),
                onEnd: () => console.log('end from 3 to 7')
            },
            {
                startTime: 10,
                endTime: 12,
                onStart: () => console.log('from 10 to 12 (without onEnd)')
            },
            new ComponentMarker({
                startTime: 2,
                endTime: 6,
                template: '<h1>from 2 to 6!!</h1>',
                parentElm: this.elm
            }),
            new ComponentMarker({
                startTime: 13,
                endTime: 15,
                template: '<h1>from 13 to 15 with lazy element</h1>'
            })
        ];


        // Select a subset of the markers to show in the progress bar
        // this.markersToShow = [markers[0], markers[1]];
        // this.markersToShow = [markers[0]];
        // Convert the markers into the progress bar format
        this.markersToShow = markers.map(m => ({
            marker: m
        }));

        // Bind the 3rd marker parent
        const markerWithoutParent = markers[3] as ComponentMarker;
        const self = this;
        markerWithoutParent.onStart = function () {
            this.render(self.elm);
        };
        // Set red colour to the 3rd marker
        this.markersToShow[3].barCssClass = 'red';

        player$
            .subscribe(player => {
                player.mute();
                // player.play();
                new MarkerRunner(player, markers);
            });
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



