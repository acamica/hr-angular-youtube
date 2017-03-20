import {Observable} from '../util/rx/facade';
import {IVideoPlayer} from '../players/video-player.model';
import {Maybe} from '../util/algebras/maybe';
import '../util/algebras/maybe-rx';
export interface IPlayerFactory<T extends IVideoPlayer> {
    createVideoPlayer (options, elm): Observable<T>;
}

// TODO: replace with angular injector
interface IPlayerRegistry {
    [name: string]: IPlayerFactory<any>;
}

const Registry: IPlayerRegistry = {};

export function registerVideoPlayer<T extends IVideoPlayer>
                    (name: string, player: IPlayerFactory<T>) {
    Registry[name] = player;
}

export function createVideoPlayer<T extends IVideoPlayer> (
                    name: string,
                    options: any,
                    videoDiv$: HTMLElement
                ): Observable<T> {
    return Maybe
                .fromNullable(Registry[name] as IPlayerFactory<T>)
                .toObservable()
                .switchMap(factory => factory.createVideoPlayer(options, videoDiv$))
                .catch(_ => Observable.throw(`Video player "${name}" not found`));
}

