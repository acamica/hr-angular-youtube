/* global angular, YT */


(function(angular) {
    angular.module('hrAngularYoutube')

    .directive('showIfMuted', ['$animate', function($animate) {
        return {
            restrict: 'A',
            require: '^youtubePlayer',
            link: function(scope, elm, attrs,youtubePlayerCtrl) {
                // By default hide
                $animate.addClass(elm, 'ng-hide');
                youtubePlayerCtrl.getPlayer().then(function(player){
                    var hideOrShow = function () {
                        var show = !player.isMuted();
                        if (attrs.showIfMuted === 'true') {
                            show = !show;
                        }

                        if ( show ) {
                            $animate.removeClass(elm, 'ng-hide');
                        } else {
                            $animate.addClass(elm, 'ng-hide');
                        }
                    };
                    hideOrShow();
                    player.on('muteChange', hideOrShow);
                });
            }
        };
    }])
    ;

})(angular);


