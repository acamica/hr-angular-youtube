import {Observable} from 'rxjs/Observable';
import {takeUntil} from 'rxjs/Operator/takeUntil';

export function takeUntilScopeDestroy<T> (scope: ng.IScope, that: Observable<T>): Observable<T> {
    const notifier$: Observable<any> = Observable.create(function (observer) {
        scope.$on('$destroy', function () {
            observer.next();
            observer.complete();
        });
    });
    return takeUntil.call(that, notifier$);
}
