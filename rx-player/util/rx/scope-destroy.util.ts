import {Observable} from 'rxjs/Observable';

export function observeScopeDestroy (scope: ng.IScope) {
    return Observable.create(function (observer) {
        return scope.$on('$destroy', function () {
            observer.next();
            observer.complete();
        });
    });
}
