export type IDirectiveLinkFn =
    (
        scope?: ng.IScope,
        instanceElement?: ng.IAugmentedJQuery,
        instanceAttributes?: ng.IAttributes,
        controller?: any,
        transclude?: ng.ITranscludeFunction
    ) => void;

/**
 * Calls multiple link functions
 */
export function composeLinkFn (links: IDirectiveLinkFn[]): IDirectiveLinkFn {
    return function (scope, elm, attr, ctrl, trans) {
        links.forEach(link => link.call(this, scope, elm, attr, ctrl, trans));
    };
}
