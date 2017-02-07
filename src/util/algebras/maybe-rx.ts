import {Just, Nothing} from './maybe';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {_throw} from 'rxjs/observable/throw';

declare module './maybe' {
    // tslint:disable-next-line: interface-name
    interface Maybe<T> {
        toObservable (): Observable<T>;
    }
}

Just.prototype.toObservable = function () {
    return of(this.x);
};

Nothing.prototype.toObservable = function<T> () {
    return _throw<T>(null);
};
