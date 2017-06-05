import module from './module';

export interface IDirectiveDefinition {
    selector: string;
    providers?: any[];
    link?: ng.IDirectiveLinkFn;
    require?: string[];
    directives?: any[];
    multiElement?: boolean;
    transclude?: boolean|'element';
    priority?: number;
    terminal?: boolean;
    // TODO: See if delete after refactoring the repeat directives
    template?: string | ((tElement: JQuery, tAttrs: ng.IAttributes) => string);
    replace?: boolean;

}

export function Directive (definition: IDirectiveDefinition) {
    return function (target: any) {
        module.directive(definition.selector, function () {
                let require = [definition.selector];
                if (definition.require) {
                    require = require.concat(definition.require);
                }

                const directive: ng.IDirective = {
                    restrict: 'A',
                    controller: target,
                    link: definition.link,
                    multiElement: definition.multiElement,
                    transclude: definition.transclude,
                    priority: definition.priority,
                    terminal: definition.terminal,
                    require,
                    // TODO: REMOVE
                    replace: definition.replace,
                    template: definition.template
                };
                return directive;
            });
    };
}
