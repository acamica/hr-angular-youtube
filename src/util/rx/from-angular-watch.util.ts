import {Observable} from 'rxjs/Observable';

export function fromAngularWatch<T> (property, scope): Observable<T> {
    return Observable.create(function (observer) {
        let oldVal: T;
        const unwatcher = scope.$watch(property, function(newVal: T) {
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
