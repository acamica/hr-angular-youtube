// TODO: Dirty hack to load everything, refactor later
import './directive/rx-player.component';
import './directive/yt-slider.directive';
import './overlay/hr-yt-marker.directive';
import './overlay/player-current-quality.directive';
import './overlay/player-current-speed.directive';
import './overlay/player-current-time.directive';
import './overlay/player-panel.component';
import './overlay/player-pause.component';
import './overlay/player-play.component';
import './overlay/player-progress-bar-hover-indicator.component';
import './overlay/player-progress-bar.component';
import './overlay/player-repeat-available-quality.directive';
import './overlay/player-repeat-available-speed.directive';
import './overlay/player-set-quality.directive';
import './overlay/player-set-speed.directive';
import './overlay/player-total-time.directive';
import './overlay/player-volume-horizontal.component';
import './overlay/show-if-muted.directive';
import './overlay/show-if-player-is.directive';
import './service/youtube-marker-list.model';
import './service/youtube-marker.model';
import './players/youtube/youtube-player.model';
import './service/youtube-readable-time.service';
import './service/youtube-template-marker.model';
import './players/youtube/youtube.service';
import './util/rx/rx-operators-import';

import * as angular from 'angular';
// Add a default handler to avoid missing the event. This can happen if you add the script manually,
// which can be useful for performance
if (typeof window['onYouTubeIframeAPIReady'] === 'undefined') {
    window['onYouTubeIframeAPIReady'] = function () {
        setTimeout(function(){
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


