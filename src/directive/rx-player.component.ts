// TODO: Move this into players folder
import {Observable, fromAngularWatch, observeScopeDestroy} from '../util/rx/facade';
// import {ReplaySubject} from 'rxjs/ReplaySubject';

import {Component, localTemplateVariableLink} from '../ng-helper/facade';

// TODO: Put all video interfaces in a facade
// import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';
import {IVideoPlayer} from '../service/video-player.model';
import {RxVideoInterface} from '../service/rx-video-interface.model';

import {createVideoPlayer} from '../service/rx-video.service';

// TODO: Try to redefine as an algebraic data type, but see if that can be extended
export interface IVideoSource {
    player: string;
    youtubeId: string; // TODO: THIS SHOULD NOT BE HERE!
    sources: any; // TODO: THIS SHOULD NOT BE HERE!
}

// YOUTUBE specifics, TODO: see how to refactor
const playerAttrs = ['id', 'height', 'width'];
const playerVarAttrs = ['autohide', 'autoplay', 'ccLoadPolicy', 'color', 'controls',
                        'disablekb', 'enablejsapi', 'end', 'fs', 'ivLoadPolicy',
                        'list', 'listType', 'loop', 'modestbranding', 'origin', 'playerapiid',
                        'playlist', 'playsinline', 'rel', 'showinfo', 'start', 'theme'];

@Component({
    selector: 'rxPlayer',
    templateUrl: '/template/directive/rx-player.component.html',
    transclude: true,
    link: localTemplateVariableLink,
    scope: {
        videoSource: '='
    },
})
export class RxPlayerComponent {
    player$: Observable<IVideoPlayer>;
    video: RxVideoInterface;

    static $inject = ['$element', '$attrs', '$scope'];

    constructor (private elm, private attrs, private scope) {
        // TODO: See why this was set. I remember something in the lines of not
        // providing css if not needed but this being some of the basics
        elm.css('position', 'relative');
        elm.css('display', 'block');

        // Save the overlay element in the controller so child directives can use it
        // TODO: check this out again
        this.setOverlayElement(elm);
        this.ngOnInit(); // TODO: Change once we migrate to ng 1.6
    }

    private $overlayElm;
    setOverlayElement (elm) {
        this.$overlayElm = elm;
    }

    getOverlayElement () {
        return this.$overlayElm;
    }

    private videoSource: IVideoSource;

    ngOnInit () {
        // TODO: Type this
        const $videoDiv: HTMLElement = this.elm[0].querySelector('.hr-yt-video-place-holder');
        // const $overlayElm = angular.element(this.elm[0].querySelector('.hr-yt-overlay'));

        const options: any = {
            playerVars: {}
        };

        // TODO: Specific to youtube, move where needed
        playerAttrs.forEach(name => {
            if (this.attrs.hasOwnProperty(name)) {
                options[name] = this.attrs[name];
            }
        });

        playerVarAttrs.forEach(name => {
            if (this.attrs.hasOwnProperty(name)) {
                options.playerVars[name] = this.attrs[name];
            }
        });

        // Watch whenever watchVideoSource changes
        const watchVideoSource$ = fromAngularWatch(() => this.videoSource, this.scope)
                                    .publishReplay(1)
                                    .refCount();

        const scopeDestroy$ = observeScopeDestroy(this.scope);
        // Recipe to create a video player
        // Whenever we have a video source
        this.player$ = watchVideoSource$
                        .map(source => ({
                            playerClass: source.player,
                            // TODO: Hardcoded to HTML5 sources :/
                            options: {...options, sources: source.sources}
                        }))
                        // Create a video player of the provided type
                        .switchMap(({playerClass, options}) =>
                             createVideoPlayer(playerClass, options, $videoDiv),
                        )
                        // Put in the stream both the player and the source
                        .withLatestFrom(watchVideoSource$, (player, source) => ({player, source}))
                        // Load the source and wait until the video is ready to play
                        .switchMap(({player, source}) => player.load(source))
                        .takeUntil(scopeDestroy$)
                        .publishReplay(1)
                        // .multicast(() => new ReplaySubject(1))
                        .refCount();

        // Suscribe to the observable to trigger the creation of the player
        this.player$.subscribe(
                () => {},
                error => console.error(`There was a problem loading the video player: ${error}`)
        );

        // TODO: I think I want to deprecate this in favour of having local controllers
        // with their own adaptors
        this.video = new RxVideoInterface(this.player$);

    }
}
/*
function convertToUnits (u: number|string): string {
    // If its numbers, interpret pixels
    if (typeof u === 'number' || /^\d+$/.test(u)) {
        return u + 'px';
    }
    return u;
}
*/
