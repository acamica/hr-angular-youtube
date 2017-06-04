import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

export function observeScopeDestroy (scope: ng.IScope) {
    return Observable.create(function (observer: Observer<void>) {
        return scope.$on('$destroy', function () {
            observer.next(null);
            observer.complete();
        });
    });
}
