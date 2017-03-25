import {Observable} from 'rxjs/Observable';

export interface IFnMsg<T> {
    (x: T): string;
}

export type IMsgOrFnMsg<T> = string | IFnMsg<T>;

export function debugOperator<T> (this: Observable<T>, msgOrFnMsg: IMsgOrFnMsg<T>, thisArg?: any) {
    // return this.lift(new TakeUntilScopeDestroyOperator(scope, thisArg));
    // TODO: Change the way this is done.
    return this.do(x => {
        if (typeof msgOrFnMsg === 'string') {
            console.debug(msgOrFnMsg, x);
        } else {
            console.debug(msgOrFnMsg(x));
        }
    });
}

export function debugErrorOperator<T> (this: Observable<T>, msgOrFnMsg: IMsgOrFnMsg<T>, thisArg?: any) {
    // return this.lift(new TakeUntilScopeDestroyOperator(scope, thisArg));
    // TODO: Change the way this is done.
    return this.do(() => {}, x => {
        if (typeof msgOrFnMsg === 'string') {
            console.debug(msgOrFnMsg, x);
        } else {
            console.debug(msgOrFnMsg(x));
        }
    });
}
export function debugCompletedOperator<T> (this: Observable<T>, msg: string, thisArg?: any) {
    // return this.lift(new TakeUntilScopeDestroyOperator(scope, thisArg));
    // TODO: Change the way this is done.
    return this.do(() => {}, () => {}, () => {
        console.debug(msg);
    });
}


Observable.prototype.debug = debugOperator;
Observable.prototype.debugError = debugErrorOperator;
Observable.prototype.debugCompleted = debugCompletedOperator;


declare module 'rxjs/Observable' {
  // tslint:disable-next-line: interface-name
  interface Observable<T> {
    debug: typeof debugOperator;
    debugError: typeof debugErrorOperator;
    debugCompleted: typeof debugCompletedOperator;
  }
}
