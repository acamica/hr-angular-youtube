import {Component, bindRequireToCtrl} from 'src/ng-helper/facade';
import * as angular from 'angular';

const playerAttrs = ['id', 'height', 'width'];
const playerVarAttrs = ['autohide', 'autoplay', 'ccLoadPolicy', 'color', 'controls',
                        'disablekb', 'enablejsapi', 'end', 'fs', 'ivLoadPolicy',
                        'list', 'listType', 'loop', 'modestbranding', 'origin', 'playerapiid',
                        'playlist', 'playsinline', 'rel', 'showinfo', 'start', 'theme'];

@Component({
    selector: 'youtubePlayer',
    templateUrl: '/template/directive/youtube-player.component.html',
    transclude: true,
    link: bindRequireToCtrl(['ngModelCtrl']),
    scope: {
        videoId: '='
    },
    require: ['?ngModel']
})
// TODO: Refacto Heavily
export class YoutubePlayerComponent {
    private player: any;

    static $inject = ['$element', '$attrs', '$scope', 'youtube', '$q'];

    constructor (private elm, private attrs, private scope, private youtube, private $q) {
        this.player = $q.defer();

        elm.css('position', 'relative');
        elm.css('display', 'block');

        // Save the overlay element in the controller so child directives can use it
        // TODO: check this out again
        this.setOverlayElement(elm);
        this.ngOnInit();


    }

    // FROM ex controller
    setPlayer (p) {
        this.player.resolve(p);
    }

    getPlayer () {
        return this.player.promise;
    }
    destroyPlayer () {
        this.player.promise.then(function(p) {
            p.destroy();
        });
        this.player = this.$q.defer();
    }

    private $overlayElm;
    setOverlayElement (elm) {
        this.$overlayElm = elm;
    }

    getOverlayElement () {
        return this.$overlayElm;
    }

    private $videoElm = null;


    getVideoElement () {
        if (this.$videoElm === null) {
            this.$videoElm = angular.element(this.getOverlayElement()[0].querySelector('.hr-yt-video-place-holder'));
        }
        return this.$videoElm;
    };

    // FROM ex LINK
    private ngModelCtrl: any;
    private videoId: string;

    ngOnInit() {
        const $videoDiv = this.elm[0].querySelector('.hr-yt-video-place-holder');
        const $overlayElm = angular.element(this.elm[0].querySelector('.hr-yt-overlay'));

        const options: any = {
            playerVars: {}
        };

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

        // See if there is a specific player
        const playerFactoryName = this.attrs.playerFactory || 'YoutubePlayer';

        let instanceCreated = false;
        const createVideo = () => {
            instanceCreated = true;
            options.videoId = this.videoId;
            if (!options.hasOwnProperty('width') && !options.hasOwnProperty('height') ) {
                options.height = '390';
                options.width = '640';
            }
            this.elm.css('height',convertToUnits(options.height));
            this.elm.css('width',convertToUnits(options.width));


            this.youtube.loadPlayer(playerFactoryName, $videoDiv, options).then(player => {
                this.setPlayer(player);

                player.setOverlayElement($overlayElm);

                // TODO: I dont like this
                if (typeof this.ngModelCtrl !== 'undefined') {
                    this.ngModelCtrl.$setViewValue(player);
                }
                return player;
            });

        };

        this.scope.$watch(() => this.videoId , id => {
            if (typeof id === 'undefined') {
                return;
            }
            if (!instanceCreated) {
                createVideo();
            } else {
                this.getPlayer().then(function(p){
                    p.loadVideoById(id);
                });
            }
        });


        let aspectRatio = 16 / 9;

        // Maybe add some sort of debounce, but without adding a dependency
        const resizeWithAspectRatio = () => {
            if (options.height) {
                const w = Math.round(this.elm[0].clientHeight * aspectRatio);
                this.elm.css('width', convertToUnits(w));

            } else if (options.width) {
                const h = Math.round(this.elm[0].clientWidth / aspectRatio);
                this.elm.css('height', convertToUnits(h));
            }
        };

        if (this.attrs.hasOwnProperty('keepAspectRatio')) {

            // If aspect ratio is a string like '16:9', set the proper variable.
            const aspectMatch = this.attrs.keepAspectRatio.match(/^(\d+):(\d+)$/);
            if (aspectMatch) {
                aspectRatio = aspectMatch[1] / aspectMatch[2];
            }

            angular.element(window).bind('resize', resizeWithAspectRatio);
            // If the window or the element size changes, resize the element
            let unit = 0;
            this.scope.$watch(() => {
                let newUnit = 0;
                if (options.height) {
                    newUnit = this.elm[0].clientHeight;
                } else {
                    newUnit = this.elm[0].clientWidth;
                }
                if (unit !== newUnit && newUnit !== 0) {
                    setTimeout(() => {
                        this.scope.$apply(resizeWithAspectRatio);
                    });
                    unit = newUnit;
                }
            });

        }

        this.scope.$on('$destroy', function() {
            this.destroyPlayer();
            instanceCreated = false;
            if (typeof this.ngModelCtrl !== 'undefined') {
                this.ngModelCtrl.$setViewValue(undefined);
            }

            angular.element(window).unbind('resize', resizeWithAspectRatio);
        });

    }
}
function convertToUnits(u: number|string): string {
    // If its numbers, interpret pixels
    if (typeof u === 'number' || /^\d+$/.test(u)) {
        return u + 'px';
    }
    return u;
}
