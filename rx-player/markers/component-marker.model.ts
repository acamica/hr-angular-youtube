import * as angular from 'angular';
import {IMarker} from './marker.model';
import {IVideoPlayer} from '../players/video-player.model';
import {getService} from '../ng-helper/facade';

const $compile = getService<ng.ICompileService>('$compile');

export interface IComponentMarkerOptions {
    startTime: number;
    endTime: number;
    template: string;
    parentElm: JQuery;
    parentScope?: ng.IScope;
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



    constructor (private options: IComponentMarkerOptions) {
    }


    private parentScope = this.options.parentScope ?
                                Promise.resolve(this.options.parentScope) :
                                getService<ng.IScope>('$rootScope');

    private elm: JQuery;
    private scope: ng.IScope;

    onStart (player: IVideoPlayer) {
        // Add the element where its supposed to be and compile it
        this.elm = angular.element(this.options.template);
        this.options.parentElm.append(this.elm);
        const componentLinkFn = $compile.then($compile => $compile(this.elm));

        // Once its compiled
        Promise.all([componentLinkFn, this.parentScope])
            .then(([linkFn, parentScope]) => {
                // create a new scope for it and link it
                this.scope = parentScope.$new(true);
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
