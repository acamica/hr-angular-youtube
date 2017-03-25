import {Observable} from 'rxjs/Observable';

export interface IFnMsg<T> {
    (x: T): string;
}

export type IMsgOrFnMsg<T> = string | IFnMsg<T>;

export function infoOperator<T> (this: Observable<T>, msgOrFnMsg: IMsgOrFnMsg<T>, thisArg?: any) {
    return this.do(x => {
        let msg: string;
        if (typeof msgOrFnMsg === 'string') {
            msg = msgOrFnMsg;
        } else {
            msg = msgOrFnMsg(x);
        }
        console.info(msg);
    });
}


Observable.prototype.info = infoOperator;

declare module 'rxjs/Observable' {
  // tslint:disable-next-line: interface-name
  interface Observable<T> {
    info: typeof infoOperator;
  }
}
