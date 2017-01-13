import * as angular from 'angular';
import './module';

export interface IComponentDefinition {
    selector: string;
    template?: string | ((tElement: JQuery, tAttrs: ng.IAttributes) => string);
    templateUrl?: string;
    providers?: any[];
    scope?: any;
    link?: ng.IDirectiveLinkFn;
    require?: string[];
    directives?: any[];
    transclude?: 'element'|boolean;
}
export function Component(definition: IComponentDefinition) {

    return function (target) {
        angular
            .module('hrAngularYoutube')
            .directive(definition.selector, function () {
                let require = [definition.selector];
                if (definition.require) {
                    require = require.concat(definition.require);
                }

                let scope = {...definition.scope};

                let component: ng.IDirective = {
                    restrict: 'E',
                    templateUrl: definition.templateUrl,
                    template: definition.template,
                    scope: scope,
                    controllerAs: 'ctrl',
                    controller: target,
                    bindToController: true,
                    link: definition.link,
                    transclude: definition.transclude,
                    require
                };


                return component;
            });
    };
}
