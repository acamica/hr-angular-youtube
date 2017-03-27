// TODO: Move this into players folder
import {Observable, fromAngularWatch, observeScopeDestroy} from '../util/rx/facade';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {Component, localTemplateVariableLink} from '../ng-helper/facade';

// TODO: Put all video interfaces in a facade
// import {YoutubePlayer} from 'src/players/youtube/youtube-player.model';

import {IVideoPlayer} from '../players/video-player.model';

import {createVideoPlayer} from '../players/player-factory.service';

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
    templateUrl: '/template/players/rx-player.component.html',
    transclude: true,
    link: localTemplateVariableLink,
    scope: {
        videoSource: '='
    },
})
export class RxPlayerComponent {
    player$: Observable<IVideoPlayer>;

    static $inject = ['$element', '$attrs', '$scope'];

    constructor (private elm, private attrs, private scope) {
        // TODO: See why this was set. I remember something in the lines of not
        // providing css if not needed but this being some of the basics
        elm.css('position', 'relative');
        elm.css('display', 'block');

        // Save the overlay element in the controller so child directives can use it
        // TODO: check this out again
        this.setOverlayElement(elm);
    }

    private $overlayElm;
    setOverlayElement (elm) {
        this.$overlayElm = elm;
    }

    getOverlayElement () {
        return this.$overlayElm;
    }

    private videoSource: IVideoSource;

    $onInit () {
        // TODO: Type this
        const $videoDiv: HTMLElement = this.elm[0].querySelector('.hr-yt-video-place-holder');
        // const $overlayElm = angular.element(this.elm[0].querySelector('.hr-yt-overlay'));

        // TODO: Fix this options
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
                        // .debug('new video source')
                        .map(source => ({
                            playerClass: source.player,
                            // TODO: Hardcoded to HTML5 sources :/
                            options: {...options, sources: source.sources}
                        }))
                        // Create a video player of the provided type
                        .switchMap(({playerClass, options}) =>
                             createVideoPlayer(playerClass, options, $videoDiv)
                                // .info('setting width and height')
                                .do(player => {
                                    // TODO: Need to see where to put this after refactor
                                    this.elm.css('height', convertToUnits(player.options.height));
                                    this.elm.css('width', convertToUnits(player.options.width));
                                }),
                        )
                        // Put in the stream both the player and the source
                        .withLatestFrom(watchVideoSource$, (player, source) => ({player, source}))
                        // Load the source and wait until the video is ready to play
                        .switchMap(({player, source}) => player.load(source))
                        // .info('Video loaded :)')
                        .takeUntil(scopeDestroy$)
                        // .publishReplay(1)
                        .multicast(() => new ReplaySubject(1))
                        .refCount();

        // Suscribe to the observable to trigger the creation of the player
        this.player$.subscribe(
                () => {},
                error => console.error(`There was a problem loading the video player: ${error}`)
        );
    }
}

function convertToUnits (u: number|string): string {
    // If its numbers, interpret pixels
    if (typeof u === 'number' || /^\d+$/.test(u)) {
        return u + 'px';
    }
    return u;
}

