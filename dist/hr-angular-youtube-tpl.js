(function(module) {
try {
  module = angular.module('hrAngularYoutubeTpls');
} catch (e) {
  module = angular.module('hrAngularYoutubeTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/directive/youtube-player.component.html',
    '<div class="hr-yt-wrapper">\n' +
    '    <div class="hr-yt-video-place-holder"></div>\n' +
    '    <div class="hr-yt-overlay" ng-transclude=""></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('hrAngularYoutubeTpls');
} catch (e) {
  module = angular.module('hrAngularYoutubeTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/overlay/player-panel.component.html',
    '<div ng-transclude=""></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('hrAngularYoutubeTpls');
} catch (e) {
  module = angular.module('hrAngularYoutubeTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/overlay/player-pause.component.html',
    '<div style="display: inherit" ng-transclude=""></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('hrAngularYoutubeTpls');
} catch (e) {
  module = angular.module('hrAngularYoutubeTpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/template/overlay/player-play.component.html',
    '<div style="display: inherit" ng-transclude=""></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('hrAngularYoutubeTpls');
} catch (e) {
  module = angular.module('hrAngularYoutubeTpls', []);
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
  module = angular.module('hrAngularYoutubeTpls');
} catch (e) {
  module = angular.module('hrAngularYoutubeTpls', []);
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
  module = angular.module('hrAngularYoutubeTpls');
} catch (e) {
  module = angular.module('hrAngularYoutubeTpls', []);
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

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("src/ng-helper/module", ["angular"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular;
    return {
        setters: [
            function (angular_1) {
                angular = angular_1;
            }
        ],
        execute: function () {
            angular.module('hrAngularYoutube', ['hrAngularExtend' ,'hrAngularYoutubeTpls']);
        }
    };
});
System.register("src/ng-helper/component", ["angular", "src/ng-helper/module"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function Component(definition) {
        return function (target) {
            angular
                .module('hrAngularYoutube')
                .directive(definition.selector, function () {
                var require = [definition.selector];
                if (definition.require) {
                    require = require.concat(definition.require);
                }
                var scope = __assign({}, definition.scope);
                var component = {
                    restrict: 'E',
                    templateUrl: definition.templateUrl,
                    template: definition.template,
                    scope: scope,
                    controllerAs: 'ctrl',
                    controller: target,
                    bindToController: true,
                    link: definition.link,
                    transclude: definition.transclude,
                    require: require
                };
                return component;
            });
        };
    }
    exports_2("Component", Component);
    var angular;
    return {
        setters: [
            function (angular_2) {
                angular = angular_2;
            },
            function (_1) {
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/ng-helper/compose-link", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    /**
     * Calls multiple link functions
     */
    function composeLinkFn(links) {
        return function (scope, elm, attr, ctrl, trans) {
            var _this = this;
            links.forEach(function (link) { return link.call(_this, scope, elm, attr, ctrl, trans); });
        };
    }
    exports_3("composeLinkFn", composeLinkFn);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/ng-helper/directive", ["angular", "src/ng-helper/module"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function Directive(definition) {
        return function (target) {
            angular
                .module('hrAngularYoutube')
                .directive(definition.selector, function () {
                var require = [definition.selector];
                if (definition.require) {
                    require = require.concat(definition.require);
                }
                var directive = {
                    restrict: 'A',
                    controller: target,
                    link: definition.link,
                    multiElement: definition.multiElement,
                    transclude: definition.transclude,
                    priority: definition.priority,
                    terminal: definition.terminal,
                    require: require,
                    // TODO: REMOVE
                    replace: definition.replace,
                    template: definition.template
                };
                return directive;
            });
        };
    }
    exports_4("Directive", Directive);
    var angular;
    return {
        setters: [
            function (angular_3) {
                angular = angular_3;
            },
            function (_2) {
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/ng-helper/lifecycle", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function getter(accesor) {
        var parts = accesor.split('.');
        function doGet(obj, p) {
            if (obj === undefined || p.length === 0) {
                return obj;
            }
            return doGet(obj[p[0]], p.slice(1));
        }
        return function (obj) { return doGet(obj, parts); };
    }
    function watchAndCall(watchers, hook) {
        return function (scope, elm, attr, ctrls) {
            var ctrl = ctrls[0];
            var watcherGetter = watchers.map(function (w) { return getter(w); });
            var u = scope.$watch(function () {
                // if (hook === 'ngAfterContentInit') console.log('hey', scope);
                for (var i = 0; i < watchers.length; i++) {
                    // If the watcher is not in the scope nor the ctrl, we continue watching
                    if (!(watcherGetter[i](ctrl) || watcherGetter[i](scope))) {
                        return;
                    }
                }
                u();
                ctrl[hook]();
            });
        };
    }
    /**
     * Waits until all watchers are not falsy and calls ngOnInit on the
     * the controller.
     * See http://learnangular2.com/lifecycle/
     * This link function assumes:
     *      * The component's require definition is an array and its first value is the component ctrl
     *      * The components ctrl has a method ngOnInit
     */
    function mockNgOnInitLink(watchers) {
        return watchAndCall(watchers, 'ngOnInit');
    }
    exports_5("mockNgOnInitLink", mockNgOnInitLink);
    /**
     * Waits until all watchers are not falsy and calls ngAfterViewInit on the
     * the controller.
     * See http://learnangular2.com/lifecycle/
     * This link function assumes:
     *      * The component's require definition is an array and its first value is the component ctrl
     *      * The components ctrl has a method ngAfterViewInit
     */
    function mockNgAfterViewInit(watchers) {
        return watchAndCall(watchers, 'ngAfterViewInit');
    }
    exports_5("mockNgAfterViewInit", mockNgAfterViewInit);
    /**
     * Waits until all watchers are not falsy and calls ngAfterViewInit on the
     * the controller.
     * See http://learnangular2.com/lifecycle/
     * This link function assumes:
     *      * The component's require definition is an array and its first value is the component ctrl
     *      * The components ctrl has a method ngAfterViewInit
     */
    function mockNgAfterContentInit(watchers) {
        return watchAndCall(watchers, 'ngAfterContentInit');
    }
    exports_5("mockNgAfterContentInit", mockNgAfterContentInit);
    function mockNgOnInitFromAttr(attribute) {
        return function (scope, elm, attr, ctrls) {
            var u = scope.$watch(attr[attribute], function (attributeWatched) {
                if (typeof attributeWatched !== 'undefined') {
                    u();
                    ctrls[0]['ngOnInit']();
                }
            });
        };
    }
    exports_5("mockNgOnInitFromAttr", mockNgOnInitFromAttr);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/ng-helper/require", ["src/ng-helper/compose-link", "src/ng-helper/lifecycle"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    /**
     * Used as directive link function
     * when you use a require to get controllers, this function saves the controllers inside
     * the self controller as in Angular 1.5^.
     * Expects the first require element to be self controller
     * and the parameters are the name with wich each module is going to be save in self ctrl
     * Example:
     * {
     *     require: ['acExample', 'acAnother', '^acAnotherParent'],
     *     link: AC.bindRequireToCtrl(['anotherCtrl', 'anotherParentCtrl'])
     * }
     */
    function bindRequireToCtrl(ctrlsAliases) {
        return function (scope, elm, attrs, ctrls) {
            var mainCtrl = ctrls[0];
            ctrls.splice(1).forEach(function (ctrl, index) {
                if (ctrl) {
                    mainCtrl[ctrlsAliases[index]] = ctrl;
                }
            });
        };
    }
    exports_6("bindRequireToCtrl", bindRequireToCtrl);
    function bindToCtrlCallOnInit(ctrls) {
        return compose_link_1.composeLinkFn([
            bindRequireToCtrl(ctrls),
            lifecycle_1.mockNgOnInitLink(ctrls)
        ]);
    }
    exports_6("bindToCtrlCallOnInit", bindToCtrlCallOnInit);
    var compose_link_1, lifecycle_1;
    return {
        setters: [
            function (compose_link_1_1) {
                compose_link_1 = compose_link_1_1;
            },
            function (lifecycle_1_1) {
                lifecycle_1 = lifecycle_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/ng-helper/facade", ["src/ng-helper/component", "src/ng-helper/compose-link", "src/ng-helper/directive", "src/ng-helper/lifecycle", "src/ng-helper/require"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default")
                exports[n] = m[n];
        }
        exports_7(exports);
    }
    return {
        setters: [
            function (component_1_1) {
                exportStar_1(component_1_1);
            },
            function (compose_link_2_1) {
                exportStar_1(compose_link_2_1);
            },
            function (directive_1_1) {
                exportStar_1(directive_1_1);
            },
            function (lifecycle_2_1) {
                exportStar_1(lifecycle_2_1);
            },
            function (require_1_1) {
                exportStar_1(require_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/directive/youtube-player.component", ["src/ng-helper/facade", "angular"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function convertToUnits(u) {
        // If its numbers, interpret pixels
        if (typeof u === 'number' || /^\d+$/.test(u)) {
            return u + 'px';
        }
        return u;
    }
    var facade_1, angular, playerAttrs, playerVarAttrs, YoutubePlayerComponent;
    return {
        setters: [
            function (facade_1_1) {
                facade_1 = facade_1_1;
            },
            function (angular_4) {
                angular = angular_4;
            }
        ],
        execute: function () {
            playerAttrs = ['id', 'height', 'width'];
            playerVarAttrs = ['autohide', 'autoplay', 'ccLoadPolicy', 'color', 'controls',
                'disablekb', 'enablejsapi', 'end', 'fs', 'ivLoadPolicy',
                'list', 'listType', 'loop', 'modestbranding', 'origin', 'playerapiid',
                'playlist', 'playsinline', 'rel', 'showinfo', 'start', 'theme'];
            // TODO: Refacto Heavily
            YoutubePlayerComponent = (function () {
                function YoutubePlayerComponent(elm, attrs, scope, youtube, $q) {
                    this.elm = elm;
                    this.attrs = attrs;
                    this.scope = scope;
                    this.youtube = youtube;
                    this.$q = $q;
                    this.$videoElm = null;
                    this.player = $q.defer();
                    elm.css('position', 'relative');
                    elm.css('display', 'block');
                    // Save the overlay element in the controller so child directives can use it
                    // TODO: check this out again
                    this.setOverlayElement(elm);
                    this.ngOnInit();
                }
                // FROM ex controller
                YoutubePlayerComponent.prototype.setPlayer = function (p) {
                    this.player.resolve(p);
                };
                YoutubePlayerComponent.prototype.getPlayer = function () {
                    return this.player.promise;
                };
                YoutubePlayerComponent.prototype.destroyPlayer = function () {
                    this.player.promise.then(function (p) {
                        p.destroy();
                    });
                    this.player = this.$q.defer();
                };
                YoutubePlayerComponent.prototype.setOverlayElement = function (elm) {
                    this.$overlayElm = elm;
                };
                YoutubePlayerComponent.prototype.getOverlayElement = function () {
                    return this.$overlayElm;
                };
                YoutubePlayerComponent.prototype.getVideoElement = function () {
                    if (this.$videoElm === null) {
                        this.$videoElm = angular.element(this.getOverlayElement()[0].querySelector('.hr-yt-video-place-holder'));
                    }
                    return this.$videoElm;
                };
                ;
                YoutubePlayerComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var $videoDiv = this.elm[0].querySelector('.hr-yt-video-place-holder');
                    var $overlayElm = angular.element(this.elm[0].querySelector('.hr-yt-overlay'));
                    var options = {
                        playerVars: {}
                    };
                    playerAttrs.forEach(function (name) {
                        if (_this.attrs.hasOwnProperty(name)) {
                            options[name] = _this.attrs[name];
                        }
                    });
                    playerVarAttrs.forEach(function (name) {
                        if (_this.attrs.hasOwnProperty(name)) {
                            options.playerVars[name] = _this.attrs[name];
                        }
                    });
                    // See if there is a specific player
                    var playerFactoryName = this.attrs.playerFactory || 'YoutubePlayer';
                    var instanceCreated = false;
                    var createVideo = function () {
                        instanceCreated = true;
                        options.videoId = _this.videoId;
                        if (!options.hasOwnProperty('width') && !options.hasOwnProperty('height')) {
                            options.height = '390';
                            options.width = '640';
                        }
                        _this.elm.css('height', convertToUnits(options.height));
                        _this.elm.css('width', convertToUnits(options.width));
                        _this.youtube.loadPlayer(playerFactoryName, $videoDiv, options).then(function (player) {
                            _this.setPlayer(player);
                            player.setOverlayElement($overlayElm);
                            // TODO: I dont like this
                            if (typeof _this.ngModelCtrl !== 'undefined') {
                                _this.ngModelCtrl.$setViewValue(player);
                            }
                            return player;
                        });
                    };
                    this.scope.$watch(function () { return _this.videoId; }, function (id) {
                        if (typeof id === 'undefined') {
                            return;
                        }
                        if (!instanceCreated) {
                            createVideo();
                        }
                        else {
                            _this.getPlayer().then(function (p) {
                                p.loadVideoById(id);
                            });
                        }
                    });
                    var aspectRatio = 16 / 9;
                    // Maybe add some sort of debounce, but without adding a dependency
                    var resizeWithAspectRatio = function () {
                        if (options.height) {
                            var w = Math.round(_this.elm[0].clientHeight * aspectRatio);
                            _this.elm.css('width', convertToUnits(w));
                        }
                        else if (options.width) {
                            var h = Math.round(_this.elm[0].clientWidth / aspectRatio);
                            _this.elm.css('height', convertToUnits(h));
                        }
                    };
                    if (this.attrs.hasOwnProperty('keepAspectRatio')) {
                        // If aspect ratio is a string like '16:9', set the proper variable.
                        var aspectMatch = this.attrs.keepAspectRatio.match(/^(\d+):(\d+)$/);
                        if (aspectMatch) {
                            aspectRatio = aspectMatch[1] / aspectMatch[2];
                        }
                        angular.element(window).bind('resize', resizeWithAspectRatio);
                        // If the window or the element size changes, resize the element
                        var unit_1 = 0;
                        this.scope.$watch(function () {
                            var newUnit = 0;
                            if (options.height) {
                                newUnit = _this.elm[0].clientHeight;
                            }
                            else {
                                newUnit = _this.elm[0].clientWidth;
                            }
                            if (unit_1 !== newUnit && newUnit !== 0) {
                                setTimeout(function () {
                                    _this.scope.$apply(resizeWithAspectRatio);
                                });
                                unit_1 = newUnit;
                            }
                        });
                    }
                    this.scope.$on('$destroy', function () {
                        this.destroyPlayer();
                        instanceCreated = false;
                        if (typeof this.ngModelCtrl !== 'undefined') {
                            this.ngModelCtrl.$setViewValue(undefined);
                        }
                        angular.element(window).unbind('resize', resizeWithAspectRatio);
                    });
                };
                return YoutubePlayerComponent;
            }());
            YoutubePlayerComponent.$inject = ['$element', '$attrs', '$scope', 'youtube', '$q'];
            YoutubePlayerComponent = __decorate([
                facade_1.Component({
                    selector: 'youtubePlayer',
                    templateUrl: '/template/directive/youtube-player.component.html',
                    transclude: true,
                    link: facade_1.bindRequireToCtrl(['ngModelCtrl']),
                    scope: {
                        videoId: '='
                    },
                    require: ['?ngModel']
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
            ], YoutubePlayerComponent);
            exports_8("YoutubePlayerComponent", YoutubePlayerComponent);
        }
    };
});
System.register("src/directive/yt-slider.directive", ["src/ng-helper/facade", "angular"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var facade_2, angular, YoutubeSliderDirective;
    return {
        setters: [
            function (facade_2_1) {
                facade_2 = facade_2_1;
            },
            function (angular_5) {
                angular = angular_5;
            }
        ],
        execute: function () {
            YoutubeSliderDirective = (function () {
                function YoutubeSliderDirective(elm, attrs, scope, $parse, $document) {
                    this.elm = elm;
                    this.attrs = attrs;
                    this.scope = scope;
                    this.$parse = $parse;
                    this.$document = $document;
                }
                YoutubeSliderDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    var slideDown = this.$parse(this.attrs.ytSliderDown);
                    var sliderMove = this.$parse(this.attrs.ytSliderMove);
                    var sliderUp = this.$parse(this.attrs.ytSlider);
                    var getPercentageFromPageX = function (pagex) {
                        // Get the player bar x from the page x
                        var left = _this.elm[0].getBoundingClientRect().left;
                        var x = Math.min(Math.max(0, pagex - left), _this.elm[0].clientWidth);
                        // Get the percentage of the bar
                        var xpercent = x / _this.elm[0].clientWidth;
                        return xpercent;
                    };
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        var $videoElm = _this.youtubePlayer.getVideoElement();
                        _this.elm.on('mousedown', function (e) {
                            // If it wasn't a left click, end
                            if (e.button !== 0) {
                                return;
                            }
                            var p = getPercentageFromPageX(e.pageX);
                            slideDown(_this.scope, { $percentage: p });
                            // Create a blocker div, so that the iframe doesn't eat the mouse up events
                            var $blocker = angular.element('<div></div>');
                            $blocker.css('position', 'absolute');
                            $blocker.css('width', $videoElm[0].clientWidth + 'px');
                            $blocker.css('height', $videoElm[0].clientHeight + 'px');
                            $blocker.css('pointer-events', 'false');
                            $blocker.css('top', '0');
                            $videoElm.parent().append($blocker);
                            var documentMouseMove = function (event) {
                                _this.scope.$apply(function () {
                                    var p = getPercentageFromPageX(event.pageX);
                                    sliderMove(_this.scope, { $percentage: p });
                                });
                            };
                            var documentMouseUp = function (event) {
                                _this.scope.$apply(function () {
                                    var p = getPercentageFromPageX(event.pageX);
                                    // Remove the event listeners for the drag and drop
                                    _this.$document.off('mousemove', documentMouseMove);
                                    _this.$document.off('mouseup', documentMouseUp);
                                    // remove the div that was blocking the events of the iframe
                                    $blocker.remove();
                                    sliderUp(_this.scope, { $percentage: p });
                                });
                            };
                            _this.$document.on('mousemove', documentMouseMove);
                            _this.$document.on('mouseup', documentMouseUp);
                        });
                    });
                };
                return YoutubeSliderDirective;
            }());
            YoutubeSliderDirective.$inject = ['$element', '$attrs', '$scope', '$parse', '$document'];
            YoutubeSliderDirective = __decorate([
                facade_2.Directive({
                    selector: 'ytSlider',
                    link: facade_2.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
            ], YoutubeSliderDirective);
            exports_9("YoutubeSliderDirective", YoutubeSliderDirective);
        }
    };
});
System.register("src/overlay/hr-yt-marker.directive", ["angular", "src/ng-helper/facade"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var angular, facade_3, YoutubeMarker;
    return {
        setters: [
            function (angular_6) {
                angular = angular_6;
            },
            function (facade_3_1) {
                facade_3 = facade_3_1;
            }
        ],
        execute: function () {
            YoutubeMarker = (function () {
                function YoutubeMarker(elm, scope) {
                    this.elm = elm;
                    this.scope = scope;
                }
                YoutubeMarker.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        var duration = player.getDuration();
                        var marker = _this.scope.marker;
                        // If the marker has extra css, add it
                        if (marker.barCss !== '') {
                            _this.elm.addClass(marker.barCss);
                        }
                        var setRelativeTime = function () {
                            var relativeTime = 100 * marker.startTime / duration;
                            _this.elm.css('left', relativeTime + '%');
                        };
                        setRelativeTime();
                        if (marker.hasOwnProperty('mutable') && marker.mutable) {
                            _this.scope.$watch(function () {
                                return marker.startTime;
                            }, function (newTime, oldTime) {
                                if (newTime === oldTime) {
                                    return;
                                }
                                setRelativeTime();
                            });
                        }
                    });
                };
                return YoutubeMarker;
            }());
            YoutubeMarker.$inject = ['$element', '$scope'];
            exports_10("YoutubeMarker", YoutubeMarker);
            angular
                .module('hrAngularYoutube')
                .directive('hrYtMarker', function () {
                return {
                    restrict: 'C',
                    require: ['hrYtMarker', '^youtubePlayer'],
                    scope: {
                        marker: '='
                    },
                    link: facade_3.bindToCtrlCallOnInit(['youtubePlayer']),
                    controller: YoutubeMarker
                };
            });
        }
    };
});
System.register("src/overlay/player-current-quality.directive", ["src/ng-helper/facade"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var facade_4, PlayerCurrentQualityComponent;
    return {
        setters: [
            function (facade_4_1) {
                facade_4 = facade_4_1;
            }
        ],
        execute: function () {
            PlayerCurrentQualityComponent = (function () {
                function PlayerCurrentQualityComponent(elm, attrs) {
                    this.elm = elm;
                    this.attrs = attrs;
                }
                PlayerCurrentQualityComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        var setPlaybackQuality = function () {
                            var quality;
                            if (_this.attrs.hasOwnProperty('intendedQuality')) {
                                var showRealAuto = false;
                                if (_this.attrs.hasOwnProperty('showRealAuto')) {
                                    showRealAuto = true;
                                }
                                quality = player.getHumanIntendedPlaybackQuality(showRealAuto);
                            }
                            else {
                                quality = player.getHumanPlaybackQuality();
                            }
                            _this.elm.html(quality);
                        };
                        player.on('onPlaybackQualityChange', setPlaybackQuality);
                        player.on('onIntentPlaybackQualityChange', setPlaybackQuality);
                        setPlaybackQuality();
                    });
                };
                return PlayerCurrentQualityComponent;
            }());
            PlayerCurrentQualityComponent.$inject = ['$element', '$attrs'];
            PlayerCurrentQualityComponent = __decorate([
                facade_4.Directive({
                    selector: 'playerCurrentQuality',
                    link: facade_4.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object, Object])
            ], PlayerCurrentQualityComponent);
            exports_11("PlayerCurrentQualityComponent", PlayerCurrentQualityComponent);
        }
    };
});
System.register("src/overlay/player-current-speed.directive", ["src/ng-helper/facade"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var facade_5, PlayerCurrentSpeedDirective;
    return {
        setters: [
            function (facade_5_1) {
                facade_5 = facade_5_1;
            }
        ],
        execute: function () {
            PlayerCurrentSpeedDirective = (function () {
                function PlayerCurrentSpeedDirective(elm) {
                    this.elm = elm;
                }
                PlayerCurrentSpeedDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        var setPlaybackRate = function () { return _this.elm.html(player.getPlaybackRate()); };
                        player.on('onPlaybackRateChange', setPlaybackRate);
                        setPlaybackRate();
                    });
                };
                return PlayerCurrentSpeedDirective;
            }());
            PlayerCurrentSpeedDirective.$inject = ['$element'];
            PlayerCurrentSpeedDirective = __decorate([
                facade_5.Directive({
                    selector: 'playerCurrentSpeed',
                    link: facade_5.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object])
            ], PlayerCurrentSpeedDirective);
            exports_12("PlayerCurrentSpeedDirective", PlayerCurrentSpeedDirective);
        }
    };
});
System.register("src/overlay/player-current-time.directive", ["src/ng-helper/facade"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var facade_6, PlayerCurrentTimeComponent;
    return {
        setters: [
            function (facade_6_1) {
                facade_6 = facade_6_1;
            }
        ],
        execute: function () {
            PlayerCurrentTimeComponent = (function () {
                function PlayerCurrentTimeComponent(elm) {
                    this.elm = elm;
                }
                PlayerCurrentTimeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        player.onProgress(function () {
                            return _this.elm.html(player.getHumanReadableCurrentTime());
                        }, 250);
                        player.on('seekToCompleted', function () {
                            _this.elm.html(player.getHumanReadableCurrentTime());
                        });
                    });
                };
                return PlayerCurrentTimeComponent;
            }());
            PlayerCurrentTimeComponent.$inject = ['$element'];
            PlayerCurrentTimeComponent = __decorate([
                facade_6.Directive({
                    selector: 'playerCurrentTime',
                    link: facade_6.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object])
            ], PlayerCurrentTimeComponent);
            exports_13("PlayerCurrentTimeComponent", PlayerCurrentTimeComponent);
        }
    };
});
System.register("src/overlay/player-panel.component", ["src/ng-helper/facade"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var facade_7, PlayerPanelComponent;
    return {
        setters: [
            function (facade_7_1) {
                facade_7 = facade_7_1;
            }
        ],
        execute: function () {
            PlayerPanelComponent = (function () {
                function PlayerPanelComponent(elm, scope, attrs, $animate, $timeout) {
                    this.elm = elm;
                    this.scope = scope;
                    this.attrs = attrs;
                    this.$animate = $animate;
                    this.$timeout = $timeout;
                }
                PlayerPanelComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var $overlay = this.youtubePlayer.getOverlayElement();
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        var whoWantsToShow = {};
                        var show = function (cause) {
                            whoWantsToShow[cause] = true;
                            _this.$animate.addClass(_this.elm, 'ng-show');
                        };
                        var hide = function (cause) {
                            delete whoWantsToShow[cause];
                            if (Object.keys(whoWantsToShow).length === 0) {
                                _this.$animate.removeClass(_this.elm, 'ng-show');
                            }
                        };
                        if ('showOnHover' in _this.attrs && _this.attrs.showOnHover !== false) {
                            var showOnHover_1 = parseInt(_this.attrs.showOnHover);
                            var cancelTimerFn_1 = null;
                            var cancelTimer_1 = function () {
                                if (cancelTimerFn_1 !== null) {
                                    _this.$timeout.cancel(cancelTimerFn_1);
                                }
                                cancelTimerFn_1 = null;
                            };
                            $overlay.on('mouseenter', function () {
                                cancelTimer_1();
                                show('showOnHover');
                                if (!isNaN(showOnHover_1)) {
                                    cancelTimerFn_1 = _this.$timeout(function () { return hide('showOnHover'); }, showOnHover_1);
                                }
                            });
                            $overlay.on('mouseleave', function () {
                                cancelTimer_1();
                                hide('showOnHover');
                            });
                        }
                        var showOnPause = function (event) {
                            if (event.data === YT.PlayerState.PLAYING) {
                                hide('showOnPause');
                            }
                            else {
                                show('showOnPause');
                            }
                        };
                        if ('showOnPause' in _this.attrs && _this.attrs.showOnPause !== false) {
                            player.on('onStateChange', showOnPause);
                            showOnPause({ data: player.getPlayerState() });
                        }
                    });
                };
                return PlayerPanelComponent;
            }());
            PlayerPanelComponent.$inject = ['$element', '$scope', '$attrs', '$animate', '$timeout'];
            PlayerPanelComponent = __decorate([
                facade_7.Component({
                    selector: 'playerPanel',
                    link: facade_7.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer'],
                    transclude: true,
                    templateUrl: '/template/overlay/player-panel.component.html',
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
            ], PlayerPanelComponent);
            exports_14("PlayerPanelComponent", PlayerPanelComponent);
        }
    };
});
System.register("src/overlay/player-pause.component", ["src/ng-helper/facade"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var facade_8, PlayerPauseComponent;
    return {
        setters: [
            function (facade_8_1) {
                facade_8 = facade_8_1;
            }
        ],
        execute: function () {
            PlayerPauseComponent = (function () {
                function PlayerPauseComponent(elm) {
                    this.elm = elm;
                }
                PlayerPauseComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) { return _this.elm.on('click', function () { return player.pauseVideo(); }); });
                };
                return PlayerPauseComponent;
            }());
            PlayerPauseComponent.$inject = ['$element'];
            PlayerPauseComponent = __decorate([
                facade_8.Component({
                    selector: 'playerPause',
                    templateUrl: '/template/overlay/player-pause.component.html',
                    link: facade_8.bindToCtrlCallOnInit(['youtubePlayer']),
                    transclude: true,
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object])
            ], PlayerPauseComponent);
            exports_15("PlayerPauseComponent", PlayerPauseComponent);
        }
    };
});
System.register("src/overlay/player-play.component", ["src/ng-helper/facade"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var facade_9, PlayerPlayComponent;
    return {
        setters: [
            function (facade_9_1) {
                facade_9 = facade_9_1;
            }
        ],
        execute: function () {
            PlayerPlayComponent = (function () {
                function PlayerPlayComponent(elm) {
                    this.elm = elm;
                }
                PlayerPlayComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) { return _this.elm.on('click', function () { return player.playVideo(); }); });
                };
                return PlayerPlayComponent;
            }());
            PlayerPlayComponent.$inject = ['$element'];
            PlayerPlayComponent = __decorate([
                facade_9.Component({
                    selector: 'playerPlay',
                    templateUrl: '/template/overlay/player-play.component.html',
                    link: facade_9.bindToCtrlCallOnInit(['youtubePlayer']),
                    transclude: true,
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object])
            ], PlayerPlayComponent);
            exports_16("PlayerPlayComponent", PlayerPlayComponent);
        }
    };
});
System.register("src/service/youtube-readable-time.service", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    function youtubeReadableTime(t) {
        t = Math.floor(t);
        var seconds = t % 60;
        var minutes = Math.floor(t / 60);
        var hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        if (hours > 0) {
            return hours + ':' + String('00' + minutes).slice(-2) + ':' + String('00' + seconds).slice(-2);
        }
        else {
            return minutes + ':' + String('00' + seconds).slice(-2);
        }
    }
    exports_17("youtubeReadableTime", youtubeReadableTime);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/overlay/player-progress-bar-hover-indicator.component", ["src/ng-helper/facade", "src/service/youtube-readable-time.service"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var facade_10, youtube_readable_time_service_1, HoverIndicatorComponent;
    return {
        setters: [
            function (facade_10_1) {
                facade_10 = facade_10_1;
            },
            function (youtube_readable_time_service_1_1) {
                youtube_readable_time_service_1 = youtube_readable_time_service_1_1;
            }
        ],
        execute: function () {
            HoverIndicatorComponent = (function () {
                function HoverIndicatorComponent(elm, $document, $compile, $templateCache, $http, scope) {
                    this.elm = elm;
                    this.$document = $document;
                    this.$compile = $compile;
                    this.$templateCache = $templateCache;
                    this.$http = $http;
                    this.scope = scope;
                }
                HoverIndicatorComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // TODO: This is copy pasted from ytSlider, refactor!!!
                    var getPercentageFromPageX = function (pagex) {
                        // Get the player bar x from the page x
                        var left = _this.elm[0].getBoundingClientRect().left;
                        var x = Math.min(Math.max(0, pagex - left), _this.elm[0].clientWidth);
                        // Get the percentage of the bar
                        var xpercent = x / _this.elm[0].clientWidth;
                        return xpercent;
                    };
                    var templateUrl = '/template/overlay/player-progress-bar-hover-indicator.component.html';
                    var template = this.$http.get(templateUrl, { cache: this.$templateCache })
                        .then(function (response) { return response.data; });
                    var indicatorElm = null;
                    var indicatorScope = this.scope.$new(true);
                    template.then(function (template) {
                        indicatorElm = _this.$compile(template)(indicatorScope);
                        // Hide it
                        indicatorElm.addClass('ng-hide');
                        // Add it to the parent
                        _this.elm.parent().append(indicatorElm);
                    });
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        var duration = player.getDuration();
                        var barMove = function (event) {
                            var p = getPercentageFromPageX(event.pageX);
                            indicatorScope.$apply(function (scope) {
                                scope.time = youtube_readable_time_service_1.youtubeReadableTime(p * duration);
                            });
                            indicatorElm.css('left', (p * 100) + '%');
                        };
                        _this.elm.on('mouseenter', function () {
                            _this.$document.on('mousemove', barMove);
                            indicatorElm.removeClass('ng-hide');
                        });
                        _this.elm.on('mouseleave', function () {
                            _this.$document.off('mousemove', barMove);
                            indicatorElm.addClass('ng-hide');
                        });
                    });
                };
                return HoverIndicatorComponent;
            }());
            HoverIndicatorComponent.$inject = ['$element', '$document', '$compile', '$templateCache', '$http', '$scope'];
            HoverIndicatorComponent = __decorate([
                facade_10.Directive({
                    selector: 'hoverIndicator',
                    // templateUrl: '/template/overlay/player-progress-bar-hover-indicator.html',
                    link: facade_10.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
            ], HoverIndicatorComponent);
            exports_18("HoverIndicatorComponent", HoverIndicatorComponent);
        }
    };
});
System.register("src/overlay/player-progress-bar.component", ["src/ng-helper/facade", "angular"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var facade_11, angular, PlayerProgressBar;
    return {
        setters: [
            function (facade_11_1) {
                facade_11 = facade_11_1;
            },
            function (angular_7) {
                angular = angular_7;
            }
        ],
        execute: function () {
            PlayerProgressBar = (function () {
                function PlayerProgressBar(elm, scope) {
                    this.elm = elm;
                    this.scope = scope;
                }
                PlayerProgressBar.prototype.ngOnInit = function () {
                    var _this = this;
                    var $played = angular.element(this.elm[0].querySelector('.hr-yt-played'));
                    var $loaded = angular.element(this.elm[0].querySelector('.hr-yt-loaded'));
                    var $handle = angular.element(this.elm[0].querySelector('.hr-yt-handle'));
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        var duration = player.getDuration();
                        var updateProgress = function (sec) {
                            var played, loaded;
                            if (player.getPlayerState() === YT.PlayerState.ENDED) {
                                played = 100;
                                loaded = 100;
                            }
                            else if (typeof sec === 'number') {
                                played = 100 * sec / duration;
                                loaded = player.getVideoLoadedFraction() * 100;
                            }
                            else {
                                played = 100 * player.getCurrentTime() / duration;
                                loaded = player.getVideoLoadedFraction() * 100;
                            }
                            // This was calculated manually, but cant have
                            // outerwidth without adding jquery
                            var handleOuterWidth = 15;
                            var handleX = played * _this.elm[0].clientWidth / 100 - handleOuterWidth / 2;
                            handleX = Math.min(Math.max(0, handleX), _this.elm[0].clientWidth - handleOuterWidth);
                            $loaded.css('width', loaded + '%');
                            $played.css('width', played + '%');
                            $handle.css('left', handleX + 'px');
                        };
                        // Update the progress on an interval when playing
                        player.onProgress(function () {
                            // The interval calls updateProgress with a number, so we need to add this inner fn
                            updateProgress();
                        });
                        // When someone seeks the video update the progress to the intended seek time
                        player.on('seekToBegin', function (seekTime) { return updateProgress(seekTime.newTime); });
                        // Update the progress every time there state changes
                        player.on('onStateChange', updateProgress);
                        var playStatus = null;
                        _this.scope.onSliderDown = function () {
                            // Save the status of the player at the begining of the dragndrop
                            playStatus = player.getPlayerState();
                            player.pauseVideo();
                        };
                        _this.scope.onSliderMove = function (percentage) {
                            // See what second it corresponds to
                            var sec = Math.round(duration * percentage);
                            // player.eventSeekTo(sec, false);
                            updateProgress(sec);
                        };
                        _this.scope.onSliderUp = function (percentage) {
                            // See what second it corresponds to
                            var sec = Math.round(duration * percentage);
                            if (playStatus === YT.PlayerState.PLAYING || playStatus === YT.PlayerState.PAUSED) {
                                // Load it in the player
                                player.eventSeekTo(sec, true);
                            }
                            else {
                                player.startLoading(sec);
                            }
                            // If it was playin before, play now as well
                            if (playStatus === YT.PlayerState.PLAYING) {
                                player.playVideo();
                            }
                        };
                        _this.scope.markers = player.getMarkers();
                        player.on('markerListChanged', function () { return _this.scope.markers = player.getMarkers(); });
                    });
                };
                return PlayerProgressBar;
            }());
            PlayerProgressBar.$inject = ['$element', '$scope'];
            PlayerProgressBar = __decorate([
                facade_11.Component({
                    selector: 'playerProgressBar',
                    templateUrl: '/template/overlay/player-progress-bar.component.html',
                    link: facade_11.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object, Object])
            ], PlayerProgressBar);
            exports_19("PlayerProgressBar", PlayerProgressBar);
        }
    };
});
System.register("src/service/youtube-quality-map.service", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    function invertKeyValues(map) {
        var inverseMap = {};
        var value;
        for (var key in map) {
            value = map[key];
            inverseMap[value] = key;
        }
        return inverseMap;
    }
    var map, inverseMap, convertToYoutube, convertFromYoutube, convertToYoutubeArray;
    return {
        setters: [],
        execute: function () {
            // YoutubeQualityStr: PlayerQualityStr
            map = {
                'hd1080': '1080p',
                'hd720': '720p',
                'large': '480p',
                'medium': '360p',
                'small': '240p',
                'tiny': '144p',
                'auto': 'Auto'
            };
            inverseMap = invertKeyValues(map);
            exports_20("convertToYoutube", convertToYoutube = function (q) { return map[q] ? map[q] : 'Auto'; });
            exports_20("convertFromYoutube", convertFromYoutube = function (q) { return inverseMap[q] ? inverseMap[q] : 'default'; });
            exports_20("convertToYoutubeArray", convertToYoutubeArray = function (qArr) { return qArr.map(convertToYoutube); });
        }
    };
});
System.register("src/overlay/player-repeat-available-quality.directive", ["src/ng-helper/facade", "src/service/youtube-quality-map.service"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var facade_12, youtube_quality_map_service_1, PlayerRepeatAvailableSpeedDirective;
    return {
        setters: [
            function (facade_12_1) {
                facade_12 = facade_12_1;
            },
            function (youtube_quality_map_service_1_1) {
                youtube_quality_map_service_1 = youtube_quality_map_service_1_1;
            }
        ],
        execute: function () {
            PlayerRepeatAvailableSpeedDirective = (function () {
                function PlayerRepeatAvailableSpeedDirective(elm, scope, attrs) {
                    this.elm = elm;
                    this.scope = scope;
                    this.attrs = attrs;
                }
                PlayerRepeatAvailableSpeedDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        // Youtube doesnt inform you on the available qualities until loading video
                        var unbind = player.on('onStateChange', function (event) {
                            if (event.data === YT.PlayerState.PLAYING) {
                                unbind();
                                _this.scope.availableQuality = youtube_quality_map_service_1.convertToYoutubeArray(player.getAvailableQualityLevels());
                                if (_this.attrs.hasOwnProperty('reverse')) {
                                    _this.scope.availableQuality.reverse();
                                }
                            }
                        });
                        // So default is Auto
                        _this.scope.availableQuality = ['Auto'];
                    });
                };
                return PlayerRepeatAvailableSpeedDirective;
            }());
            PlayerRepeatAvailableSpeedDirective.$inject = ['$element', '$scope', '$attrs'];
            PlayerRepeatAvailableSpeedDirective = __decorate([
                facade_12.Directive({
                    selector: 'playerRepeatAvailableQuality',
                    link: facade_12.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer'],
                    replace: true,
                    priority: 1000,
                    // BUUU :'(
                    template: function (tElm) {
                        tElm.removeAttr('player-repeat-available-quality');
                        tElm.attr('ng-repeat', '$quality in availableQuality');
                        return tElm[0].outerHTML;
                    }
                }),
                __metadata("design:paramtypes", [Object, Object, Object])
            ], PlayerRepeatAvailableSpeedDirective);
            exports_21("PlayerRepeatAvailableSpeedDirective", PlayerRepeatAvailableSpeedDirective);
        }
    };
});
System.register("src/overlay/player-repeat-available-speed.directive", ["src/ng-helper/facade"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var facade_13, PlayerRepeatAvailableSpeedDirective;
    return {
        setters: [
            function (facade_13_1) {
                facade_13 = facade_13_1;
            }
        ],
        execute: function () {
            PlayerRepeatAvailableSpeedDirective = (function () {
                function PlayerRepeatAvailableSpeedDirective(elm, scope, attrs) {
                    this.elm = elm;
                    this.scope = scope;
                    this.attrs = attrs;
                }
                PlayerRepeatAvailableSpeedDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        _this.scope.availableSpeeds = player.getAvailablePlaybackRates();
                        if (_this.attrs.hasOwnProperty('reverse')) {
                            _this.scope.availableSpeeds.reverse();
                        }
                    });
                };
                return PlayerRepeatAvailableSpeedDirective;
            }());
            PlayerRepeatAvailableSpeedDirective.$inject = ['$element', '$scope', '$attrs'];
            PlayerRepeatAvailableSpeedDirective = __decorate([
                facade_13.Directive({
                    selector: 'playerRepeatAvailableSpeed',
                    link: facade_13.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer'],
                    replace: true,
                    priority: 1000,
                    // BUUU :'(
                    template: function (tElm) {
                        tElm.removeAttr('player-repeat-available-speed');
                        tElm.attr('ng-repeat', '$speed in availableSpeeds');
                        return tElm[0].outerHTML;
                    }
                }),
                __metadata("design:paramtypes", [Object, Object, Object])
            ], PlayerRepeatAvailableSpeedDirective);
            exports_22("PlayerRepeatAvailableSpeedDirective", PlayerRepeatAvailableSpeedDirective);
        }
    };
});
System.register("src/overlay/player-set-quality.directive", ["src/ng-helper/facade"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var facade_14, PlayerCurrentTimeComponent;
    return {
        setters: [
            function (facade_14_1) {
                facade_14 = facade_14_1;
            }
        ],
        execute: function () {
            PlayerCurrentTimeComponent = (function () {
                function PlayerCurrentTimeComponent(elm, $parse, attrs, scope) {
                    this.elm = elm;
                    this.$parse = $parse;
                    this.attrs = attrs;
                    this.scope = scope;
                }
                PlayerCurrentTimeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var fn = this.$parse(this.attrs.playerSetQuality);
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        return _this.elm.on('click', function () {
                            return _this.scope.$apply(function () {
                                return player.setHumanPlaybackQuality(fn(_this.scope));
                            });
                        });
                    });
                };
                return PlayerCurrentTimeComponent;
            }());
            PlayerCurrentTimeComponent.$inject = ['$element', '$parse', '$attrs', '$scope'];
            PlayerCurrentTimeComponent = __decorate([
                facade_14.Directive({
                    selector: 'playerSetQuality',
                    link: facade_14.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object])
            ], PlayerCurrentTimeComponent);
            exports_23("PlayerCurrentTimeComponent", PlayerCurrentTimeComponent);
        }
    };
});
System.register("src/overlay/player-set-speed.directive", ["src/ng-helper/facade"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var facade_15, PlayerSetSpeedDirective;
    return {
        setters: [
            function (facade_15_1) {
                facade_15 = facade_15_1;
            }
        ],
        execute: function () {
            PlayerSetSpeedDirective = (function () {
                function PlayerSetSpeedDirective(elm, attrs, $parse, scope) {
                    this.elm = elm;
                    this.attrs = attrs;
                    this.$parse = $parse;
                    this.scope = scope;
                }
                PlayerSetSpeedDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    var speedFn = this.$parse(this.attrs.playerSetSpeed);
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        return _this.elm.on('click', function () {
                            return _this.scope.$apply(function () {
                                var speed = speedFn(_this.scope);
                                player.setPlaybackRate(speed);
                            });
                        });
                    });
                };
                return PlayerSetSpeedDirective;
            }());
            PlayerSetSpeedDirective.$inject = ['$element', '$attrs', '$parse', '$scope'];
            PlayerSetSpeedDirective = __decorate([
                facade_15.Directive({
                    selector: 'playerSetSpeed',
                    link: facade_15.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object])
            ], PlayerSetSpeedDirective);
            exports_24("PlayerSetSpeedDirective", PlayerSetSpeedDirective);
        }
    };
});
System.register("src/overlay/player-total-time.directive", ["src/ng-helper/facade"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var facade_16, PlayerTotalTimeDirective;
    return {
        setters: [
            function (facade_16_1) {
                facade_16 = facade_16_1;
            }
        ],
        execute: function () {
            PlayerTotalTimeDirective = (function () {
                function PlayerTotalTimeDirective(elm) {
                    this.elm = elm;
                }
                PlayerTotalTimeDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        _this.elm.html(player.getHumanReadableDuration());
                    });
                };
                return PlayerTotalTimeDirective;
            }());
            PlayerTotalTimeDirective.$inject = ['$element'];
            PlayerTotalTimeDirective = __decorate([
                facade_16.Directive({
                    selector: 'playerTotalTime',
                    link: facade_16.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object])
            ], PlayerTotalTimeDirective);
            exports_25("PlayerTotalTimeDirective", PlayerTotalTimeDirective);
        }
    };
});
System.register("src/overlay/player-volume-horizontal.component", ["src/ng-helper/facade", "angular"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var facade_17, angular, PlayerVolumeHorizontalComponent;
    return {
        setters: [
            function (facade_17_1) {
                facade_17 = facade_17_1;
            },
            function (angular_8) {
                angular = angular_8;
            }
        ],
        execute: function () {
            PlayerVolumeHorizontalComponent = (function () {
                function PlayerVolumeHorizontalComponent(elm, scope) {
                    this.elm = elm;
                    this.scope = scope;
                }
                PlayerVolumeHorizontalComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var $volumeBar = angular.element(this.elm[0].querySelector('.hr-yt-volume-hr-bar'));
                    var $settedBar = angular.element(this.elm[0].querySelector('.hr-yt-setted'));
                    var $handle = angular.element(this.elm[0].querySelector('.hr-yt-handle'));
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        var updateVolumeBar = function (volume) {
                            var handleX = volume * $volumeBar[0].clientWidth - $handle[0].clientWidth / 2;
                            handleX = Math.min(Math.max(0, handleX), $volumeBar[0].clientWidth - $handle[0].clientWidth / 2);
                            $settedBar.css('width', volume * 100 + '%');
                            $handle.css('left', handleX + 'px');
                        };
                        _this.scope.toggleMute = function () {
                            player.toggleMute();
                        };
                        _this.scope.onSliderMove = function (volume) {
                            player.setVolume(volume * 100);
                            updateVolumeBar(volume);
                        };
                        _this.scope.onSliderUp = function (volume) {
                            player.setVolume(volume * 100);
                            updateVolumeBar(volume);
                        };
                        _this.scope.$watch(function () { return player.getVolume(); }, function (volumeFromModel) { return updateVolumeBar(volumeFromModel / 100); });
                    });
                };
                return PlayerVolumeHorizontalComponent;
            }());
            PlayerVolumeHorizontalComponent.$inject = ['$element', '$scope'];
            PlayerVolumeHorizontalComponent = __decorate([
                facade_17.Component({
                    selector: 'playerVolumeHorizontal',
                    templateUrl: '/template/overlay/player-volume-horizontal.component.html',
                    link: facade_17.bindToCtrlCallOnInit(['youtubePlayer']),
                    transclude: true,
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object, Object])
            ], PlayerVolumeHorizontalComponent);
            exports_26("PlayerVolumeHorizontalComponent", PlayerVolumeHorizontalComponent);
        }
    };
});
System.register("src/overlay/show-if-muted.directive", ["src/ng-helper/facade"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var facade_18, ShowIfMutedDirective;
    return {
        setters: [
            function (facade_18_1) {
                facade_18 = facade_18_1;
            }
        ],
        execute: function () {
            ShowIfMutedDirective = (function () {
                function ShowIfMutedDirective(elm, $animate, attrs) {
                    this.elm = elm;
                    this.$animate = $animate;
                    this.attrs = attrs;
                    // By default hide
                    $animate.addClass(elm, 'ng-hide');
                }
                ShowIfMutedDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        var hideOrShow = function () {
                            var show = !player.isMuted();
                            if (_this.attrs.showIfMuted === 'true') {
                                show = !show;
                            }
                            if (show) {
                                _this.$animate.removeClass(_this.elm, 'ng-hide');
                            }
                            else {
                                _this.$animate.addClass(_this.elm, 'ng-hide');
                            }
                        };
                        hideOrShow();
                        player.on('muteChange', hideOrShow);
                    });
                };
                return ShowIfMutedDirective;
            }());
            ShowIfMutedDirective.$inject = ['$element', '$animate', '$attrs'];
            ShowIfMutedDirective = __decorate([
                facade_18.Directive({
                    selector: 'showIfMuted',
                    link: facade_18.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object, Object, Object])
            ], ShowIfMutedDirective);
            exports_27("ShowIfMutedDirective", ShowIfMutedDirective);
        }
    };
});
System.register("src/overlay/show-if-player-is.directive", ["src/ng-helper/facade"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var facade_19, ShowIfPlayerIsDirective;
    return {
        setters: [
            function (facade_19_1) {
                facade_19 = facade_19_1;
            }
        ],
        execute: function () {
            ShowIfPlayerIsDirective = (function () {
                function ShowIfPlayerIsDirective(elm, $animate, attrs) {
                    this.elm = elm;
                    this.$animate = $animate;
                    this.attrs = attrs;
                    // By default hide
                    $animate.addClass(elm, 'ng-hide');
                }
                ShowIfPlayerIsDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    this.youtubePlayer
                        .getPlayer()
                        .then(function (player) {
                        // Convert it first into the array of string
                        var stringStates = _this.attrs.showIfPlayerIs.toUpperCase().split(',');
                        // Convert the states list into an array of state numbers
                        var states = stringStates.map(function (state) {
                            if (YT.PlayerState.hasOwnProperty(state)) {
                                return YT.PlayerState[state];
                            }
                            else {
                                throw new Error('Video state ' + state + ' is not defined');
                            }
                        });
                        var hideOrShow = function (event) {
                            if (states.indexOf(event.data) !== -1) {
                                _this.$animate.removeClass(_this.elm, 'ng-hide');
                            }
                            else {
                                _this.$animate.addClass(_this.elm, 'ng-hide');
                            }
                        };
                        // Subscribe to the state change event
                        player.on('onStateChange', hideOrShow);
                        // Show or hide based on initial status
                        hideOrShow({ data: player.getPlayerState() });
                    });
                };
                return ShowIfPlayerIsDirective;
            }());
            ShowIfPlayerIsDirective.$inject = ['$element', '$animate', '$attrs'];
            ShowIfPlayerIsDirective = __decorate([
                facade_19.Directive({
                    selector: 'showIfPlayerIs',
                    link: facade_19.bindToCtrlCallOnInit(['youtubePlayer']),
                    require: ['^youtubePlayer']
                }),
                __metadata("design:paramtypes", [Object, Object, Object])
            ], ShowIfPlayerIsDirective);
            exports_28("ShowIfPlayerIsDirective", ShowIfPlayerIsDirective);
        }
    };
});
System.register("src/service/youtube-marker-list.model", ["angular"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var angular;
    return {
        setters: [
            function (angular_9) {
                angular = angular_9;
            }
        ],
        execute: function () {
            angular.module('hrAngularYoutube')
                .factory('YoutubeMarkerList', function () {
                var YoutubeMarkerList = function () {
                    this.markersById = {};
                    this.player = null;
                };
                YoutubeMarkerList.prototype.getMarkers = function () {
                    return this.markersById;
                };
                YoutubeMarkerList.prototype.add = function (marker) {
                    this.markersById[marker.id] = marker;
                    // Notify who might be interested
                    this.player.emit('markerAdd', marker);
                    return marker;
                };
                YoutubeMarkerList.prototype.remove = function (id) {
                    var marker = this.markersById[id];
                    if (marker) {
                        delete this.markersById[id];
                        // Notify who might be interested
                        this.player.emit('markerRemove', marker);
                    }
                    return marker;
                };
                YoutubeMarkerList.prototype.getMarker = function (id) {
                    return this.markersById[id];
                };
                YoutubeMarkerList.prototype.setPlayer = function (player) {
                    this.player = player;
                };
                return YoutubeMarkerList;
            });
        }
    };
});
System.register("src/util/uuid.service", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    /**
     * @description
     * Creates a hash string that follows the UUID standard
     */
    function uuid() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    exports_30("uuid", uuid);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/service/youtube-marker.model", ["angular", "src/util/uuid.service"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var angular, uuid_service_1;
    return {
        setters: [
            function (angular_10) {
                angular = angular_10;
            },
            function (uuid_service_1_1) {
                uuid_service_1 = uuid_service_1_1;
            }
        ],
        execute: function () {
            angular.module('hrAngularYoutube')
                .factory('YoutubeMarker', function () {
                /*jshint maxcomplexity:false */
                var YoutubeMarker = function (options) {
                    // Set default values
                    this.startTime = options.startTime || null;
                    this.endTime = options.endTime || null;
                    this.duration = options.duration || null;
                    this.handler = options.handler || this.handler || null;
                    // Whether this marker should be launched every time the marker pass or just the first time (assuming seeks)
                    this.fireOnce = options.fireOnce || false;
                    // Launch the marker when the user seeks past the marker time
                    this.launchOnSeek = options.launchOnSeek || false;
                    // Block when user fast forwards past the marker
                    this.blockFF = options.blockFF || false;
                    // Wether to show the marker in a status bar
                    this.showMarker = typeof options.showMarker !== 'undefined' ? options.showMarker : true;
                    // Extra css class that can be added to the marker bar
                    this.barCss = typeof options.barCss !== 'undefined' ? options.barCss : '';
                    this._runCount = 0;
                    this._isRunning = false;
                    this.player = null;
                    // Override with user options
                    this.id = this.id || options.id || uuid_service_1.uuid();
                    // Duration implies end time
                    if (this.duration !== null) {
                        this.endTime = this.startTime + this.duration;
                    }
                };
                YoutubeMarker.prototype.setPlayer = function (player) {
                    this.player = player;
                };
                YoutubeMarker.prototype.getPlayer = function () {
                    return this.player;
                };
                YoutubeMarker.prototype.shouldLaunchOnSeek = function (seekTime) {
                    if (this.getLaunchOnSeek()) {
                        if (this.hasEndTime()) {
                            return this.inRange(seekTime.newTime);
                        }
                        else {
                            return this.startTime >= seekTime.oldTime && this.startTime <= seekTime.newTime;
                        }
                    }
                };
                YoutubeMarker.prototype.getLaunchOnSeek = function () {
                    // Block when fast forward implies launch on seek
                    if (this.getBlockOnFF()) {
                        return true;
                    }
                    return this.launchOnSeek;
                };
                YoutubeMarker.prototype.getBlockOnFF = function () {
                    // If already fired and we only want to fire once, it shouldn't block
                    if (this._runCount > 0 && this.fireOnce) {
                        return false;
                    }
                    return this.blockFF;
                };
                YoutubeMarker.prototype.hasEndTime = function () {
                    return this.endTime !== null;
                };
                YoutubeMarker.prototype.inRange = function (t) {
                    // If it doesn't have an end time, it cannot be in range
                    if (!this.hasEndTime()) {
                        return false;
                    }
                    return t >= this.startTime && t < this.endTime;
                };
                YoutubeMarker.prototype.startedIn = function (begin, end) {
                    // If already fired and we only want to fire once, do nothing
                    //            if (this._runCount > 0 && this.fireOnce ) {
                    //                return false;
                    //            }
                    return this.startTime > begin && this.startTime <= end;
                };
                YoutubeMarker.prototype.endedIn = function (begin, end) {
                    if (!this.hasEndTime()) {
                        return false;
                    }
                    //            // If its not running, it cant end
                    //            if (!this._isRunning) {
                    //                return false;
                    //            }
                    return this.endTime > begin && this.endTime <= end;
                };
                YoutubeMarker.prototype.start = function () {
                    // If we are already running, dont do anything
                    if (this._isRunning) {
                        return false;
                    }
                    // If already fired and we only want to fire once, do nothing
                    if (this._runCount > 0 && this.fireOnce) {
                        return false;
                    }
                    this._runCount++;
                    this._isRunning = true;
                    // If there is a handler, call it
                    if (typeof this.handler === 'function') {
                        this.handler();
                    }
                    return true;
                };
                YoutubeMarker.prototype.end = function () {
                    if (this.isRunning()) {
                        this._isRunning = false;
                        // If there is an end handler call it
                        if (typeof this.onEnd === 'function') {
                            this.onEnd();
                        }
                    }
                };
                YoutubeMarker.prototype.isRunning = function () {
                    return this._isRunning;
                };
                return YoutubeMarker;
            });
        }
    };
});
System.register("src/service/youtube-player.model", ["angular", "src/service/youtube-quality-map.service", "src/service/youtube-readable-time.service", "src/util/uuid.service"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var angular, youtube_quality_map_service_2, youtube_readable_time_service_2, uuid_service_2;
    return {
        setters: [
            function (angular_11) {
                angular = angular_11;
            },
            function (youtube_quality_map_service_2_1) {
                youtube_quality_map_service_2 = youtube_quality_map_service_2_1;
            },
            function (youtube_readable_time_service_2_1) {
                youtube_readable_time_service_2 = youtube_readable_time_service_2_1;
            },
            function (uuid_service_2_1) {
                uuid_service_2 = uuid_service_2_1;
            }
        ],
        execute: function () {
            angular.module('hrAngularYoutube')
                .factory('YoutubePlayer', ['$q', '$interval', '$rootScope', 'YoutubeMarkerList', 'hrAngularExtend',
                function ($q, $interval, $rootScope, YoutubeMarkerList, hrAngularExtend) {
                    var YoutubePlayer = function (elmOrId, options) {
                        this.options = options;
                        var op = angular.copy(options);
                        // TODO: Add a fit to parent or something like that
                        op.width = '100%';
                        op.height = '100%';
                        var self = this;
                        this.player = new YT.Player(elmOrId, op);
                        this.markerList = new YoutubeMarkerList();
                        this._muted = false;
                        this._volume = 100;
                        this._intendedQuality = 'auto';
                        this.on('onStateChange', function (event) {
                            if (event.data === YT.PlayerState.PLAYING) {
                                self.setVolume(self.player.getVolume());
                                self._setMuted(self.player.isMuted());
                            }
                        });
                        // If a marker is added, make sure the marker listener is initialized
                        this.on('markerAdd', function (marker) {
                            self._initializeMarkerListener();
                            marker.setPlayer(self);
                        });
                        // If a marker is removed make sure its stoped
                        this.on('markerRemove', function (marker) {
                            marker.end();
                        });
                    };
                    hrAngularExtend.factory(YoutubePlayer);
                    // TODO: Inherit better than these :S once i know if this is the way I want to access the object
                    angular.forEach([
                        'getOptions', 'loadModule', 'loadVideoById', 'loadVideoByUrl', 'cueVideoById', 'cueVideoByUrl', 'cuePlaylist',
                        'loadPlaylist', 'playVideo', 'pauseVideo', 'stopVideo', 'seekTo', 'clearVideo',
                        'nextVideo', 'previousVideo', 'playVideoAt',
                        'setSize', 'getPlaybackRate', 'setPlaybackRate', 'getAvailablePlaybackRates',
                        'setLoop', 'setShuffle', 'getVideoLoadedFraction', 'getPlayerState', 'getCurrentTime',
                        'getPlaybackQuality', 'setPlaybackQuality', 'getAvailableQualityLevels', 'getDuration',
                        'getVideoUrl', 'getVideoEmbedCode', 'getPlaylist', 'getPlaylistIndex', 'getIframe', 'destroy'
                    ], function (name) {
                        YoutubePlayer.prototype[name] = function () {
                            return this.player[name].apply(this.player, arguments);
                        };
                    });
                    YoutubePlayer.prototype.setOverlayElement = function (elm) {
                        this._element = elm;
                    };
                    YoutubePlayer.prototype.getOverlayElement = function () {
                        return this._element;
                    };
                    YoutubePlayer.prototype.getHumanReadableDuration = function () {
                        return youtube_readable_time_service_2.youtubeReadableTime(this.getDuration());
                    };
                    YoutubePlayer.prototype.getHumanReadableCurrentTime = function () {
                        return youtube_readable_time_service_2.youtubeReadableTime(this.getCurrentTime());
                    };
                    YoutubePlayer.prototype.onProgress = function (fn, resolution) {
                        if (typeof resolution === 'undefined') {
                            resolution = 100;
                        }
                        var promise = null;
                        var startInterval = function () {
                            if (promise === null) {
                                promise = $interval(fn, resolution);
                            }
                        };
                        var stopInterval = function () {
                            $interval.cancel(promise);
                            promise = null;
                        };
                        var cancel = function () {
                            stopInterval();
                            // TODO: something more to destroy / release stuff.
                        };
                        this.on('onStateChange', function (event) {
                            if (event.data === YT.PlayerState.PLAYING) {
                                startInterval();
                            }
                            else {
                                stopInterval();
                            }
                        });
                        if (this.getPlayerState() === YT.PlayerState.PLAYING) {
                            startInterval();
                        }
                        return cancel;
                    };
                    /**
                     * Its like seekTo, but fires an event when the seek is complete
                     */
                    YoutubePlayer.prototype.eventSeekTo = function (sec, allowSeekAhead) {
                        var self = this;
                        var initialTime = this.player.getCurrentTime();
                        // If there is a blocking marker, don't allow to seek further than it
                        angular.forEach(self.markerList.getMarkers(), function (marker) {
                            // If its not blocking, we dont care
                            if (!marker.getBlockOnFF()) {
                                return;
                            }
                            // If the marker is in the seek time, force the sec to be at the marker time
                            if (marker.startedIn(initialTime, sec)) {
                                sec = marker.startTime;
                            }
                        });
                        // Seek to sec
                        this.player.seekTo(sec, allowSeekAhead);
                        // Inform of the intent to seek
                        self.emit('seekToBegin', { newTime: sec, oldTime: initialTime });
                        var seekPromise = $q.defer();
                        // Check on a time interval that the seek has been completed
                        var promise = $interval(function () {
                            var currentTime = self.player.getCurrentTime();
                            var seekCompleted = false;
                            if (sec < initialTime) {
                                // If we intent to go backwards, we complete when current time is lower
                                // than the initial one
                                if (currentTime < initialTime) {
                                    seekCompleted = true;
                                }
                            }
                            else {
                                // If we intent to go forward, we complete once we pass the intended mark
                                if (currentTime >= sec) {
                                    seekCompleted = true;
                                }
                            }
                            // There may be a third scenario where the player is paused, you pushed
                            // forward and it complete but just next to sec.
                            // Once its complete, for whatever reason, fire the event and cancel this interval
                            if (seekCompleted) {
                                $interval.cancel(promise);
                                var ans = { newTime: sec, oldTime: initialTime };
                                self.emit('seekToCompleted', ans);
                                seekPromise.resolve(ans);
                            }
                        }, 50);
                        return seekPromise.promise;
                    };
                    YoutubePlayer.prototype.startLoading = function (sec) {
                        var self = this;
                        var unregister;
                        var pauseAfterStart = function (event) {
                            if (event.data === YT.PlayerState.PLAYING) {
                                if (typeof sec === 'number') {
                                    self.eventSeekTo(sec, true);
                                }
                                unregister();
                                self.player.pauseVideo();
                            }
                        };
                        unregister = this.on('onStateChange', pauseAfterStart);
                        this.player.playVideo();
                    };
                    YoutubePlayer.prototype._initializeEventListener = function () {
                        if (this._eventsInitialized) {
                            return;
                        }
                        var self = this;
                        this._eventHash = uuid_service_2.uuid();
                        var events = ['onStateChange', 'onPlaybackQualityChange', 'onPlaybackRateChange',
                            'onError', 'onApiChange', 'onReady'];
                        angular.forEach(events, function (name) {
                            self.player.addEventListener(name, function (data) {
                                self.emit(name, data);
                            });
                        });
                        this._eventsInitialized = true;
                    };
                    YoutubePlayer.prototype.on = function (name, handler) {
                        this._initializeEventListener();
                        return $rootScope.$on(this._eventHash + name, function (e, eventData) {
                            handler(eventData);
                        });
                    };
                    YoutubePlayer.prototype.emit = function (name, data) {
                        $rootScope.$emit(this._eventHash + name, data);
                    };
                    YoutubePlayer.prototype._initializeMarkerListener = function () {
                        // Only initialize markers once
                        if (this._markerListener) {
                            return;
                        }
                        this._markerListener = true;
                        var runMarker = function (marker) {
                            if (marker.start()) {
                                // Emit an event with the marker
                                self.emit('markerRun', marker);
                            }
                        };
                        var stopMarker = function (marker) {
                            marker.end();
                            // Emit an event with the marker
                            self.emit('markerStop', marker);
                        };
                        var self = this;
                        var lastMarkerTime = -1;
                        this.onProgress(function () {
                            var currentTime = self.getCurrentTime();
                            var newLastTime = lastMarkerTime;
                            angular.forEach(self.markerList.getMarkers(), function (marker) {
                                // If the marker time has past and we haven't launched this marker yet
                                if (marker.startedIn(lastMarkerTime, currentTime)) {
                                    runMarker(marker);
                                    newLastTime = Math.max(newLastTime, marker.startTime);
                                }
                                // If the marker has ended
                                if (marker.endedIn(lastMarkerTime, currentTime) && marker.isRunning()) {
                                    stopMarker(marker);
                                    newLastTime = Math.max(newLastTime, marker.endTime);
                                }
                            });
                            lastMarkerTime = newLastTime;
                        });
                        this.on('seekToCompleted', function (seekTime) {
                            angular.forEach(self.markerList.getMarkers(), function (marker) {
                                if (marker.isRunning()) {
                                    // If the marker is running and the seek throws it out of range, stop it
                                    if (!marker.inRange(seekTime.newTime)) {
                                        stopMarker(marker);
                                    }
                                }
                                else {
                                    // If the marker is not running, see if we need to start it
                                    if (marker.shouldLaunchOnSeek(seekTime)) {
                                        runMarker(marker);
                                    }
                                }
                            });
                            lastMarkerTime = seekTime.newTime;
                        });
                    };
                    // TODO: Revisit... I think with the addond of the player factory this
                    // shouldnt be needed
                    YoutubePlayer.prototype.setMarkerList = function (list) {
                        this._initializeMarkerListener();
                        this.markerList = list;
                        this.markerList.setPlayer(this);
                        this.emit('markerListChanged');
                    };
                    YoutubePlayer.prototype.addMarker = function (marker) {
                        return this.markerList.add(marker);
                    };
                    YoutubePlayer.prototype.removeMarker = function (markerId) {
                        return this.markerList.removeById(markerId);
                    };
                    YoutubePlayer.prototype.getMarkers = function () {
                        return this.markerList.getMarkers();
                    };
                    YoutubePlayer.prototype.getMarker = function (id) {
                        return this.markerList.getMarker(id);
                    };
                    YoutubePlayer.prototype.setVolume = function (volume) {
                        // If volume is 0, then set as muted, if not is unmuted
                        this._setMuted(volume === 0);
                        this._volume = volume;
                        this.player.setVolume(volume);
                    };
                    YoutubePlayer.prototype.getVolume = function () {
                        if (this._muted) {
                            return 0;
                        }
                        return this._volume;
                    };
                    YoutubePlayer.prototype._setMuted = function (muted) {
                        var changed = this._muted !== muted;
                        this._muted = muted;
                        if (changed) {
                            this.emit('muteChange');
                        }
                    };
                    YoutubePlayer.prototype.mute = function () {
                        this._setMuted(true);
                        this.player.mute();
                    };
                    YoutubePlayer.prototype.unMute = function () {
                        this._setMuted(false);
                        this.player.unMute();
                    };
                    YoutubePlayer.prototype.isMuted = function () {
                        return this._muted;
                    };
                    YoutubePlayer.prototype.toggleMute = function () {
                        if (this.isMuted()) {
                            this.unMute();
                        }
                        else {
                            this.mute();
                        }
                    };
                    YoutubePlayer.prototype.getHumanPlaybackQuality = function () {
                        return youtube_quality_map_service_2.convertToYoutube(this.player.getPlaybackQuality());
                    };
                    YoutubePlayer.prototype.getHumanIntendedPlaybackQuality = function (showRealAuto) {
                        var ans = youtube_quality_map_service_2.convertToYoutube(this._intendedQuality);
                        if (ans === 'Auto' && showRealAuto && this.getHumanPlaybackQuality() !== 'Auto') {
                            ans += ' (' + this.getHumanPlaybackQuality() + ')';
                        }
                        return ans;
                    };
                    YoutubePlayer.prototype.setHumanPlaybackQuality = function (q) {
                        var quality = youtube_quality_map_service_2.convertFromYoutube(q);
                        this.setPlaybackQuality(quality);
                        this.emit('onIntentPlaybackQualityChange');
                    };
                    YoutubePlayer.prototype.setPlaybackQuality = function (q) {
                        this._intendedQuality = q;
                        this.player.setPlaybackQuality(q);
                    };
                    return YoutubePlayer;
                }
            ]);
        }
    };
});
System.register("src/service/youtube-template-marker.model", ["angular"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var angular;
    return {
        setters: [
            function (angular_12) {
                angular = angular_12;
            }
        ],
        execute: function () {
            angular.module('hrAngularYoutube')
                .factory('YoutubeTemplateMarker', ['$rootScope', '$compile', 'YoutubeMarker', '$q', '$http', '$templateCache',
                function ($rootScope, $compile, YoutubeMarker, $q, $http, $templateCache) {
                    var YoutubeTemplateMarker = function (options) {
                        YoutubeMarker.call(this, options);
                        this._elm = null;
                        this._scope = null;
                        this._parentScope = options.scope || $rootScope;
                        this._parentElm = options.parent;
                        this._addMethod = options.addMethod || 'append';
                        this.template = options.template || null;
                        this.link = options.link || this.link || null;
                        this._loadTemplate(options);
                    };
                    angular.extend(YoutubeTemplateMarker.prototype, YoutubeMarker.prototype);
                    YoutubeTemplateMarker.prototype.setParent = function (parent) {
                        this._parentElm = parent;
                    };
                    YoutubeTemplateMarker.prototype.getParent = function () {
                        return this._parentElm;
                    };
                    YoutubeTemplateMarker.prototype.setParentScope = function (scope) {
                        this._parentScope = scope;
                    };
                    YoutubeTemplateMarker.prototype.getParentScope = function () {
                        return this._parentScope;
                    };
                    YoutubeTemplateMarker.prototype.handler = function () {
                        var self = this;
                        // Make sure we have somewhere to insert it
                        if (!this._parentElm) {
                            this._parentElm = this.player.getOverlayElement();
                        }
                        // Create a new isolated scope
                        this._scope = this._parentScope.$new(true);
                        // Create the element from the template
                        this.template.then(function (template) {
                            // Add the element where its supposed to be
                            var elm = angular.element(template);
                            self._parentElm[self._addMethod](elm);
                            // Compile and link it
                            self._elm = $compile(elm)(self._scope);
                            // Call the optional marker link function to allow logic in the scope
                            if (typeof self.link === 'function') {
                                self.link(self._scope);
                            }
                        });
                    };
                    YoutubeTemplateMarker.prototype._loadTemplate = function (options) {
                        if (options.hasOwnProperty('template')) {
                            this.template = $q.when(options.template);
                        }
                        else if (options.hasOwnProperty('templateUrl')) {
                            this.template = $http.get(options.templateUrl, { cache: $templateCache }).then(function (response) {
                                return response.data;
                            });
                        }
                    };
                    // When the marker ends, remove the template
                    YoutubeTemplateMarker.prototype.onEnd = function () {
                        this.destroy();
                    };
                    YoutubeTemplateMarker.prototype.destroy = function () {
                        if (this._elm !== null) {
                            this._scope.$destroy();
                            this._elm.remove();
                            this._scope = null;
                            this._elm = null;
                        }
                    };
                    return YoutubeTemplateMarker;
                }]);
        }
    };
});
System.register("src/service/youtube.service", ["angular"], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var angular, defaultOptions, autoload, Provider;
    return {
        setters: [
            function (angular_13) {
                angular = angular_13;
            }
        ],
        execute: function () {
            defaultOptions = {
                playerVars: {
                    origin: location.origin + '/',
                    enablejsapi: 1
                }
            };
            autoload = true;
            Provider = (function () {
                function Provider() {
                    this.$get = ['$window', '$q', '$injector', function ($window, $q, $injector) {
                            var apiLoaded = $q.defer();
                            var apiLoadedPromise = apiLoaded.promise;
                            // Youtube callback when API is ready
                            $window.onYouTubeIframeAPIReady = function () {
                                apiLoaded.resolve();
                            };
                            return {
                                loadPlayer: function (playerFactoryName, elmOrId, options) {
                                    return apiLoadedPromise.then(function () {
                                        var YoutubePlayer = $injector.get(playerFactoryName);
                                        var videoReady = $q.defer();
                                        var newOptions = {};
                                        // Override main options
                                        angular.extend(newOptions, angular.copy(defaultOptions), options);
                                        // Override player var options
                                        newOptions.playerVars = {}; // For some reason if I dont reset this angular.extend doesnt work as expected
                                        angular.extend(newOptions.playerVars, angular.copy(defaultOptions.playerVars), options.playerVars);
                                        var player = new YoutubePlayer(elmOrId, newOptions);
                                        player.on('onReady', function () {
                                            videoReady.resolve(player);
                                        });
                                        return videoReady.promise;
                                    });
                                },
                                getAutoLoad: function () {
                                    return autoload;
                                }
                            };
                        }];
                }
                Provider.prototype.setAutoLoad = function (auto) {
                    autoload = auto;
                };
                ;
                Provider.prototype.setOptions = function (options) {
                    defaultOptions = options;
                };
                ;
                Provider.prototype.getOptions = function () {
                    return defaultOptions;
                };
                ;
                Provider.prototype.setOption = function (name, value) {
                    defaultOptions[name] = value;
                };
                ;
                Provider.prototype.setPlayerVarOption = function (name, value) {
                    defaultOptions.playerVars[name] = value;
                };
                ;
                return Provider;
            }());
            exports_34("Provider", Provider);
            angular.module('hrAngularYoutube').provider('youtube', new Provider());
        }
    };
});
System.register("src/main", ["src/directive/youtube-player.component", "src/directive/yt-slider.directive", "src/overlay/hr-yt-marker.directive", "src/overlay/player-current-quality.directive", "src/overlay/player-current-speed.directive", "src/overlay/player-current-time.directive", "src/overlay/player-panel.component", "src/overlay/player-pause.component", "src/overlay/player-play.component", "src/overlay/player-progress-bar-hover-indicator.component", "src/overlay/player-progress-bar.component", "src/overlay/player-repeat-available-quality.directive", "src/overlay/player-repeat-available-speed.directive", "src/overlay/player-set-quality.directive", "src/overlay/player-set-speed.directive", "src/overlay/player-total-time.directive", "src/overlay/player-volume-horizontal.component", "src/overlay/show-if-muted.directive", "src/overlay/show-if-player-is.directive", "src/service/youtube-marker-list.model", "src/service/youtube-marker.model", "src/service/youtube-player.model", "src/service/youtube-quality-map.service", "src/service/youtube-readable-time.service", "src/service/youtube-template-marker.model", "src/service/youtube.service", "angular"], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var angular;
    return {
        setters: [
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            },
            function (_6) {
            },
            function (_7) {
            },
            function (_8) {
            },
            function (_9) {
            },
            function (_10) {
            },
            function (_11) {
            },
            function (_12) {
            },
            function (_13) {
            },
            function (_14) {
            },
            function (_15) {
            },
            function (_16) {
            },
            function (_17) {
            },
            function (_18) {
            },
            function (_19) {
            },
            function (_20) {
            },
            function (_21) {
            },
            function (_22) {
            },
            function (_23) {
            },
            function (_24) {
            },
            function (_25) {
            },
            function (_26) {
            },
            function (_27) {
            },
            function (_28) {
            },
            function (angular_14) {
                angular = angular_14;
            }
        ],
        execute: function () {
            // Add a default handler to avoid missing the event. This can happen if you add the script manually,
            // which can be useful for performance
            if (typeof window['onYouTubeIframeAPIReady'] === 'undefined') {
                window['onYouTubeIframeAPIReady'] = function () {
                    setTimeout(function () {
                        window['onYouTubeIframeAPIReady']();
                    }, 100);
                };
            }
            // Do not touch the next comment, is used by gulp to inject template as dependency if needed
            // angular.module('hrAngularYoutube', ['hrAngularExtend','hrAngularYoutubeTpls'])
            angular.module('hrAngularYoutube')
                .run(['youtube', function (youtube) {
                    if (youtube.getAutoLoad()) {
                        // Add the iframe api to the dom
                        var tag = document.createElement('script');
                        tag.src = 'https://www.youtube.com/iframe_api';
                        var firstScriptTag = document.getElementsByTagName('script')[0];
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    }
                }]);
        }
    };
});
