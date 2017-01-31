/**
 * It finds the element attributes and tries to find one that starts with #,
 * when it does, it ties the controller to the parent scope.
 * This link function assumes:
 *      * The component's require definition is an array and its first value is the component ctrl
 *      * The scope is isolated
 *
 * The local variable needs to be named in kebab case like this
 *
 *      <component #this-long-variable> </component>
 *
 * instead of
 *
 *      <component #thisLongVariable> </component>
 *
 * Thats because of how angular 1 lowercases the element attribute names
 * When consumed, it must be used in camelCase, like this
 * <div ng-if="thisLongVariable.foo"></div>
 * where foo can be a property of the component controller
 */
export function localTemplateVariableLink(scope: ng.IScope, elm, attr: ng.IAttributes, ctrl) {
    // Get the attributes that comply to the local template variable format
    getLocalTemplateVariables(attr)
        // Set this controller to the the parents scope and parent controller
        .forEach(a => applyToScopeAndCtrl(a, scope.$parent, ctrl[0]));
}

/**
 * This helper function is equal to 'localTemplateVariableLink' but thinked for directives
 * instead of components
 */
export function directiveLocalTemplateVariableLink(scope: ng.IScope, elm, attr: ng.IAttributes, ctrl) {
    // Get the attributes that comply to the local template variable format
    getLocalTemplateVariables(attr)
        // Set this controller to the  scope and the scope controllers
        .forEach(a => applyToScopeAndCtrl(a, scope, ctrl[0]));
}

function applyToScopeAndCtrl(attr: string, scope: ng.IScope, ctrl) {
    // Add it to scope
    scope[attr] = ctrl;
    // See if there is a ctrl variable in scope and add it there
    if (typeof scope['ctrl'] === 'object') {
        scope['ctrl'][attr] = ctrl;
    }
}
function getLocalTemplateVariables(attr) {
    // Convert the attributes to array
    return Object.keys(attr)
        // Filter the ones starting with #
        .filter(a => a[0] === '#')
        // Remove the # from the attribute
        .map(a => a.slice(1));
}
