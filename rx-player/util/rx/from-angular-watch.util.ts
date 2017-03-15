import {Observable} from 'rxjs/Observable';

export interface IWatchExpression<T> {
    (): T;
}
type IWatchProperty<T> = string | IWatchExpression<T>;
export function fromAngularWatch<T> (property: IWatchProperty<T>, scope): Observable<T> {
    return Observable.create(function (observer) {
        let oldVal: T;
        const unwatcher = scope.$watch(property, function (newVal: T) {
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
