// TODO: Dirty hack to load everything, refactor later
export * from './directive/rx-player.component';
export * from './directive/yt-slider.directive';
export * from './overlay/hr-yt-marker.directive';
export * from './overlay/player-current-quality.directive';
export * from './overlay/player-current-speed.directive';
export * from './overlay/player-current-time.directive';
export * from './overlay/player-panel.component';
export * from './overlay/player-progress-bar-hover-indicator.component';
export * from './overlay/player-progress-bar.component';
export * from './overlay/player-repeat-available-quality.directive';
export * from './overlay/player-repeat-available-speed.directive';
export * from './overlay/player-set-quality.directive';
export * from './overlay/player-set-speed.directive';
export * from './overlay/player-total-time.directive';
export * from './overlay/player-volume-horizontal.component';
export * from './service/youtube-marker-list.model';
export * from './service/youtube-marker.model';
export * from './players/youtube/youtube-player.model';
export * from './service/youtube-template-marker.model';
export * from './players/youtube/youtube.service';
import './util/rx/rx-operators-import';

import * as angular from 'angular';
// Add a default handler to avoid missing the event. This can happen if you add the script manually,
// which can be useful for performance
// TODO: Move this to a more specific youtube place
if (typeof window['onYouTubeIframeAPIReady'] === 'undefined') {
    window['onYouTubeIframeAPIReady'] = function () {
        setTimeout(function (){
            window['onYouTubeIframeAPIReady']();
        }, 100);
    };
}


angular.module('rxPlayer')

.run(['youtube', function (youtube) {
    if (youtube.getAutoLoad()) {
        // Add the iframe api to the dom
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}]);


