import {Observable} from 'rxjs/Observable';
import {IVideoPlayer} from 'src/service/video-player.model';
import {Maybe} from 'src/util/algebras/maybe';
import 'src/util/algebras/maybe-rx';
export interface IPlayerFactory<T extends IVideoPlayer> {
    createVideoPlayer(options, elm): Observable<T>;
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

export function createVideoPlayer<T extends IVideoPlayer>(
                    name: string,
                    options: any,
                    videoDiv$: any
                ): Observable<T> {

    return Maybe
                .fromNullable(Registry[name] as IPlayerFactory<T>)
                .toObservable()
                .switchMap(factory => factory.createVideoPlayer(options, videoDiv$))
                .catch(_ => Observable.throw(`Video player "${name}" not found`));
}

