import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export interface IReducer<S, A> {
    (state: S, action?: A): S;
}

export interface IAction {
    type: string;
    payload?: any;
}

export class Store<S, A extends IAction> {
    private _dispacher = new Subject();
    private _state: Observable<S>;
    constructor (reducer: IReducer<S, A>) {
        this._state = this._dispacher
            // Starts with an initial action that shouldn't be mapped
            .startWith({type: 'INITIAL_ACTION'})
            .scan(reducer, undefined) // Pass undefined as accu/state so it can use the default
            .publishReplay(1).refCount();
    }

    dispatch (action: A) {
        this._dispacher.next(action);
    }

    select () {
        return this._state;
    }
}
