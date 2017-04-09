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

    // select () {
    //     return this._state;
    // }


    select (): Observable<S>;
    select<K1 extends keyof S> (arg1: K1): Observable<S[K1]>;
    select<K1 extends keyof S, K2 extends keyof S[K1]> (arg1: K1, arg2: K2): Observable<S[K1][K2]>;
    select<K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2]> (arg1: K1, arg2: K2, arg3: K3): Observable<S[K1][K2][K3]>;
    select<K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2], K4 extends keyof S[K1][K2][K3]> (arg1: K1, arg2: K2, arg3: K3, arg4: K4): Observable<S[K1][K2][K3][K4]>;
    select<K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2], K4 extends keyof S[K1][K2][K3], K5 extends keyof S[K1][K2][K3][K4]> (arg1: K1, arg2: K2, arg3: K3, arg4: K4, arg5: K5): Observable<S[K1][K2][K3][K4][K5]>;
    select<K1 extends keyof S, K2 extends keyof S[K1], K3 extends keyof S[K1][K2], K4 extends keyof S[K1][K2][K3], K5 extends keyof S[K1][K2][K3][K4], K6 extends keyof S[K1][K2][K3][K4][K5]> (arg1: K1, arg2: K2, arg3: K3, arg4: K4, arg5: K5, arg6: K6): Observable<S[K1][K2][K3][K4][K5][K6]>;
    select (...args) {
        return this._state.map(state => {
            return args.reduce((subState, key) => {
                if (typeof subState === 'object') {
                    return subState[key];
                } else {
                    return subState;
                }
            }, state);
        }).distinctUntilChanged();
    }
}

export type IReducerMap<ST, A> = {
    [K in keyof ST]: IReducer<ST[K], A>;
};

export function combineReducers<ST, A> (reducers: IReducerMap<ST, A>): IReducer<ST, A> {
    return (state = {} as ST, action: A) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](state[key], action);
                return nextState;
            },
            {} as ST
        );
    };
}
