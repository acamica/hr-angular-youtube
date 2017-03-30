function getter (accesor: string) {
    const parts = accesor.split('.');
     function doGet (obj: any, p: string[]) {
        if (obj === undefined || p.length === 0) {
            return obj;
        }
        return doGet(obj[p[0]], p.slice(1));
    }
    return (obj) => doGet(obj, parts);
}

function watchAndCall (watchers: string[], hook: string) {
    return function (scope: ng.IScope, elm, attr, ctrls) {
        const ctrl = ctrls[0];
        const watcherGetter = watchers.map(w => getter(w));
        if (typeof ctrl[hook] !== 'function') {
            if (ctrl.constructor && ctrl.constructor.name) {
                console.warn(`Warning: ${ctrl.constructor.name} doens't have a lifecycle method called ${hook}`);
            } else {
                console.warn(`Warning: component doens't have a lifecycle method called ${hook}`, ctrl);
            }
        }

        const u = scope.$watch(function () {
            // if (hook === 'ngAfterContentInit') console.log('hey', scope);
            for (let i = 0; i < watchers.length; i++) {
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
export function mockNgOnInitLink (watchers: string[]) {
    return watchAndCall(watchers, 'ngOnInit');
}

/**
 * Waits until all watchers are not falsy and calls ngAfterViewInit on the
 * the controller.
 * See http://learnangular2.com/lifecycle/
 * This link function assumes:
 *      * The component's require definition is an array and its first value is the component ctrl
 *      * The components ctrl has a method ngAfterViewInit
 */
export function mockNgAfterViewInit (watchers: string[]) {
    return watchAndCall(watchers, 'ngAfterViewInit');
}

/**
 * Waits until all watchers are not falsy and calls ngAfterViewInit on the
 * the controller.
 * See http://learnangular2.com/lifecycle/
 * This link function assumes:
 *      * The component's require definition is an array and its first value is the component ctrl
 *      * The components ctrl has a method ngAfterViewInit
 */
export function mockNgAfterContentInit (watchers: string[]) {
    return watchAndCall(watchers, 'ngAfterContentInit');
}


export function mockNgOnInitFromAttr (attribute: string) {
    return function (scope, elm, attr, ctrls) {
        const u = scope.$watch(attr[attribute], function (attributeWatched) {
            if (typeof attributeWatched !== 'undefined') {
                u();
                ctrls[0]['ngOnInit']();
            }
        });
    };
}
