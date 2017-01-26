(function(module) {
try {
  module = angular.module('rxPlayerTpls');
} catch (e) {
  module = angular.module('rxPlayerTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/directive/rx-player.component.html',
    '<div class="hr-yt-wrapper">\n' +
    '    <div class="hr-yt-video-place-holder"></div>\n' +
    '    <div class="hr-yt-overlay" ng-transclude=""></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rxPlayerTpls');
} catch (e) {
  module = angular.module('rxPlayerTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/overlay/player-panel.component.html',
    '<div ng-transclude=""></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rxPlayerTpls');
} catch (e) {
  module = angular.module('rxPlayerTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/overlay/player-pause.component.html',
    '<div style="display: inherit" ng-transclude=""></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rxPlayerTpls');
} catch (e) {
  module = angular.module('rxPlayerTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/overlay/player-play.component.html',
    '<div style="display: inherit" ng-transclude=""></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rxPlayerTpls');
} catch (e) {
  module = angular.module('rxPlayerTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/overlay/player-progress-bar-hover-indicator.component.html',
    '<div class="hr-hover-indicator">\n' +
    '    <span ng-bind="time"></span>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rxPlayerTpls');
} catch (e) {
  module = angular.module('rxPlayerTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/overlay/player-progress-bar.component.html',
    '<div yt-slider="onSliderUp($percentage)"\n' +
    '     yt-slider-down="onSliderDown()"\n' +
    '     yt-slider-move="onSliderMove($percentage)"\n' +
    '     style="width:100%;height:100%;">\n' +
    '        <div class="hr-yt-played"></div>\n' +
    '        <div class="hr-yt-loaded"></div>\n' +
    '        <div class="hr-yt-handle"></div>\n' +
    '</div>\n' +
    '<span ng-repeat="marker in markers" class="hr-yt-marker" ng-if="marker.showMarker" marker="marker">\n' +
    '    </span>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('rxPlayerTpls');
} catch (e) {
  module = angular.module('rxPlayerTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/overlay/player-volume-horizontal.component.html',
    '<div ng-click="toggleMute()" class="ng-transclude"></div>\n' +
    '    <div class="hr-yt-volume-hr-bar"\n' +
    '         yt-slider-move="onSliderMove($percentage)"\n' +
    '         yt-slider="onSliderUp($percentage)">\n' +
    '    <div class="hr-yt-setted"></div>\n' +
    '    <div class="hr-yt-handle"></div>\n' +
    '</div>\n' +
    '');
}]);
})();
