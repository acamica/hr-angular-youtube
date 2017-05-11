import * as angular from 'angular';
import {IMarker} from './marker.model';
import {IVideoPlayer} from '../players/video-player.model';
import {getService} from '../ng-helper/facade';

const $compile = getService<ng.ICompileService>('$compile');

export interface IBindingMap {
    [key: string]: any;
}


export class ComponentMarker implements IMarker {
    get startTime () {
        return this.options.startTime;
    }

    set startTime (time: number) {
        this.options.startTime = time;
    }

    get endTime () {
        return this.options.endTime;
    }

    set endTime (time: number) {
        this.options.endTime = time;
    }

    constructor (public options: IComponentMarkerOptions) {
    }

    private parentScope = this.options.parentScope ?
                                Promise.resolve(this.options.parentScope) :
                                getService<ng.IScope>('$rootScope');

    private elm: JQuery;
    private scope: ng.IScope;

    onStart (player: IVideoPlayer) {
        if (this.options.parentElm) {
            this.render({player, parentElm: this.options.parentElm});
        } else {
            // TODO: Improve error handling returning an either or a promise with possible errors
            //       making the user be responsible for the error
            console.error('Component marker needs a parent element', this.options.template);
        }
    }

    render (renderOptions: IRenderOptions) {
        // See which parent scope to use
        const parentScope = renderOptions.parentScope ?
            Promise.resolve(renderOptions.parentScope) : this.parentScope;

        // Construct the bindings
        const bindings = {...this.options.bindings, ...renderOptions.bindings};

        // Add the element where its supposed to be and compile it
        this.elm = angular.element(this.options.template);
        renderOptions.parentElm.append(this.elm);
        const componentLinkFn = $compile.then($compile => $compile(this.elm));

        // Once its compiled
        Promise.all([componentLinkFn, parentScope])
            .then(([linkFn, parentScope]) => {
                // create a new scope for it and link it
                this.scope = parentScope.$new(true);
                // Bind the player to the scope
                this.scope['$player'] = renderOptions.player;
                // Add optional bindings to the scope
                Object
                    .keys(bindings || {})
                    .forEach(key => this.scope[key] = this.options.bindings[key]);
                linkFn(this.scope);
            })
            .catch(err => console.error('Cant create marker component', err));
    }

    onEnd (player: IVideoPlayer) {
        if (this.elm !== null) {
            this.scope.$destroy();
            this.elm.remove();
            this.scope = null;
            this.elm = null;
        }
    }

}
export interface IRenderOptions {
    player: IVideoPlayer;
    parentElm: JQuery;
    parentScope?: ng.IScope;
    bindings?: IBindingMap;
}

export interface IComponentMarkerOptions {
    startTime: number;
    endTime: number;
    template: string;
    parentElm?: JQuery;
    parentScope?: ng.IScope;
    bindings?: IBindingMap;
}

