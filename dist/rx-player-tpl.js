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
    '<div yt-slider="ctrl.sliderUp$.next($percentage)"\n' +
    '     yt-slider-down="ctrl.sliderDown$.next()"\n' +
    '     yt-slider-move="ctrl.sliderMove$.next($percentage)"\n' +
    '     class="hr-yt-bar" style="width:100%;height:100%;">\n' +
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
    '<div ng-click="ctrl.toggleMute()" class="ng-transclude"></div>\n' +
    '    <div class="hr-yt-volume-hr-bar"\n' +
    '         yt-slider-move="ctrl.updateVolume($percentage)"\n' +
    '         yt-slider="ctrl.updateVolume($percentage)">\n' +
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
System.register("src/util/rx/from-angular-watch.util", ["rxjs/Observable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function fromAngularWatch(property, scope) {
        return Observable_1.Observable.create(function (observer) {
            var oldVal;
            var unwatcher = scope.$watch(property, function (newVal) {
                if (newVal !== oldVal && newVal !== undefined) {
                    observer.next(newVal);
                    oldVal = newVal;
                }
            });
            return function () {
                unwatcher();
            };
        });
    }
    exports_1("fromAngularWatch", fromAngularWatch);
    var Observable_1;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/util/rx/take-until-scope-destroy.util", ["rxjs/Observable", "rxjs/Operator/takeUntil"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function takeUntilScopeDestroy(scope, that) {
        var notifier$ = Observable_2.Observable.create(function (observer) {
            scope.$on('$destroy', function () {
                observer.next();
                observer.complete();
            });
        });
        return takeUntil_1.takeUntil.call(that, notifier$);
    }
    exports_2("takeUntilScopeDestroy", takeUntilScopeDestroy);
    var Observable_2, takeUntil_1;
    return {
        setters: [
            function (Observable_2_1) {
                Observable_2 = Observable_2_1;
            },
            function (takeUntil_1_1) {
                takeUntil_1 = takeUntil_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/util/rx/scope-destroy.util", ["rxjs/Observable"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function observeScopeDestroy(scope) {
        return Observable_3.Observable.create(function (observer) {
            return scope.$on('$destroy', function () {
                observer.next();
                observer.complete();
            });
        });
    }
    exports_3("observeScopeDestroy", observeScopeDestroy);
    var Observable_3;
    return {
        setters: [
            function (Observable_3_1) {
                Observable_3 = Observable_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/util/rx/facade", ["rxjs/Observable", "rxjs/Subject", "src/util/rx/from-angular-watch.util", "src/util/rx/take-until-scope-destroy.util", "src/util/rx/scope-destroy.util"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_4(exports);
    }
    return {
        setters: [
            function (Observable_4_1) {
                exportStar_1(Observable_4_1);
            },
            function (Subject_1_1) {
                exportStar_1(Subject_1_1);
            },
            function (from_angular_watch_util_1_1) {
                exportStar_1(from_angular_watch_util_1_1);
            },
            function (take_until_scope_destroy_util_1_1) {
                exportStar_1(take_until_scope_destroy_util_1_1);
            },
            function (scope_destroy_util_1_1) {
                exportStar_1(scope_destroy_util_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/ng-helper/module", ["angular"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var angular;
    return {
        setters: [
            function (angular_1) {
                angular = angular_1;
            }
        ],
        execute: function () {
            // Do not touch the next comment, is used by gulp to inject template as dependency if needed
            angular.module('rxPlayer', ['ng' ,'rxPlayerTpls']);
        }
    };
});
System.register("src/ng-helper/component", ["angular", "src/ng-helper/module"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function Component(definition) {
        return function (target) {
            angular
                .module('rxPlayer')
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
    exports_6("Component", Component);
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
System.register("src/ng-helper/compose-link", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    /**
     * Calls multiple link functions
     */
    function composeLinkFn(links) {
        return function (scope, elm, attr, ctrl, trans) {
            var _this = this;
            links.forEach(function (link) { return link.call(_this, scope, elm, attr, ctrl, trans); });
        };
    }
    exports_7("composeLinkFn", composeLinkFn);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/ng-helper/directive", ["angular", "src/ng-helper/module"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function Directive(definition) {
        return function (target) {
            angular
                .module('rxPlayer')
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
    exports_8("Directive", Directive);
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
System.register("src/ng-helper/lifecycle", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
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
    exports_9("mockNgOnInitLink", mockNgOnInitLink);
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
    exports_9("mockNgAfterViewInit", mockNgAfterViewInit);
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
    exports_9("mockNgAfterContentInit", mockNgAfterContentInit);
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
    exports_9("mockNgOnInitFromAttr", mockNgOnInitFromAttr);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/ng-helper/require", ["src/ng-helper/compose-link", "src/ng-helper/lifecycle"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
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
    exports_10("bindRequireToCtrl", bindRequireToCtrl);
    function bindToCtrlCallOnInit(ctrls) {
        return compose_link_1.composeLinkFn([
            bindRequireToCtrl(ctrls),
            lifecycle_1.mockNgOnInitLink(ctrls)
        ]);
    }
    exports_10("bindToCtrlCallOnInit", bindToCtrlCallOnInit);
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
System.register("src/ng-helper/local-template-variable", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    /**
     * It finds the element attributes and tries to find one that starts with #,
     * when it does, it ties the controller to the parent scope.
     * This link function assumes:
     *      * The component's require definition is an array and its first value is the component ctrl
     *      * The scope is isolated
     *
     * The local variable needs to be named in kebab case like this
     *
     *      <component #this-long-variable> </component>
     *
     * instead of
     *
     *      <component #thisLongVariable> </component>
     *
     * Thats because of how angular 1 lowercases the element attribute names
     * When consumed, it must be used in camelCase, like this
     * <div ng-if="thisLongVariable.foo"></div>
     * where foo can be a property of the component controller
     */
    function localTemplateVariableLink(scope, elm, attr, ctrl) {
        // Get the attributes that comply to the local template variable format
        getLocalTemplateVariables(attr)
            .forEach(function (a) { return applyToScopeAndCtrl(a, scope.$parent, ctrl[0]); });
    }
    exports_11("localTemplateVariableLink", localTemplateVariableLink);
    /**
     * This helper function is equal to 'localTemplateVariableLink' but thinked for directives
     * instead of components
     */
    function directiveLocalTemplateVariableLink(scope, elm, attr, ctrl) {
        // Get the attributes that comply to the local template variable format
        getLocalTemplateVariables(attr)
            .forEach(function (a) { return applyToScopeAndCtrl(a, scope, ctrl[0]); });
    }
    exports_11("directiveLocalTemplateVariableLink", directiveLocalTemplateVariableLink);
    function applyToScopeAndCtrl(attr, scope, ctrl) {
        // Add it to scope
        scope[attr] = ctrl;
        // See if there is a ctrl variable in scope and add it there
        if (typeof scope['ctrl'] === 'object') {
            scope['ctrl'][attr] = ctrl;
        }
    }
    function getLocalTemplateVariables(attr) {
        // Convert the attributes to array
        return Object.keys(attr)
            .filter(function (a) { return a[0] === '#'; })
            .map(function (a) { return a.slice(1); });
    }
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/ng-helper/injector", ["angular", "src/ng-helper/module"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    function getInjector() {
        return injectorPromise;
    }
    exports_12("getInjector", getInjector);
    var angular, injectorPromise;
    return {
        setters: [
            function (angular_4) {
                angular = angular_4;
            },
            function (_3) {
            }
        ],
        execute: function () {
            injectorPromise = new Promise(function (resolve) {
                var loadInjector = function ($injector) { return resolve($injector); };
                loadInjector.$inject = ['$injector'];
                angular
                    .module('rxPlayer')
                    .run(loadInjector);
            });
            // angular.module('ng')
            // const imports = {
            //     $http: undefined as ng.IHttpService
            // };
            // @PlainModel({
            //     name: 'TypedRecordRestUtils',
            //     $inject: imports
            // })
            // export class TypedRecordRestUtils {} // Fix the way we use angular 1 injections in this cases
            // // Create a deferred $http function
            // export function $http<T> (url: ng.IRequestConfig): ng.IHttpPromise<T> {
            //     // return Maybe.fromNullable(imports.$http)
            //     //             .toPromise()
            //     //             .catch(_ => {
            //     //                 console.log('Imports not load');
            //     //                 return (any) => Promise.resolve(null);
            //     //                 // return Promise.reject('Imports not load');
            //     //             })
            //     //             .then($http => $http<T>(url));
            //     return imports.$http<T>(url);
            // }
        }
    };
});
System.register("src/ng-helper/facade", ["src/ng-helper/component", "src/ng-helper/compose-link", "src/ng-helper/directive", "src/ng-helper/lifecycle", "src/ng-helper/require", "src/ng-helper/local-template-variable", "src/ng-helper/injector"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_13(exports);
    }
    return {
        setters: [
            function (component_1_1) {
                exportStar_2(component_1_1);
            },
            function (compose_link_2_1) {
                exportStar_2(compose_link_2_1);
            },
            function (directive_1_1) {
                exportStar_2(directive_1_1);
            },
            function (lifecycle_2_1) {
                exportStar_2(lifecycle_2_1);
            },
            function (require_1_1) {
                exportStar_2(require_1_1);
            },
            function (local_template_variable_1_1) {
                exportStar_2(local_template_variable_1_1);
            },
            function (injector_1_1) {
                exportStar_2(injector_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/service/video-player.model", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/service/rx-video-interface.model", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var RxVideoInterface;
    return {
        setters: [],
        execute: function () {
            // TODO: Try to deprecate this in favour of having local adaptors in each component
            RxVideoInterface = (function () {
                // implements IVideoPlayer {
                function RxVideoInterface(player$) {
                    this.player$ = player$;
                    this.isPlaying = this.player$
                        .switchMap(function (player) { return player.playState$.mapTo(player); })
                        .map(function (player) { return player.isPlaying(); })
                        .startWith(false);
                    this.isNotPlaying = this.isPlaying.map(function (isPlaying) { return !isPlaying; });
                }
                RxVideoInterface.prototype.play = function () {
                    this.player$
                        .take(1)
                        .subscribe(function (player) { return player.play(); });
                };
                RxVideoInterface.prototype.pause = function () {
                    this.player$
                        .take(1)
                        .subscribe(function (player) { return player.pause(); });
                };
                return RxVideoInterface;
            }());
            exports_15("RxVideoInterface", RxVideoInterface);
        }
    };
});
System.register("src/util/algebras/curry", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/util/algebras/maybe", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    function nothing() {
        return new Nothing();
    }
    exports_17("nothing", nothing);
    function just(x) {
        return new Just(x);
    }
    exports_17("just", just);
    // export type Maybe<T> =  Nothing<T> | Just<T>;
    function maybe(c) {
        return function (m) {
            if (m === null || m === void 0) {
                return none;
            }
            else {
                return m.map(c);
            }
        };
    }
    exports_17("maybe", maybe);
    var Maybe, Nothing, none, Just;
    return {
        setters: [],
        execute: function () {
            Maybe = (function () {
                function Maybe() {
                }
                Maybe.of = function (val) {
                    return just(val);
                };
                Maybe.nothing = function () {
                    return nothing();
                };
                Maybe.prototype.of = function (val) {
                    return Maybe.of(val);
                };
                Maybe.fromNullable = function (val) {
                    if (val === null || val === void 0) {
                        return new Nothing();
                    }
                    else {
                        return just(val);
                    }
                };
                // Helpers
                Maybe.liftA2 = function (fn) {
                    return function (m1) { return function (m2) {
                        return Maybe.of(fn)
                            .ap(m1)
                            .ap(m2);
                    }; };
                };
                return Maybe;
            }());
            exports_17("Maybe", Maybe);
            Nothing = (function (_super) {
                __extends(Nothing, _super);
                function Nothing() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                // private x = null;
                Nothing.prototype.toString = function () {
                    return 'None';
                };
                // Applicative
                Nothing.prototype.ap = function (other) {
                    return new Nothing();
                };
                // Functor
                Nothing.prototype.map = function (c) {
                    return new Nothing();
                };
                // Monad
                Nothing.prototype.chain = function (c) {
                    return new Nothing();
                };
                // Foldable
                Nothing.prototype.reduce = function (fn, accu) {
                    return accu;
                };
                // Maybe specific
                Nothing.prototype.isJust = function () {
                    return false;
                };
                Nothing.prototype.isNothing = function () {
                    return true;
                };
                // Extract and recover
                Nothing.prototype.get = function () {
                    throw new TypeError('Canno\'t get value out of Nothing');
                };
                Nothing.prototype.getOrElse = function (val) {
                    return val;
                };
                Nothing.prototype.orElse = function (fn) {
                    return fn();
                };
                return Nothing;
            }(Maybe));
            exports_17("Nothing", Nothing);
            exports_17("none", none = new Nothing());
            Just = (function (_super) {
                __extends(Just, _super);
                function Just(x) {
                    var _this = _super.call(this) || this;
                    _this.x = x;
                    return _this;
                }
                Just.prototype.toString = function () {
                    return "Just(" + this.x + ")";
                };
                // Applicative
                Just.prototype.ap = function (other) {
                    var fn = this.x;
                    return other.map(fn);
                };
                Just.prototype.map = function (c) {
                    return just(c(this.x));
                };
                // Monad
                Just.prototype.chain = function (c) {
                    return c(this.x);
                };
                // Foldable
                Just.prototype.reduce = function (fn, accu) {
                    return fn(accu, this.x);
                };
                // Maybe specific
                Just.prototype.isJust = function () {
                    return true;
                };
                Just.prototype.isNothing = function () {
                    return false;
                };
                // Extract and recover
                Just.prototype.get = function () {
                    return this.x;
                };
                Just.prototype.getOrElse = function (val) {
                    return this.x;
                };
                Just.prototype.orElse = function (fn) {
                    return this;
                };
                return Just;
            }(Maybe));
            exports_17("Just", Just);
        }
    };
});
System.register("src/util/algebras/maybe-rx", ["src/util/algebras/maybe", "rxjs/observable/of", "rxjs/observable/throw"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var maybe_1, of_1, throw_1;
    return {
        setters: [
            function (maybe_1_1) {
                maybe_1 = maybe_1_1;
            },
            function (of_1_1) {
                of_1 = of_1_1;
            },
            function (throw_1_1) {
                throw_1 = throw_1_1;
            }
        ],
        execute: function () {
            maybe_1.Just.prototype.toObservable = function () {
                return of_1.of(this.x);
            };
            maybe_1.Nothing.prototype.toObservable = function () {
                return throw_1._throw(null);
            };
        }
    };
});
System.register("src/service/rx-video.service", ["src/util/rx/facade", "src/util/algebras/maybe", "src/util/algebras/maybe-rx"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    function registerVideoPlayer(name, player) {
        Registry[name] = player;
    }
    exports_19("registerVideoPlayer", registerVideoPlayer);
    function createVideoPlayer(name, options, videoDiv$) {
        console.log('creating video player');
        return maybe_2.Maybe
            .fromNullable(Registry[name])
            .toObservable()
            .switchMap(function (factory) { return factory.createVideoPlayer(options, videoDiv$); })
            .catch(function (_) { return facade_1.Observable.throw("Video player \"" + name + "\" not found"); });
    }
    exports_19("createVideoPlayer", createVideoPlayer);
    var facade_1, maybe_2, Registry;
    return {
        setters: [
            function (facade_1_1) {
                facade_1 = facade_1_1;
            },
            function (maybe_2_1) {
                maybe_2 = maybe_2_1;
            },
            function (_4) {
            }
        ],
        execute: function () {
            Registry = {};
        }
    };
});
System.register("src/directive/rx-player.component", ["src/util/rx/facade", "src/ng-helper/facade", "src/service/rx-video-interface.model", "src/service/rx-video.service"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var facade_2, facade_3, rx_video_interface_model_1, rx_video_service_1, playerAttrs, playerVarAttrs, RxPlayerComponent;
    return {
        setters: [
            function (facade_2_1) {
                facade_2 = facade_2_1;
            },
            function (facade_3_1) {
                facade_3 = facade_3_1;
            },
            function (rx_video_interface_model_1_1) {
                rx_video_interface_model_1 = rx_video_interface_model_1_1;
            },
            function (rx_video_service_1_1) {
                rx_video_service_1 = rx_video_service_1_1;
            }
        ],
        execute: function () {
            // YOUTUBE specifics, TODO: see how to refactor
            playerAttrs = ['id', 'height', 'width'];
            playerVarAttrs = ['autohide', 'autoplay', 'ccLoadPolicy', 'color', 'controls',
                'disablekb', 'enablejsapi', 'end', 'fs', 'ivLoadPolicy',
                'list', 'listType', 'loop', 'modestbranding', 'origin', 'playerapiid',
                'playlist', 'playsinline', 'rel', 'showinfo', 'start', 'theme'];
            RxPlayerComponent = (function () {
                function RxPlayerComponent(elm, attrs, scope) {
                    this.elm = elm;
                    this.attrs = attrs;
                    this.scope = scope;
                    // TODO: See why this was set. I remember something in the lines of not
                    // providing css if not needed but this being some of the basics
                    elm.css('position', 'relative');
                    elm.css('display', 'block');
                    // Save the overlay element in the controller so child directives can use it
                    // TODO: check this out again
                    this.setOverlayElement(elm);
                    this.ngOnInit(); // TODO: Change once we migrate to ng 1.6
                }
                RxPlayerComponent.prototype.setOverlayElement = function (elm) {
                    this.$overlayElm = elm;
                };
                RxPlayerComponent.prototype.getOverlayElement = function () {
                    return this.$overlayElm;
                };
                RxPlayerComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // TODO: Type this
                    var $videoDiv = this.elm[0].querySelector('.hr-yt-video-place-holder');
                    // const $overlayElm = angular.element(this.elm[0].querySelector('.hr-yt-overlay'));
                    var options = {
                        playerVars: {}
                    };
                    // TODO: Specific to youtube, move where needed
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
                    // Watch whenever watchVideoSource changes
                    var watchVideoSource$ = facade_2.fromAngularWatch(function () { return _this.videoSource; }, this.scope)
                        .publishReplay(1)
                        .refCount();
                    // Recipe to create a video player
                    // Whenever we have a video source
                    var player$ = watchVideoSource$
                        .map(function (source) { return ({
                        playerClass: source.player,
                        // TODO: Hardcoded to HTML5 sources :/
                        options: __assign({}, options, { sources: source.sources })
                    }); })
                        .switchMap(function (_a) {
                        var playerClass = _a.playerClass, options = _a.options;
                        return rx_video_service_1.createVideoPlayer(playerClass, options, $videoDiv);
                    })
                        .withLatestFrom(watchVideoSource$, function (player, source) { return ({ player: player, source: source }); })
                        .switchMap(function (_a) {
                        var player = _a.player, source = _a.source;
                        return player.load(source);
                    });
                    this.player$ = facade_2.takeUntilScopeDestroy(this.scope, player$)
                        .publishReplay(1)
                        .refCount();
                    // Suscribe to the observable to trigger the creation of the player
                    this.player$.subscribe(function () { }, function (error) { return console.error("There was a problem loading the video player: " + error); });
                    // TODO: I think I want to deprecate this in favour of having local controllers
                    // with their own adaptors
                    this.video = new rx_video_interface_model_1.RxVideoInterface(this.player$);
                };
                return RxPlayerComponent;
            }());
            RxPlayerComponent.$inject = ['$element', '$attrs', '$scope'];
            RxPlayerComponent = __decorate([
                facade_3.Component({
                    selector: 'rxPlayer',
                    templateUrl: '/template/directive/rx-player.component.html',
                    transclude: true,
                    link: facade_3.localTemplateVariableLink,
                    scope: {
                        videoSource: '='
                    },
                }),
                __metadata("design:paramtypes", [Object, Object, Object])
            ], RxPlayerComponent);
            exports_20("RxPlayerComponent", RxPlayerComponent);
            /*
            function convertToUnits (u: number|string): string {
                // If its numbers, interpret pixels
                if (typeof u === 'number' || /^\d+$/.test(u)) {
                    return u + 'px';
                }
                return u;
            }
            */
        }
    };
});
System.register("src/directive/yt-slider.directive", ["src/ng-helper/facade", "angular"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var facade_4, angular, YoutubeSliderDirective;
    return {
        setters: [
            function (facade_4_1) {
                facade_4 = facade_4_1;
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
                    this.ngOnInit(); // TODO: Remove after upgrade to ng 1.6
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
                    this.elm.on('mousedown', function (e) {
                        // If it wasn't a left click, end
                        if (e.button !== 0) {
                            return;
                        }
                        var p = getPercentageFromPageX(e.pageX);
                        slideDown(_this.scope, { $percentage: p });
                        // Create a blocker div, so that the iframe doesn't eat the mouse up events
                        var $blocker = angular.element('<div></div>');
                        $blocker.css('position', 'absolute');
                        $blocker.css('width', '100%');
                        $blocker.css('height', '100%');
                        $blocker.css('pointer-events', 'false');
                        $blocker.css('top', '0');
                        document.body.appendChild($blocker[0]);
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
                };
                return YoutubeSliderDirective;
            }());
            YoutubeSliderDirective.$inject = ['$element', '$attrs', '$scope', '$parse', '$document'];
            YoutubeSliderDirective = __decorate([
                facade_4.Directive({
                    selector: 'ytSlider',
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
            ], YoutubeSliderDirective);
            exports_21("YoutubeSliderDirective", YoutubeSliderDirective);
        }
    };
});
System.register("src/ng-helper/plain-model", ["angular"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    function PlainModel(options) {
        return function (target) {
            var ng1Injects = Object.keys(options.$inject || {});
            angular
                .module('rxPlayer')
                .factory(options.name, factory);
            factory.$inject = ng1Injects;
            function factory() {
                var deps = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    deps[_i] = arguments[_i];
                }
                ng1Injects.forEach(function (dep, i) {
                    options.$inject[dep] = deps[i];
                });
                if (options.onDepsLoad) {
                    options.onDepsLoad();
                }
                return target;
            }
        };
    }
    exports_22("PlainModel", PlainModel);
    var angular;
    return {
        setters: [
            function (angular_6) {
                angular = angular_6;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/players/youtube/youtube-quality-map.service", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
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
            exports_23("convertToYoutube", convertToYoutube = function (q) { return map[q] ? map[q] : 'Auto'; });
            exports_23("convertFromYoutube", convertFromYoutube = function (q) { return inverseMap[q] ? inverseMap[q] : 'default'; });
            exports_23("convertToYoutubeArray", convertToYoutubeArray = function (qArr) { return qArr.map(convertToYoutube); });
        }
    };
});
System.register("src/util/uuid.service", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    /**
     * @description
     * Creates a hash string that follows the UUID standard
     */
    function uuid() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    exports_24("uuid", uuid);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/service/youtube-marker-list.model", ["angular"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var angular;
    return {
        setters: [
            function (angular_7) {
                angular = angular_7;
            }
        ],
        execute: function () {
            angular.module('rxPlayer')
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
System.register("src/players/youtube/youtube-player.model", ["angular", "src/util/rx/facade", "src/ng-helper/plain-model", "src/players/youtube/youtube-quality-map.service", "src/util/uuid.service", "src/service/youtube-marker-list.model"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var angular, facade_5, plain_model_1, youtube_quality_map_service_1, uuid_service_1, imports, YoutubePlayer;
    return {
        setters: [
            function (angular_8) {
                angular = angular_8;
            },
            function (facade_5_1) {
                facade_5 = facade_5_1;
            },
            function (plain_model_1_1) {
                plain_model_1 = plain_model_1_1;
            },
            function (youtube_quality_map_service_1_1) {
                youtube_quality_map_service_1 = youtube_quality_map_service_1_1;
            },
            function (uuid_service_1_1) {
                uuid_service_1 = uuid_service_1_1;
            },
            function (_5) {
            }
        ],
        execute: function () {
            imports = {
                // TODO: Remove in favour of plain promises
                '$q': undefined,
                // TODO: Remove in favour of rxjs
                '$interval': undefined,
                // TODO: Remove at all cost (events, rxjs)
                '$rootScope': undefined,
                // TODO: Remove in favour of separating logic
                'YoutubeMarkerList': undefined
            };
            YoutubePlayer = (function () {
                function YoutubePlayer(elmOrId, options) {
                    var _this = this;
                    this.options = options;
                    this._muted = false;
                    this._volume = 100;
                    this._intendedQuality = 'default';
                    // TODO: Improve, maybe add a store
                    this.eventEmmiter = new facade_5.Subject();
                    // TODO: need to map this event to a common interface once defined
                    this.playState$ = this
                        .fromEvent('onStateChange')
                        .filter(function (ev) { return [YT.PlayerState.PLAYING, YT.PlayerState.ENDED, YT.PlayerState.PAUSED].indexOf(ev.data) !== -1; })
                        .map(function (ev) { return ({
                        player: _this,
                        type: 'playstate',
                        isPlaying: ev.data === YT.PlayerState.PLAYING
                    }); });
                    this.progress$ = this.fromEvent('onStateChange')
                        .switchMap(function (event) {
                        if (event.data !== YT.PlayerState.PLAYING) {
                            return facade_5.Observable.empty();
                        }
                        else {
                            return facade_5.Observable.interval(100);
                        }
                    })
                        .map(function (_) {
                        var event = {
                            player: _this,
                            type: 'videoprogress',
                            time: _this.getCurrentTime()
                        };
                        return event;
                    });
                    // TODO: There is no specific event from youtube to indicate that the video is
                    // being loaded, for now this recipe is disabled. Eventually we can combine onStateChange with
                    // an interval to poll when the event happens
                    this.loaded$ = facade_5.Observable.empty();
                    this.seeking$ = new facade_5.Subject();
                    this.seeked$ = new facade_5.Subject();
                    // -------------------
                    // -     Rate     -
                    // -------------------
                    this.playbackRate$ = this.fromEvent('onPlaybackRateChange')
                        .map(function (_) {
                        var event = {
                            player: _this,
                            type: 'ratechange',
                            rate: _this.getPlaybackRate()
                        };
                        return event;
                    });
                    this.volumeState$ = this.eventEmmiter
                        .filter(function (event) { return event.type === 'volumechange'; })
                        .map(function (_) {
                        var event = {
                            player: _this,
                            type: 'volumechange',
                            volume: _this.getVolume(),
                            isMuted: _this.isMuted()
                        };
                        return event;
                    });
                    this._eventsInitialized = false;
                    this._markerListener = false;
                    var op = angular.copy(this.options);
                    // TODO: Add a fit to parent or something like that
                    op.width = '100%';
                    op.height = '100%';
                    this.player = new YT.Player(elmOrId, op);
                    this.markerList = new imports.YoutubeMarkerList();
                    this.on('onStateChange', function (event) {
                        if (event.data === YT.PlayerState.PLAYING) {
                            _this.setVolume(_this.player.getVolume());
                            _this._setMuted(_this.player.isMuted());
                        }
                    });
                    // If a marker is added, make sure the marker listener is initialized
                    this.on('markerAdd', function (marker) {
                        _this._initializeMarkerListener();
                        marker.setPlayer(_this);
                    });
                    // If a marker is removed make sure its stoped
                    this.on('markerRemove', function (marker) { return marker.end(); });
                }
                // -------------------
                // -     Loading     -
                // -------------------
                /**
                 * Loads a source and emit a single value when the video is loaded
                 */
                // TODO: type youtube source
                YoutubePlayer.prototype.load = function (source) {
                    var _this = this;
                    var loadVideo$ = this.fromEvent('onStateChange')
                        .filter(function (x) { return x.data === YT.PlayerState.PLAYING; })
                        .scan(function (n) { return n + 1; }, 0)
                        .filter(function (n) { return n === 1; })
                        .do(function (_) { return _this.player.pauseVideo(); })
                        .map(function (_) { return _this; });
                    // TODO: It would be nice if this is part of the stream
                    this.player.loadVideoById(source.youtubeId);
                    return loadVideo$;
                };
                // -------------------
                // -     Playing     -
                // -------------------
                YoutubePlayer.prototype.play = function () {
                    return this.player.playVideo();
                };
                YoutubePlayer.prototype.pause = function () {
                    return this.player.pauseVideo();
                };
                YoutubePlayer.prototype.isPlaying = function () {
                    return this.player.getPlayerState() === YT.PlayerState.PLAYING;
                };
                // .fromEvent('progress')
                // .map(_ => {
                //     const event = {
                //         player: this,
                //         type: 'loaded',
                //         loaded: this.getLoadedPercent()
                //     } as ILoadedStateEvent;
                //     return event;
                // });
                YoutubePlayer.prototype.getDuration = function () {
                    return this.player.getDuration();
                };
                YoutubePlayer.prototype.getCurrentTime = function () {
                    return this.player.getCurrentTime();
                };
                YoutubePlayer.prototype.getLoadedPercent = function () {
                    return this.player.getVideoLoadedFraction() * 100;
                };
                YoutubePlayer.prototype.seekTo = function (sec) {
                    var _this = this;
                    var initialTime = this.getCurrentTime();
                    // Seek to sec
                    this.player.seekTo(sec, true);
                    // Inform of the intent to seek
                    // this.emit('seekToBegin', {newTime: sec, oldTime: initialTime});
                    this.seeking$.next({
                        player: this,
                        type: 'seeking'
                    });
                    // Inform when seek is ready
                    facade_5.Observable
                        .interval(200)
                        .map(function (_) { return _this.getCurrentTime(); })
                        .filter(function (currentTime) {
                        // If we intent to go backwards:
                        if (sec < initialTime) {
                            // We complete when current time is lower
                            // than the initial one
                            if (currentTime < initialTime) {
                                return true;
                            }
                        }
                        else {
                            // We complete once we pass the intended mark
                            if (currentTime > sec || sec - currentTime < 0.1) {
                                return true;
                            }
                        }
                        return false;
                        // There may be a third scenario where the player is paused, you pushed
                        // forward and it complete but just next to sec.
                    })
                        .take(1)
                        .mapTo({ player: this, type: 'seeked' })
                        .subscribe(function (nextValue) { return _this.seeked$.next(nextValue); });
                    return this.seeked$.take(1).toPromise();
                };
                YoutubePlayer.prototype.getPlaybackRate = function () {
                    return this.player.getPlaybackRate();
                };
                YoutubePlayer.prototype.setPlaybackRate = function (suggestedRate) {
                    return this.player.setPlaybackRate(suggestedRate);
                };
                YoutubePlayer.prototype.getAvailablePlaybackRates = function () {
                    return this.player.getAvailablePlaybackRates();
                };
                // -------------------
                // -      Volume     -
                // -------------------
                YoutubePlayer.prototype.toggleMute = function () {
                    if (this.isMuted()) {
                        this.unMute();
                    }
                    else {
                        this.mute();
                    }
                };
                ;
                YoutubePlayer.prototype.isMuted = function () {
                    return this._muted || this._volume === 0;
                };
                ;
                YoutubePlayer.prototype.setVolume = function (volume) {
                    var changed = this._volume !== volume;
                    // If volume is 0, then set as muted, if not is unmuted
                    this._setMuted(volume === 0);
                    this._volume = volume;
                    this.player.setVolume(volume);
                    if (changed) {
                        this.eventEmmiter.next({ player: this, type: 'volumechange' });
                    }
                };
                ;
                YoutubePlayer.prototype.getVolume = function () {
                    if (this._muted) {
                        return 0;
                    }
                    return this._volume;
                };
                ;
                // TODO: Maybe refactor into property setter
                YoutubePlayer.prototype._setMuted = function (muted) {
                    var changed = this._muted !== muted;
                    this._muted = muted;
                    if (changed) {
                        this.eventEmmiter.next({ player: this, type: 'volumechange' });
                    }
                };
                ;
                YoutubePlayer.prototype.mute = function () {
                    this._setMuted(true);
                    this.player.mute();
                };
                ;
                YoutubePlayer.prototype.unMute = function () {
                    this._setMuted(false);
                    this.player.unMute();
                };
                ;
                // -------------------
                // -  REFACTOR THIS  -
                // -------------------
                YoutubePlayer.prototype.setOverlayElement = function (elm) {
                    this._element = elm;
                };
                YoutubePlayer.prototype.getOverlayElement = function () {
                    return this._element;
                };
                // TODO: Deprecate
                YoutubePlayer.prototype.onProgress = function (fn, resolution) {
                    if (typeof resolution === 'undefined') {
                        resolution = 100;
                    }
                    var promise = null;
                    var startInterval = function () {
                        if (promise === null) {
                            promise = imports.$interval(fn, resolution);
                        }
                    };
                    var stopInterval = function () {
                        imports.$interval.cancel(promise);
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
                 */ /*
               eventSeekTo (sec, allowSeekAhead) {
                   const initialTime = this.player.getCurrentTime();
           
                   // If there is a blocking marker, don't allow to seek further than it
                   angular.forEach(this.markerList.getMarkers(), (marker) => {
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
                   this.emit('seekToBegin', {newTime: sec, oldTime: initialTime});
           
                   const seekPromise = imports.$q.defer();
                   // Check on a time interval that the seek has been completed
                   const promise = imports.$interval(() => {
                       const currentTime = this.player.getCurrentTime();
                       let seekCompleted = false;
           
           
                       if (sec < initialTime ) {
                           // If we intent to go backwards, we complete when current time is lower
                           // than the initial one
                           if (currentTime < initialTime) {
                               seekCompleted = true;
                           }
           
                       } else {
                           // If we intent to go forward, we complete once we pass the intended mark
                           if ( currentTime >= sec ) {
                               seekCompleted = true;
                           }
                       }
                       // There may be a third scenario where the player is paused, you pushed
                       // forward and it complete but just next to sec.
           
                       // Once its complete, for whatever reason, fire the event and cancel this interval
                       if (seekCompleted) {
                           imports.$interval.cancel(promise);
                           const ans = {newTime: sec, oldTime: initialTime};
                           this.emit('seekToCompleted', ans);
                           seekPromise.resolve(ans);
                       }
                   }, 50);
                   return seekPromise.promise;
               }*/
                YoutubePlayer.prototype.startLoading = function (sec) {
                    var _this = this;
                    var unregister;
                    var pauseAfterStart = function (event) {
                        if (event.data === YT.PlayerState.PLAYING) {
                            if (typeof sec === 'number') {
                                _this.seekTo(sec);
                            }
                            unregister();
                            _this.player.pauseVideo();
                        }
                    };
                    unregister = this.on('onStateChange', pauseAfterStart);
                    this.player.playVideo();
                };
                YoutubePlayer.prototype._initializeEventListener = function () {
                    var _this = this;
                    if (this._eventsInitialized) {
                        return;
                    }
                    this._eventHash = uuid_service_1.uuid();
                    var events = ['onStateChange', 'onPlaybackQualityChange', 'onPlaybackRateChange',
                        'onError', 'onApiChange', 'onReady'];
                    angular.forEach(events, function (name) {
                        _this.player.addEventListener(name, function (data) {
                            _this.emit(name, data);
                        });
                    });
                    this._eventsInitialized = true;
                };
                // TODO: Deprecate this shit
                YoutubePlayer.prototype.on = function (name, handler) {
                    this._initializeEventListener();
                    return imports.$rootScope.$on(this._eventHash + name, function (e, eventData) {
                        handler(eventData);
                    });
                };
                ;
                // TODO: Deprecate this shit
                YoutubePlayer.prototype.emit = function (name, data) {
                    imports.$rootScope.$emit(this._eventHash + name, data);
                };
                ;
                YoutubePlayer.prototype._initializeMarkerListener = function () {
                    var _this = this;
                    // Only initialize markers once
                    if (this._markerListener) {
                        return;
                    }
                    this._markerListener = true;
                    var runMarker = function (marker) {
                        if (marker.start()) {
                            // Emit an event with the marker
                            _this.emit('markerRun', marker);
                        }
                    };
                    var stopMarker = function (marker) {
                        marker.end();
                        // Emit an event with the marker
                        _this.emit('markerStop', marker);
                    };
                    var lastMarkerTime = -1;
                    this.onProgress(function () {
                        var currentTime = _this.getCurrentTime();
                        var newLastTime = lastMarkerTime;
                        angular.forEach(_this.markerList.getMarkers(), function (marker) {
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
                        angular.forEach(_this.markerList.getMarkers(), function (marker) {
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
                ;
                // TODO: Revisit... I think with the addond of the player factory this
                // shouldnt be needed
                YoutubePlayer.prototype.setMarkerList = function (list) {
                    this._initializeMarkerListener();
                    this.markerList = list;
                    this.markerList.setPlayer(this);
                    this.emit('markerListChanged');
                };
                ;
                YoutubePlayer.prototype.addMarker = function (marker) {
                    return this.markerList.add(marker);
                };
                ;
                YoutubePlayer.prototype.removeMarker = function (markerId) {
                    return this.markerList.removeById(markerId);
                };
                ;
                YoutubePlayer.prototype.getMarkers = function () {
                    return this.markerList.getMarkers();
                };
                ;
                YoutubePlayer.prototype.getMarker = function (id) {
                    return this.markerList.getMarker(id);
                };
                ;
                YoutubePlayer.prototype.getHumanPlaybackQuality = function () {
                    return youtube_quality_map_service_1.convertToYoutube(this.player.getPlaybackQuality());
                };
                ;
                YoutubePlayer.prototype.getHumanIntendedPlaybackQuality = function (showRealAuto) {
                    var ans = youtube_quality_map_service_1.convertToYoutube(this._intendedQuality);
                    if (ans === 'Auto' && showRealAuto && this.getHumanPlaybackQuality() !== 'Auto') {
                        ans += ' (' + this.getHumanPlaybackQuality() + ')';
                    }
                    return ans;
                };
                ;
                YoutubePlayer.prototype.setHumanPlaybackQuality = function (q) {
                    var quality = youtube_quality_map_service_1.convertFromYoutube(q);
                    this.setPlaybackQuality(quality);
                    this.emit('onIntentPlaybackQualityChange');
                };
                ;
                YoutubePlayer.prototype.setPlaybackQuality = function (q) {
                    this._intendedQuality = q;
                    this.player.setPlaybackQuality(q);
                };
                ;
                YoutubePlayer.prototype.destroy = function () {
                    return this.player.destroy();
                };
                // TODO: Deprecated in favour of load?
                YoutubePlayer.prototype.loadVideoById = function (videoId, startSeconds, suggestedQuality) {
                    this.player.loadVideoById(videoId, startSeconds, suggestedQuality);
                    return this;
                };
                YoutubePlayer.prototype.fromEvent = function (eventName) {
                    var _this = this;
                    var addHandler = function (h) { return _this.player.addEventListener(eventName, h); };
                    var removeHandler = function (h) { return _this.player.removeEventListener(eventName, h); };
                    return facade_5.Observable.fromEventPattern(addHandler, removeHandler);
                };
                YoutubePlayer.prototype.getAvailableQualityLevels = function () {
                    return this.player.getAvailableQualityLevels();
                };
                YoutubePlayer.prototype.getPlayerState = function () {
                    return this.player.getPlayerState();
                };
                return YoutubePlayer;
            }());
            YoutubePlayer = __decorate([
                plain_model_1.PlainModel({
                    name: 'YoutubePlayer',
                    $inject: imports
                }),
                __metadata("design:paramtypes", [Object, Object])
            ], YoutubePlayer);
            exports_26("YoutubePlayer", YoutubePlayer);
            // // TODO: Inherit better than these :S once i know if this is the way I want to access the object
            // angular.forEach([
            //     'getOptions', 'loadModule', 'loadVideoById', 'loadVideoByUrl', 'cueVideoById', 'cueVideoByUrl', 'cuePlaylist',
            //     'loadPlaylist', 'playVideo', 'pauseVideo', 'stopVideo', 'seekTo', 'clearVideo',
            //     'nextVideo', 'previousVideo', 'playVideoAt',
            //     'setSize', 'getPlaybackRate', 'setPlaybackRate', 'getAvailablePlaybackRates',
            //     'setLoop', 'setShuffle', 'getVideoLoadedFraction', 'getPlayerState', 'getCurrentTime',
            //     'getPlaybackQuality', 'setPlaybackQuality', 'getAvailableQualityLevels', 'getDuration',
            //     'getVideoUrl', 'getVideoEmbedCode', 'getPlaylist', 'getPlaylistIndex', 'getIframe', 'destroy'
            //     // 'addEventListener', 'removeEventListener','mute',unMute,isMuted,getVolume,setVolume
            // ], function(name) {
            //     YoutubePlayer.prototype[name] = function() {
            //         return this.player[name].apply(this.player, arguments);
            //     };
            // });
        }
    };
});
System.register("src/overlay/hr-yt-marker.directive", ["angular", "src/ng-helper/facade"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var angular, facade_6, YoutubeMarker;
    return {
        setters: [
            function (angular_9) {
                angular = angular_9;
            },
            function (facade_6_1) {
                facade_6 = facade_6_1;
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
                    this.rxPlayer
                        .player$
                        .subscribe(function (player) {
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
            exports_27("YoutubeMarker", YoutubeMarker);
            angular
                .module('rxPlayer')
                .directive('hrYtMarker', function () {
                return {
                    restrict: 'C',
                    require: ['hrYtMarker', '^youtubePlayer'],
                    scope: {
                        marker: '='
                    },
                    link: facade_6.bindToCtrlCallOnInit(['rxPlayer']),
                    controller: YoutubeMarker
                };
            });
        }
    };
});
System.register("src/overlay/player-current-quality.directive", ["src/ng-helper/facade"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var facade_7, PlayerCurrentQualityComponent;
    return {
        setters: [
            function (facade_7_1) {
                facade_7 = facade_7_1;
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
                    this.rxPlayer
                        .player$
                        .subscribe(function (player) {
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
                facade_7.Directive({
                    selector: 'playerCurrentQuality',
                    link: facade_7.bindToCtrlCallOnInit(['rxPlayer']),
                    require: ['^rxPlayer']
                }),
                __metadata("design:paramtypes", [Object, Object])
            ], PlayerCurrentQualityComponent);
            exports_28("PlayerCurrentQualityComponent", PlayerCurrentQualityComponent);
        }
    };
});
System.register("src/overlay/player-current-speed.directive", ["src/ng-helper/facade"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var facade_8, PlayerCurrentSpeedDirective;
    return {
        setters: [
            function (facade_8_1) {
                facade_8 = facade_8_1;
            }
        ],
        execute: function () {
            PlayerCurrentSpeedDirective = (function () {
                function PlayerCurrentSpeedDirective($scope, elm, attr, $parse) {
                    this.$scope = $scope;
                    this.elm = elm;
                    this.attr = attr;
                    this.$parse = $parse;
                }
                PlayerCurrentSpeedDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    var player$ = this.$parse(this.attr.playerCurrentSpeed)(this.$scope);
                    player$
                        .switchMap(function (player) { return player.playbackRate$; })
                        .map(function (event) { return event.rate; })
                        .subscribe(function (rate) {
                        _this.elm.html(rate);
                    });
                };
                return PlayerCurrentSpeedDirective;
            }());
            PlayerCurrentSpeedDirective.$inject = ['$scope', '$element', '$attrs', '$parse'];
            PlayerCurrentSpeedDirective = __decorate([
                facade_8.Directive({
                    selector: 'playerCurrentSpeed',
                    link: facade_8.mockNgOnInitFromAttr('playerCurrentSpeed'),
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object])
            ], PlayerCurrentSpeedDirective);
            exports_29("PlayerCurrentSpeedDirective", PlayerCurrentSpeedDirective);
        }
    };
});
System.register("src/service/readable-time.service", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    // TODO: Change to util
    function readableTime(seconds) {
        seconds = Math.floor(seconds);
        var secs = seconds % 60;
        var mins = Math.floor(seconds / 60);
        var hrs = Math.floor(mins / 60);
        mins = mins % 60;
        if (hrs > 0) {
            return hrs + ':' + String('00' + mins).slice(-2) + ':' + String('00' + secs).slice(-2);
        }
        else {
            return mins + ':' + String('00' + secs).slice(-2);
        }
    }
    exports_30("readableTime", readableTime);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/overlay/player-current-time.directive", ["src/ng-helper/facade", "src/service/readable-time.service"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var facade_9, readable_time_service_1, PlayerCurrentTimeComponent;
    return {
        setters: [
            function (facade_9_1) {
                facade_9 = facade_9_1;
            },
            function (readable_time_service_1_1) {
                readable_time_service_1 = readable_time_service_1_1;
            }
        ],
        execute: function () {
            PlayerCurrentTimeComponent = (function () {
                function PlayerCurrentTimeComponent($scope, elm, attr, $parse) {
                    this.$scope = $scope;
                    this.elm = elm;
                    this.attr = attr;
                    this.$parse = $parse;
                }
                PlayerCurrentTimeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var player$ = this.$parse(this.attr.playerCurrentTime)(this.$scope);
                    player$
                        .switchMap(function (player) { return player.progress$; })
                        .map(function (event) { return event.time; })
                        .map(function (time) { return readable_time_service_1.readableTime(time); })
                        .subscribe(function (readableTime) { return _this.elm.html(readableTime); });
                };
                return PlayerCurrentTimeComponent;
            }());
            PlayerCurrentTimeComponent.$inject = ['$scope', '$element', '$attrs', '$parse'];
            PlayerCurrentTimeComponent = __decorate([
                facade_9.Directive({
                    selector: 'playerCurrentTime',
                    link: facade_9.mockNgOnInitFromAttr('playerCurrentTime'),
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object])
            ], PlayerCurrentTimeComponent);
            exports_31("PlayerCurrentTimeComponent", PlayerCurrentTimeComponent);
        }
    };
});
System.register("src/overlay/player-panel.component", ["src/ng-helper/facade"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var facade_10, PlayerPanelComponent;
    return {
        setters: [
            function (facade_10_1) {
                facade_10 = facade_10_1;
            }
        ],
        execute: function () {
            PlayerPanelComponent = (function () {
                function PlayerPanelComponent(elm, attrs, $animate, $timeout) {
                    this.elm = elm;
                    this.attrs = attrs;
                    this.$animate = $animate;
                    this.$timeout = $timeout;
                }
                PlayerPanelComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var $overlay = this.rxPlayer.getOverlayElement();
                    this.rxPlayer
                        .player$
                        .subscribe(function (player) {
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
            PlayerPanelComponent.$inject = ['$element', '$attrs', '$animate', '$timeout'];
            PlayerPanelComponent = __decorate([
                facade_10.Component({
                    selector: 'playerPanel',
                    link: facade_10.bindToCtrlCallOnInit(['rxPlayer']),
                    require: ['^rxPlayer'],
                    transclude: true,
                    templateUrl: '/template/overlay/player-panel.component.html',
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object])
            ], PlayerPanelComponent);
            exports_32("PlayerPanelComponent", PlayerPanelComponent);
        }
    };
});
System.register("src/overlay/player-progress-bar-hover-indicator.component", ["src/ng-helper/facade", "src/service/readable-time.service"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var facade_11, readable_time_service_2, HoverIndicatorComponent;
    return {
        setters: [
            function (facade_11_1) {
                facade_11 = facade_11_1;
            },
            function (readable_time_service_2_1) {
                readable_time_service_2 = readable_time_service_2_1;
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
                    // TODO: Refactor to rxjs
                    this.rxPlayer
                        .player$
                        .subscribe(function (player) {
                        var duration = player.getDuration();
                        var barMove = function (event) {
                            var p = getPercentageFromPageX(event.pageX);
                            indicatorScope.$apply(function (scope) {
                                scope.time = readable_time_service_2.readableTime(p * duration);
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
                facade_11.Directive({
                    selector: 'hoverIndicator',
                    // templateUrl: '/template/overlay/player-progress-bar-hover-indicator.html',
                    link: facade_11.bindToCtrlCallOnInit(['rxPlayer']),
                    require: ['^rxPlayer']
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
            ], HoverIndicatorComponent);
            exports_33("HoverIndicatorComponent", HoverIndicatorComponent);
        }
    };
});
System.register("src/util/store.util", ["rxjs/Subject"], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var Subject_2, Store;
    return {
        setters: [
            function (Subject_2_1) {
                Subject_2 = Subject_2_1;
            }
        ],
        execute: function () {
            Store = (function () {
                function Store(reducer) {
                    this._dispacher = new Subject_2.Subject();
                    this._state = this._dispacher
                        .startWith({ type: 'INITIAL_ACTION' })
                        .scan(reducer, undefined) // Pass undefined as accu/state so it can use the default
                        .publishReplay(1).refCount();
                }
                Store.prototype.dispatch = function (action) {
                    this._dispacher.next(action);
                };
                Store.prototype.select = function () {
                    return this._state;
                };
                return Store;
            }());
            exports_34("Store", Store);
        }
    };
});
System.register("src/overlay/player-progress-bar.component", ["src/util/rx/facade", "src/ng-helper/facade", "src/util/store.util", "angular"], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    function progressBarStateReducer(state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case 'SET_WAS_PLAYING':
                return __assign({}, state, { wasPlaying: action.payload });
            case 'START_SEEKING':
                return __assign({}, state, { isSeeking: true });
            case 'STOP_SEEKING':
                return __assign({}, state, { isSeeking: false, seekPercentage: action.payload });
            default:
                return state;
        }
    }
    var facade_12, facade_13, store_util_1, angular, initialState, PlayerProgressBar;
    return {
        setters: [
            function (facade_12_1) {
                facade_12 = facade_12_1;
            },
            function (facade_13_1) {
                facade_13 = facade_13_1;
            },
            function (store_util_1_1) {
                store_util_1 = store_util_1_1;
            },
            function (angular_10) {
                angular = angular_10;
            }
        ],
        execute: function () {
            initialState = {
                wasPlaying: false,
                isSeeking: false,
                seekPercentage: 0
            };
            PlayerProgressBar = (function () {
                function PlayerProgressBar(elm, scope) {
                    this.elm = elm;
                    this.scope = scope;
                    this.sliderDown$ = new facade_12.Subject();
                    this.sliderMove$ = new facade_12.Subject();
                    this.sliderUp$ = new facade_12.Subject();
                }
                PlayerProgressBar.prototype.ngOnInit = function () {
                    var _this = this;
                    var $played = angular.element(this.elm[0].querySelector('.hr-yt-played'));
                    var $loaded = angular.element(this.elm[0].querySelector('.hr-yt-loaded'));
                    var $handle = angular.element(this.elm[0].querySelector('.hr-yt-handle'));
                    // const $bar = angular.element(this.elm[0].querySelector('.hr-yt-bar'));
                    var updateProgressBar = function (sec, duration, loaded) {
                        var played = 100 * sec / duration;
                        // This was calculated manually, but cant have
                        // outerwidth without adding jquery
                        var handleOuterWidth = 15;
                        var handleX = played * _this.elm[0].clientWidth / 100 - handleOuterWidth / 2;
                        handleX = Math.min(Math.max(0, handleX), _this.elm[0].clientWidth - handleOuterWidth);
                        $loaded.css('width', loaded + '%');
                        $played.css('width', played + '%');
                        $handle.css('left', handleX + 'px');
                    };
                    // When someone seeks the video update the progress to the intended seek time
                    // player.on('seekToBegin', (seekTime) => updateProgress(seekTime.newTime));
                    // TODO: Reenable once the markers are refactored
                    // this.scope.markers = player.getMarkers();
                    // player.on('markerListChanged', () =>  this.scope.markers = player.getMarkers());
                    var stateStore = new store_util_1.Store(progressBarStateReducer);
                    var scopeDestroy$ = facade_12.observeScopeDestroy(this.scope);
                    var stateWhenSeekingChange$ = stateStore
                        .select()
                        .distinctUntilChanged(function (s1, s2) { return s1.isSeeking === s2.isSeeking; });
                    // Recipy for updating the progress bar when the player is playing
                    var updateWhenPlayer$ = this.rxPlayer.player$
                        .switchMap(function (player) {
                        return facade_12.Observable
                            .merge(
                        // Whenever the player updates its play progress
                        player.progress$, 
                        // When the player loads more data
                        player.loaded$, 
                        // Whenever the player completes a seek
                        player.seeked$)
                            .map(function (_) { return player.getCurrentTime() / player.getDuration(); });
                    });
                    // Recipy for updating the progress bar
                    stateWhenSeekingChange$
                        .switchMap(function (state) {
                        if (state.isSeeking) {
                            // If seeking update every mouse move
                            return _this.sliderMove$;
                        }
                        else {
                            // If not, update when the video player does
                            return updateWhenPlayer$;
                        }
                    })
                        .withLatestFrom(this.rxPlayer.player$, function (percentage, player) { return ({
                        time: Math.round(player.getDuration() * percentage),
                        duration: player.getDuration(),
                        loaded: player.getLoadedPercent()
                    }); })
                        .takeUntil(scopeDestroy$)
                        .subscribe(function (_a) {
                        var time = _a.time, duration = _a.duration, loaded = _a.loaded;
                        return updateProgressBar(time, duration, loaded);
                    });
                    // Update the state that says if the video player was playing before seeking start
                    stateStore.select()
                        .switchMap(function (state) {
                        if (state.isSeeking) {
                            // If it's seeking we don't update this state
                            return facade_12.Observable.empty();
                        }
                        else {
                            // If it's not seeking, then every time the play state changes, see if its playing
                            return _this.rxPlayer.player$
                                .switchMap(function (player) { return player.playState$; })
                                .map(function (ev) { return ev.isPlaying; });
                        }
                    })
                        .takeUntil(scopeDestroy$)
                        .subscribe(function (wasPlaying) {
                        return stateStore.dispatch({
                            type: 'SET_WAS_PLAYING',
                            payload: wasPlaying
                        });
                    });
                    // Update the video player:
                    // When seeking starts pause the video player
                    // When seeking ends go to the selected percentage and start playing if it was playing before
                    stateWhenSeekingChange$
                        .withLatestFrom(this.rxPlayer.player$, function (state, player) { return ({ state: state, player: player }); })
                        .takeUntil(scopeDestroy$)
                        .subscribe(function (_a) {
                        var state = _a.state, player = _a.player;
                        // If it starts seeking, pause the feed
                        if (state.isSeeking) {
                            player.pause();
                        }
                        else {
                            // When we know where to seek, do it and check if we need to play again
                            player
                                .seekTo(state.seekPercentage * player.getDuration())
                                .then(function (_) {
                                if (state.wasPlaying) {
                                    player.play();
                                }
                            });
                        }
                    });
                    facade_12.Observable
                        .merge(this.sliderDown$.mapTo({ type: 'START_SEEKING' }), this.sliderUp$.map(function (percentage) { return ({ type: 'STOP_SEEKING', payload: percentage }); }))
                        .takeUntil(scopeDestroy$)
                        .subscribe(function (action) { return stateStore.dispatch(action); });
                };
                return PlayerProgressBar;
            }());
            PlayerProgressBar.$inject = ['$element', '$scope'];
            PlayerProgressBar = __decorate([
                facade_13.Component({
                    selector: 'playerProgressBar',
                    templateUrl: '/template/overlay/player-progress-bar.component.html',
                    link: facade_13.bindToCtrlCallOnInit(['rxPlayer']),
                    require: ['^rxPlayer']
                }),
                __metadata("design:paramtypes", [Object, Object])
            ], PlayerProgressBar);
            exports_35("PlayerProgressBar", PlayerProgressBar);
        }
    };
});
System.register("src/overlay/player-repeat-available-quality.directive", ["src/ng-helper/facade", "src/players/youtube/youtube-quality-map.service"], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var facade_14, youtube_quality_map_service_2, PlayerRepeatAvailableSpeedDirective;
    return {
        setters: [
            function (facade_14_1) {
                facade_14 = facade_14_1;
            },
            function (youtube_quality_map_service_2_1) {
                youtube_quality_map_service_2 = youtube_quality_map_service_2_1;
            }
        ],
        execute: function () {
            PlayerRepeatAvailableSpeedDirective = (function () {
                function PlayerRepeatAvailableSpeedDirective(scope, attrs) {
                    this.scope = scope;
                    this.attrs = attrs;
                }
                PlayerRepeatAvailableSpeedDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    this.rxPlayer
                        .player$
                        .subscribe(function (player) {
                        // Youtube doesnt inform you on the available qualities until loading video
                        var unbind = player.on('onStateChange', function (event) {
                            if (event.data === YT.PlayerState.PLAYING) {
                                unbind();
                                _this.scope.availableQuality = youtube_quality_map_service_2.convertToYoutubeArray(player.getAvailableQualityLevels());
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
            PlayerRepeatAvailableSpeedDirective.$inject = ['$scope', '$attrs'];
            PlayerRepeatAvailableSpeedDirective = __decorate([
                facade_14.Directive({
                    selector: 'playerRepeatAvailableQuality',
                    link: facade_14.bindToCtrlCallOnInit(['rxPlayer']),
                    require: ['^rxPlayer'],
                    replace: true,
                    priority: 1000,
                    // BUUU :'(
                    template: function (tElm) {
                        tElm.removeAttr('player-repeat-available-quality');
                        tElm.attr('ng-repeat', '$quality in availableQuality');
                        return tElm[0].outerHTML;
                    }
                }),
                __metadata("design:paramtypes", [Object, Object])
            ], PlayerRepeatAvailableSpeedDirective);
            exports_36("PlayerRepeatAvailableSpeedDirective", PlayerRepeatAvailableSpeedDirective);
        }
    };
});
System.register("src/overlay/player-repeat-available-speed.directive", ["src/ng-helper/facade"], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var facade_15, PlayerRepeatAvailableSpeedDirective;
    return {
        setters: [
            function (facade_15_1) {
                facade_15 = facade_15_1;
            }
        ],
        execute: function () {
            PlayerRepeatAvailableSpeedDirective = (function () {
                function PlayerRepeatAvailableSpeedDirective(scope, attrs) {
                    this.scope = scope;
                    this.attrs = attrs;
                }
                PlayerRepeatAvailableSpeedDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    this.rxPlayer
                        .player$
                        .subscribe(function (player) {
                        _this.scope.availableSpeeds = player.getAvailablePlaybackRates();
                        if (_this.attrs.hasOwnProperty('reverse')) {
                            _this.scope.availableSpeeds.reverse();
                        }
                    });
                };
                return PlayerRepeatAvailableSpeedDirective;
            }());
            PlayerRepeatAvailableSpeedDirective.$inject = ['$scope', '$attrs'];
            PlayerRepeatAvailableSpeedDirective = __decorate([
                facade_15.Directive({
                    selector: 'playerRepeatAvailableSpeed',
                    link: facade_15.bindToCtrlCallOnInit(['rxPlayer']),
                    require: ['^rxPlayer'],
                    replace: true,
                    priority: 1000,
                    // BUUU :'(
                    template: function (tElm) {
                        tElm.removeAttr('player-repeat-available-speed');
                        tElm.attr('ng-repeat', '$speed in availableSpeeds');
                        return tElm[0].outerHTML;
                    }
                }),
                __metadata("design:paramtypes", [Object, Object])
            ], PlayerRepeatAvailableSpeedDirective);
            exports_37("PlayerRepeatAvailableSpeedDirective", PlayerRepeatAvailableSpeedDirective);
        }
    };
});
System.register("src/overlay/player-set-quality.directive", ["src/ng-helper/facade"], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var facade_16, PlayerCurrentTimeComponent;
    return {
        setters: [
            function (facade_16_1) {
                facade_16 = facade_16_1;
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
                    this.rxPlayer
                        .player$
                        .subscribe(function (player) {
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
                facade_16.Directive({
                    selector: 'playerSetQuality',
                    link: facade_16.bindToCtrlCallOnInit(['rxPlayer']),
                    require: ['^rxPlayer']
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object])
            ], PlayerCurrentTimeComponent);
            exports_38("PlayerCurrentTimeComponent", PlayerCurrentTimeComponent);
        }
    };
});
System.register("src/overlay/player-set-speed.directive", ["src/ng-helper/facade"], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var facade_17, PlayerSetSpeedDirective;
    return {
        setters: [
            function (facade_17_1) {
                facade_17 = facade_17_1;
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
                    this.rxPlayer
                        .player$
                        .subscribe(function (player) {
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
                facade_17.Directive({
                    selector: 'playerSetSpeed',
                    link: facade_17.bindToCtrlCallOnInit(['rxPlayer']),
                    require: ['^rxPlayer']
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object])
            ], PlayerSetSpeedDirective);
            exports_39("PlayerSetSpeedDirective", PlayerSetSpeedDirective);
        }
    };
});
System.register("src/overlay/player-total-time.directive", ["src/ng-helper/facade", "src/service/readable-time.service"], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var facade_18, readable_time_service_3, PlayerTotalTimeDirective;
    return {
        setters: [
            function (facade_18_1) {
                facade_18 = facade_18_1;
            },
            function (readable_time_service_3_1) {
                readable_time_service_3 = readable_time_service_3_1;
            }
        ],
        execute: function () {
            PlayerTotalTimeDirective = (function () {
                function PlayerTotalTimeDirective($scope, elm, attr, $parse) {
                    this.$scope = $scope;
                    this.elm = elm;
                    this.attr = attr;
                    this.$parse = $parse;
                }
                PlayerTotalTimeDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    var player$ = this.$parse(this.attr.playerTotalTime)(this.$scope);
                    player$
                        .map(function (player) { return player.getDuration(); })
                        .map(function (time) { return readable_time_service_3.readableTime(time); })
                        .subscribe(function (readableTime) { return _this.elm.html(readableTime); });
                };
                return PlayerTotalTimeDirective;
            }());
            PlayerTotalTimeDirective.$inject = ['$scope', '$element', '$attrs', '$parse'];
            PlayerTotalTimeDirective = __decorate([
                facade_18.Directive({
                    selector: 'playerTotalTime',
                    link: facade_18.mockNgOnInitFromAttr('playerTotalTime'),
                    require: ['^rxPlayer']
                }),
                __metadata("design:paramtypes", [Object, Object, Object, Object])
            ], PlayerTotalTimeDirective);
            exports_40("PlayerTotalTimeDirective", PlayerTotalTimeDirective);
        }
    };
});
System.register("src/overlay/player-volume-horizontal.component", ["angular", "src/ng-helper/facade"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var angular, facade_19, PlayerVolumeHorizontalComponent;
    return {
        setters: [
            function (angular_11) {
                angular = angular_11;
            },
            function (facade_19_1) {
                facade_19 = facade_19_1;
            }
        ],
        execute: function () {
            PlayerVolumeHorizontalComponent = (function () {
                function PlayerVolumeHorizontalComponent(elm) {
                    this.elm = elm;
                    this.$volumeBar = angular.element(this.elm[0].querySelector('.hr-yt-volume-hr-bar'));
                    this.$settedBar = angular.element(this.elm[0].querySelector('.hr-yt-setted'));
                    this.$handle = angular.element(this.elm[0].querySelector('.hr-yt-handle'));
                }
                PlayerVolumeHorizontalComponent.prototype.updateVolumeBar = function (volume) {
                    var handleX = volume * this.$volumeBar[0].clientWidth - this.$handle[0].clientWidth / 2;
                    handleX = Math.min(Math.max(0, handleX), this.$volumeBar[0].clientWidth - this.$handle[0].clientWidth / 2);
                    this.$settedBar.css('width', volume * 100 + '%');
                    this.$handle.css('left', handleX + 'px');
                };
                PlayerVolumeHorizontalComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // Update the volume bar whenever we change volume
                    this.player
                        .switchMap(function (player) { return player.volumeState$; })
                        .map(function (event) { return event.volume; })
                        .startWith(100)
                        .subscribe(function (volume) {
                        _this.updateVolumeBar(volume / 100);
                    });
                    this.isMuted = this.player
                        .switchMap(function (player) { return player.volumeState$; })
                        .map(function (event) { return event.isMuted; })
                        .startWith(false);
                };
                PlayerVolumeHorizontalComponent.prototype.updateVolume = function (volume) {
                    this.setVolume(volume);
                    this.updateVolumeBar(volume);
                };
                PlayerVolumeHorizontalComponent.prototype.setVolume = function (volume) {
                    this.player
                        .take(1)
                        .subscribe(function (player) { return player.setVolume(volume * 100); });
                };
                PlayerVolumeHorizontalComponent.prototype.toggleMute = function () {
                    this.player
                        .take(1)
                        .subscribe(function (player) { return player.toggleMute(); });
                };
                return PlayerVolumeHorizontalComponent;
            }());
            PlayerVolumeHorizontalComponent.$inject = ['$element'];
            PlayerVolumeHorizontalComponent = __decorate([
                facade_19.Component({
                    selector: 'playerVolumeHorizontal',
                    templateUrl: '/template/overlay/player-volume-horizontal.component.html',
                    link: facade_19.composeLinkFn([
                        facade_19.mockNgOnInitLink(['player']),
                        facade_19.localTemplateVariableLink
                    ]),
                    scope: {
                        player: '='
                    },
                    transclude: true,
                }),
                __metadata("design:paramtypes", [Object])
            ], PlayerVolumeHorizontalComponent);
            exports_41("PlayerVolumeHorizontalComponent", PlayerVolumeHorizontalComponent);
        }
    };
});
System.register("src/service/youtube-marker.model", ["angular", "src/util/uuid.service"], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var angular, uuid_service_2;
    return {
        setters: [
            function (angular_12) {
                angular = angular_12;
            },
            function (uuid_service_2_1) {
                uuid_service_2 = uuid_service_2_1;
            }
        ],
        execute: function () {
            angular.module('rxPlayer')
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
                    this.id = this.id || options.id || uuid_service_2.uuid();
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
System.register("src/service/youtube-template-marker.model", ["angular"], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var angular;
    return {
        setters: [
            function (angular_13) {
                angular = angular_13;
            }
        ],
        execute: function () {
            angular.module('rxPlayer')
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
System.register("src/players/youtube/youtube.service", ["angular", "src/util/rx/facade", "src/service/rx-video.service", "src/ng-helper/facade"], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    function loadPlayer(elmOrId, options) {
        return apiLoadedPromise.then(function () {
            var newOptions = {};
            // Override main options
            angular.extend(newOptions, angular.copy(defaultOptions), options);
            // Override player var options
            newOptions.playerVars = {}; // For some reason if I dont reset this angular.extend doesnt work as expected
            angular.extend(newOptions.playerVars, angular.copy(defaultOptions.playerVars), options.playerVars);
            // TODO: Replace with observable
            // Get the angular 1 injector
            return facade_20.getInjector()
                .then(function (injector) { return injector.get('YoutubePlayer'); })
                .then(function (YoutubePlayer) { return new YoutubePlayer(elmOrId, newOptions); })
                .then(function (player) { return new Promise(function (resolve) { return player.on('onReady', function () { return resolve(player); }); }); });
        });
    }
    exports_44("loadPlayer", loadPlayer);
    function createVideoPlayer(options, $videoDiv) {
        return facade_21.Observable.create(function (observer) {
            options.height = options.height || '390';
            options.width = options.width || '640';
            // TODO: Need to see where to put this after refactor
            // this.elm.css('height', convertToUnits(options.height));
            // this.elm.css('width', convertToUnits(options.width));
            var player;
            loadPlayer($videoDiv, options).then(function (p) {
                player = p;
                // player.setOverlayElement($overlayElm); // TODO: do i need this?
                observer.next(player);
            });
            return function () {
                if (player) {
                    player.destroy();
                }
            };
        });
    }
    exports_44("createVideoPlayer", createVideoPlayer);
    var angular, facade_21, rx_video_service_2, facade_20, Factory, defaultOptions, autoload, apiLoadedPromise, Provider;
    return {
        setters: [
            function (angular_14) {
                angular = angular_14;
            },
            function (facade_21_1) {
                facade_21 = facade_21_1;
            },
            function (rx_video_service_2_1) {
                rx_video_service_2 = rx_video_service_2_1;
            },
            function (facade_20_1) {
                facade_20 = facade_20_1;
            }
        ],
        execute: function () {
            Factory = {
                createVideoPlayer: createVideoPlayer
            };
            rx_video_service_2.registerVideoPlayer('YoutubePlayer', Factory);
            defaultOptions = {
                playerVars: {
                    origin: location.origin + '/',
                    enablejsapi: 1
                }
            };
            autoload = true;
            // TODO: Replace with observable
            exports_44("apiLoadedPromise", apiLoadedPromise = new Promise(function (resolve) {
                // Youtube callback when API is ready
                window['onYouTubeIframeAPIReady'] = resolve;
            }));
            Provider = (function () {
                function Provider() {
                    this.$get = function () {
                        return {
                            loadPlayer: loadPlayer,
                            getAutoLoad: function () {
                                return autoload;
                            }
                        };
                    };
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
            exports_44("Provider", Provider);
            angular.module('rxPlayer').provider('youtube', new Provider());
        }
    };
});
System.register("src/util/rx/rx-operators-import", ["rxjs/add/observable/fromPromise", "rxjs/add/observable/fromEventPattern", "rxjs/add/observable/fromEvent", "rxjs/add/observable/of", "rxjs/add/observable/merge", "rxjs/add/observable/throw", "rxjs/add/observable/empty", "rxjs/add/observable/interval", "rxjs/add/operator/map", "rxjs/add/operator/mapTo", "rxjs/add/operator/merge", "rxjs/add/operator/scan", "rxjs/add/operator/withLatestFrom", "rxjs/add/operator/filter", "rxjs/add/operator/switchMap", "rxjs/add/operator/catch", "rxjs/add/operator/startWith", "rxjs/add/operator/toPromise", "rxjs/add/operator/distinctUntilChanged", "rxjs/add/operator/delay", "rxjs/add/operator/take", "rxjs/add/operator/takeUntil", "rxjs/add/operator/last", "rxjs/add/operator/do", "rxjs/add/operator/publishReplay", "rxjs/add/operator/multicast"], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    return {
        setters: [
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
            function (_29) {
            },
            function (_30) {
            },
            function (_31) {
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/main", ["src/directive/rx-player.component", "src/directive/yt-slider.directive", "src/overlay/hr-yt-marker.directive", "src/overlay/player-current-quality.directive", "src/overlay/player-current-speed.directive", "src/overlay/player-current-time.directive", "src/overlay/player-panel.component", "src/overlay/player-progress-bar-hover-indicator.component", "src/overlay/player-progress-bar.component", "src/overlay/player-repeat-available-quality.directive", "src/overlay/player-repeat-available-speed.directive", "src/overlay/player-set-quality.directive", "src/overlay/player-set-speed.directive", "src/overlay/player-total-time.directive", "src/overlay/player-volume-horizontal.component", "src/service/youtube-marker-list.model", "src/service/youtube-marker.model", "src/players/youtube/youtube-player.model", "src/service/youtube-template-marker.model", "src/players/youtube/youtube.service", "src/util/rx/rx-operators-import", "angular"], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var angular;
    return {
        setters: [
            function (_32) {
            },
            function (_33) {
            },
            function (_34) {
            },
            function (_35) {
            },
            function (_36) {
            },
            function (_37) {
            },
            function (_38) {
            },
            function (_39) {
            },
            function (_40) {
            },
            function (_41) {
            },
            function (_42) {
            },
            function (_43) {
            },
            function (_44) {
            },
            function (_45) {
            },
            function (_46) {
            },
            function (_47) {
            },
            function (_48) {
            },
            function (_49) {
            },
            function (_50) {
            },
            function (_51) {
            },
            function (_52) {
            },
            function (angular_15) {
                angular = angular_15;
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
            angular.module('rxPlayer')
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
/*
TODO: Removed keep-aspect-ratio from rx-player, make it work later
        let aspectRatio = 16 / 9;

        // Maybe add some sort of debounce, but without adding a dependency
        const resizeWithAspectRatio = () => {
            if (options.height) {
                const w = Math.round(this.elm[0].clientHeight * aspectRatio);
                this.elm.css('width', convertToUnits(w));

            } else if (options.width) {
                const h = Math.round(this.elm[0].clientWidth / aspectRatio);
                this.elm.css('height', convertToUnits(h));
            }
        };

        if (this.attrs.hasOwnProperty('keepAspectRatio')) {

            // If aspect ratio is a string like '16:9', set the proper variable.
            const aspectMatch = this.attrs.keepAspectRatio.match(/^(\d+):(\d+)$/);
            if (aspectMatch) {
                aspectRatio = aspectMatch[1] / aspectMatch[2];
            }

            angular.element(window).bind('resize', resizeWithAspectRatio);
            // If the window or the element size changes, resize the element
            let unit = 0;
            this.scope.$watch(() => {
                let newUnit = 0;
                if (options.height) {
                    newUnit = this.elm[0].clientHeight;
                } else {
                    newUnit = this.elm[0].clientWidth;
                }
                if (unit !== newUnit && newUnit !== 0) {
                    setTimeout(() => {
                        this.scope.$apply(resizeWithAspectRatio);
                    });
                    unit = newUnit;
                }
            });

        }
        */
System.register("src/ng-helper/async.filter", ["angular"], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    // export function asyncFilter2 () {
    //     var promiseValues = new WeakMap()
    //     return function (promise) {
    //         if (!promiseValues.has(promise)) {
    //             promiseValues.set(promise, undefined);
    //             promise.then(function (value) {
    //                 promiseValues.set(promise, value);
    //             });
    //         } else {
    //             return promiseValues.get(promise)
    //         }
    //     }
    // }
    // export function asyncFilter2 () {
    //     const unfolded = new WeakMap();
    //     return function (promiseOrObs, $scope) {
    //         if (!unfolded.has(promiseOrObs)) {
    //             unfolded.set(promiseOrObs, undefined);
    //             if ('then' in promiseOrObs) {
    //                 promiseOrObs.then(function (value) {
    //                     unfolded.set(promiseOrObs, value);
    //                 });
    //             }
    //             else if ('subscribe' in promiseOrObs) {
    //                 takeUntilScopeDestroy(promiseOrObs, $scope)
    //                     .subscribe(function (value) {
    //                         console.log('the value is', value);
    //                         unfolded.set(promiseOrObs, value);
    //                     });
    //             }
    //         } else {
    //             return unfolded.get(promiseOrObs);
    //         }
    //     };
    // }
    function asyncFilter() {
        var values = {};
        var subscriptions = {};
        function async(input, scope) {
            // Make sure we have an Observable or a Promise
            if (!input || !(input.subscribe || input.then)) {
                return input;
            }
            var inputId = objectId(input);
            if (!(inputId in subscriptions)) {
                var subscriptionStrategy = input.subscribe && input.subscribe.bind(input)
                    || input.success && input.success.bind(input) // To make it work with HttpPromise
                    || input.then.bind(input);
                subscriptions[inputId] = subscriptionStrategy(function (value) {
                    values[inputId] = value;
                    if (scope && scope.$applyAsync) {
                        scope.$applyAsync(); // Automatic safe apply, if scope provided
                    }
                });
                if (scope && scope.$on) {
                    // Clean up subscription and its last value when the scope is destroyed.
                    scope.$on('$destroy', function () {
                        if (subscriptions[inputId] && subscriptions[inputId].dispose) {
                            subscriptions[inputId].dispose();
                        }
                        delete subscriptions[inputId];
                        delete values[inputId];
                    });
                }
            }
            return values[inputId];
        }
        ;
        // Need a way to tell the input objects apart from each other (so we only subscribe to them once)
        var nextObjectID = 0;
        function objectId(obj) {
            if (!obj.hasOwnProperty('__asyncFilterObjectID__')) {
                obj.__asyncFilterObjectID__ = ++nextObjectID;
            }
            return obj.__asyncFilterObjectID__;
        }
        // So that Angular does not cache the return value
        async['$stateful'] = true;
        return async;
    }
    var angular;
    return {
        setters: [
            function (angular_16) {
                angular = angular_16;
            }
        ],
        execute: function () {
            // import {takeUntilScopeDestroy} from 'src/util/rx/take-until-scope-destroy.util';
            angular.module('rxPlayer').filter('async', asyncFilter);
            ;
        }
    };
});
System.register("src/players/html5/html5-player.model", ["angular", "src/util/rx/facade", "src/ng-helper/plain-model"], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var angular, facade_22, plain_model_2, HTML5Player;
    return {
        setters: [
            function (angular_17) {
                angular = angular_17;
            },
            function (facade_22_1) {
                facade_22 = facade_22_1;
            },
            function (plain_model_2_1) {
                plain_model_2 = plain_model_2_1;
            }
        ],
        execute: function () {
            HTML5Player = (function () {
                function HTML5Player(elm, options) {
                    var _this = this;
                    this.video = document.createElement('video');
                    this.ready$ = facade_22.Observable
                        .fromEvent(this.video, 'loadstart')
                        .mapTo(this);
                    this.playState$ = facade_22.Observable.merge(facade_22.Observable
                        .fromEvent(this.video, 'play')
                        .mapTo({
                        player: this,
                        type: 'playstate',
                        isPlaying: true
                    }), facade_22.Observable
                        .fromEvent(this.video, 'pause')
                        .mapTo({
                        player: this,
                        type: 'playstate',
                        isPlaying: false
                    }));
                    this.progress$ = facade_22.Observable
                        .fromEvent(this.video, 'timeupdate')
                        .map(function (_) {
                        var event = {
                            player: _this,
                            type: 'videoprogress',
                            time: _this.getCurrentTime()
                        };
                        return event;
                    });
                    this.loaded$ = facade_22.Observable
                        .fromEvent(this.video, 'progress')
                        .map(function (_) {
                        var event = {
                            player: _this,
                            type: 'loaded',
                            loaded: _this.getLoadedPercent()
                        };
                        return event;
                    });
                    this.seeking$ = facade_22.Observable
                        .fromEvent(this.video, 'seeking')
                        .map(function (_) {
                        var event = {
                            player: _this,
                            type: 'seeking'
                        };
                        return event;
                    });
                    this.seeked$ = facade_22.Observable
                        .fromEvent(this.video, 'seeked')
                        .map(function (_) {
                        var event = {
                            player: _this,
                            type: 'seeked'
                        };
                        return event;
                    });
                    // -------------------
                    // -     Rate     -
                    // -------------------
                    this.playbackRate$ = facade_22.Observable
                        .fromEvent(this.video, 'ratechange')
                        .map(function (_) {
                        var event = {
                            player: _this,
                            type: 'ratechange',
                            rate: _this.getPlaybackRate()
                        };
                        return event;
                    });
                    this.volumeState$ = facade_22.Observable
                        .fromEvent(this.video, 'volumechange')
                        .map(function (_) {
                        var event = {
                            player: _this,
                            type: 'volumechange',
                            volume: _this.getVolume(),
                            isMuted: _this.isMuted()
                        };
                        return event;
                    });
                    var $video = angular.element(this.video);
                    options.sources
                        .map(function (source) { return angular.element("<source src=\"" + source.src + "\" type=\"" + source.type + "\">"); })
                        .forEach(function (sourceElm) { return $video.append(sourceElm); });
                    angular.element(elm).replaceWith($video);
                }
                // -------------------
                // -     Loading     -
                // -------------------
                HTML5Player.prototype.load = function (_a) {
                    var sources = _a.sources;
                    // debugger;
                    // this.video.load();
                    // this.video.preload = 'metadata';
                    return facade_22.Observable
                        .fromEvent(this.video, 'loadedmetadata')
                        .mapTo(this);
                };
                // -------------------
                // -     Playing     -
                // -------------------
                HTML5Player.prototype.play = function () {
                    this.video.play();
                };
                HTML5Player.prototype.pause = function () {
                    this.video.pause();
                };
                HTML5Player.prototype.isPlaying = function () {
                    return !this.video.paused;
                };
                HTML5Player.prototype.getDuration = function () {
                    return this.video.duration;
                };
                HTML5Player.prototype.getCurrentTime = function () {
                    return this.video.currentTime;
                };
                // TODO: Aparently there is a bug when the video is already cached, and the buffered
                // returns empty or something (check progress bar)
                HTML5Player.prototype.getLoadedPercent = function () {
                    // Get the loaded ranges
                    var timeRange = this.video.buffered;
                    var end = Number.NEGATIVE_INFINITY;
                    for (var i = 0; i < timeRange.length; i++) {
                        var rangeEnd = timeRange.end(i);
                        end = Math.max(end, rangeEnd);
                    }
                    return end / this.getDuration() * 100;
                };
                ;
                HTML5Player.prototype.seekTo = function (sec) {
                    this.video.currentTime = sec;
                    return this.seeked$.take(1).toPromise();
                };
                HTML5Player.prototype.getPlaybackRate = function () {
                    return this.video.playbackRate;
                };
                HTML5Player.prototype.setPlaybackRate = function (rate) {
                    this.video.playbackRate = rate;
                };
                HTML5Player.prototype.getAvailablePlaybackRates = function () {
                    return [1, 1.25, 1.5, 1.75, 2];
                };
                // -------------------
                // -      Volume     -
                // -------------------
                HTML5Player.prototype.toggleMute = function () {
                    this.video.muted = !this.video.muted;
                };
                HTML5Player.prototype.isMuted = function () {
                    return this.video.muted || this.video.volume === 0;
                };
                HTML5Player.prototype.setVolume = function (volume) {
                    this.video.volume = volume / 100;
                    this.video.muted = volume === 0;
                };
                HTML5Player.prototype.getVolume = function () {
                    return this.video.muted ? 0 : this.video.volume * 100;
                };
                ;
                // -------------------
                // -  REFACTOR THIS  -
                // -------------------
                HTML5Player.prototype.setOverlayElement = function (elm) {
                    // TODO: Delete as soon as posible
                };
                HTML5Player.prototype.destroy = function () {
                };
                return HTML5Player;
            }());
            HTML5Player = __decorate([
                plain_model_2.PlainModel({
                    name: 'HTML5Player',
                }),
                __metadata("design:paramtypes", [HTML5Player, Object])
            ], HTML5Player);
            exports_48("HTML5Player", HTML5Player);
        }
    };
});
System.register("src/players/html5/html5-player.service", ["src/util/rx/facade", "src/players/html5/html5-player.model", "src/service/rx-video.service", "src/ng-helper/facade"], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    function loadPlayer(elm, options) {
        // TODO: Refactor to observables
        // Get the angular 1 injector
        return facade_23.getInjector()
            .then(function (injector) { return injector.get('HTML5Player'); })
            .then(function (HTML5Player) { return new HTML5Player(elm, options); })
            .then(function (player) { return player.ready$.take(1).toPromise(); });
    }
    exports_49("loadPlayer", loadPlayer);
    // TODO: This is so far equal to the YoutubePlayer fn
    function createVideoPlayer(options, $videoDiv) {
        return facade_24.Observable.create(function (observer) {
            options.height = options.height || '390';
            options.width = options.width || '640';
            // TODO: Need to see where to put this after refactor
            // this.elm.css('height', convertToUnits(options.height));
            // this.elm.css('width', convertToUnits(options.width));
            var player;
            loadPlayer($videoDiv, options).then(function (p) {
                player = p;
                // player.setOverlayElement($overlayElm); // TODO: do i need this?
                observer.next(player);
            });
            return function () {
                if (player) {
                    player.destroy();
                }
            };
        });
    }
    exports_49("createVideoPlayer", createVideoPlayer);
    var facade_24, html5_player_model_1, rx_video_service_3, facade_23, Factory;
    return {
        setters: [
            function (facade_24_1) {
                facade_24 = facade_24_1;
            },
            function (html5_player_model_1_1) {
                html5_player_model_1 = html5_player_model_1_1;
            },
            function (rx_video_service_3_1) {
                rx_video_service_3 = rx_video_service_3_1;
            },
            function (facade_23_1) {
                facade_23 = facade_23_1;
            }
        ],
        execute: function () {
            html5_player_model_1.HTML5Player; // Hack to make typescript fetch that file
            Factory = {
                createVideoPlayer: createVideoPlayer
            };
            rx_video_service_3.registerVideoPlayer('HTML5Player', Factory);
        }
    };
});
