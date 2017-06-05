import {composeLinkFn, IDirectiveLinkFn} from './compose-link';
import {mockNgOnInitLink} from './lifecycle';
/**
 * Used as directive link function
 * when you use a require to get controllers, this function saves the controllers inside
 * the self controller as in Angular 1.5^.
 * Expects the first require element to be self controller
 * and the parameters are the name with wich each module is going to be save in self ctrl
 * Example:
 * {
 *     require: ['acExample', 'acAnother', '^acAnotherParent'],
 *     link: AC.bindRequireToCtrl(['anotherCtrl', 'anotherParentCtrl'])
 * }
 */
export function bindRequireToCtrl (ctrlsAliases: string[]): IDirectiveLinkFn {
    return (scope, elm, attrs, ctrls) => {
        const mainCtrl = ctrls[0];
        ctrls.splice(1).forEach((ctrl: any, index: number) => {
            if (ctrl) {
                mainCtrl[ctrlsAliases[index]] = ctrl;
            }
        });
    };
}

export function bindToCtrlCallOnInit (ctrls: string[]): IDirectiveLinkFn {
    return composeLinkFn([
        bindRequireToCtrl(ctrls),
        mockNgOnInitLink(ctrls)
    ]);
}
