import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

export type IWatchExpression<T> = () => T;

export type IWatchProperty<T> = string | IWatchExpression<T>;

export function fromAngularWatch<T> (property: IWatchProperty<T>, scope: any): Observable<T> {
    return Observable.create(function (observer: Observer<T>) {
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
