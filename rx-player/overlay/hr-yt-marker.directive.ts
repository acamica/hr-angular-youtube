import * as angular from 'angular';
import {YoutubePlayer} from '../players/youtube/youtube-player.model';
import {bindToCtrlCallOnInit} from '../ng-helper/facade';
import {RxPlayerComponent} from '../players/rx-player.component';

export class YoutubeMarker {
    private rxPlayer: RxPlayerComponent;

    static $inject = ['$element', '$scope'];
    constructor (private elm, private scope) {
    }
    ngOnInit () {

        this.rxPlayer
            .player$
            .subscribe((player: YoutubePlayer) => {
                const duration = player.getDuration();
                const marker = this.scope.marker;
                // If the marker has extra css, add it
                if (marker.barCss !== '') {
                    this.elm.addClass(marker.barCss);
                }

                const setRelativeTime = () => {
                    const relativeTime = 100 * marker.startTime / duration;
                    this.elm.css('left', relativeTime + '%');
                };

                setRelativeTime();

                if (marker.hasOwnProperty('mutable') && marker.mutable) {
                    this.scope.$watch(
                        function () {
                            return marker.startTime;
                        },
                        function (newTime, oldTime) {
                            if (newTime === oldTime) {
                                return;
                            }
                            setRelativeTime();
                        }
                    );
                }
            });
    }
}

angular
    .module('rxPlayer')
    .directive('hrYtMarker', function () {
        return {
            restrict: 'C',
            require: ['hrYtMarker', '^youtubePlayer'],
            scope: {
                marker: '='
            },
            link: bindToCtrlCallOnInit(['rxPlayer']),
            controller: YoutubeMarker
        };
    });

