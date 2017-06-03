import {Observable, fromAngularWatch, observeScopeDestroy} from '../util/rx/facade';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Component, localTemplateVariableLink} from '../ng-helper/facade';
import {createVideoPlayer} from '../players/player-factory.service';
import {
    IVideoPlayer,
    IVideoSource,
    IVideoOptions,
    IYoutubePlayerOptions,
    IHTML5PlayerOptions
} from '../players/video-player.model';



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

    constructor (private elm: ng.IAugmentedJQuery, private attrs: ng.IAttributes, private scope: ng.IScope) {
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
        const $videoDiv = this.elm[0].querySelector('.hr-yt-video-place-holder');
        // const $overlayElm = angular.element(this.elm[0].querySelector('.hr-yt-overlay'));



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
                            options: getOptionsFromAttrs(source.player, this.attrs)
                        }))
                        // Create a video player of the provided type
                        .switchMap(({playerClass, options}) =>
                             createVideoPlayer(playerClass, options, $videoDiv)
                                // .info('setting width and height')
                                .do(player => {
                                    // TODO: Need to see where to put this after refactor
                                    this.elm.css('display', 'block');
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
    // IHTML5PlayerOptions

const YTPlayerAttrs = ['id', 'height', 'width'];
const YTPlayerVarAttrs = ['autohide', 'autoplay', 'ccLoadPolicy', 'color', 'controls',
                        'disablekb', 'enablejsapi', 'end', 'fs', 'ivLoadPolicy',
                        'list', 'listType', 'loop', 'modestbranding', 'origin', 'playerapiid',
                        'playlist', 'playsinline', 'rel', 'showinfo', 'start', 'theme'];

function getYoutubeOptionsFromAttrs ($attrs: ng.IAttributes): IYoutubePlayerOptions {
    const options: IYoutubePlayerOptions = {
        player: 'YoutubePlayer',
        videoId: null,
        playerVars: {}
    };

    YTPlayerAttrs.forEach(name => {
        if ($attrs.hasOwnProperty(name)) {
            options[name] = $attrs[name];
        }
    });

    YTPlayerVarAttrs.forEach(name => {
        if ($attrs.hasOwnProperty(name)) {
            options.playerVars[name] = $attrs[name];
        }
    });
    return options;
}

const HTML5PlayerAttrs = ['height', 'width'];

function getHTML5OptionsFromAttrs ($attrs: ng.IAttributes): IHTML5PlayerOptions {
    const options: IHTML5PlayerOptions = {
        player: 'HTML5Player',
    };

    HTML5PlayerAttrs.forEach(name => {
        if ($attrs.hasOwnProperty(name)) {
            options[name] = $attrs[name];
        }
    });

    return options;
}

function getOptionsFromAttrs (player: string, $attrs: ng.IAttributes): IVideoOptions {
    switch (player) {
        case 'HTML5Player':
            return getHTML5OptionsFromAttrs($attrs);
        case 'YoutubePlayer':
            return getYoutubeOptionsFromAttrs($attrs);
    }
}
function convertToUnits (u: number|string): string {
    // If its numbers, interpret pixels
    if (typeof u === 'number' || /^\d+$/.test(u)) {
        return u + 'px';
    }
    return u;
}

