import * as angular from 'angular';

export interface IServiceOptions {
    name: string;
    $inject?: any;
    onDepsLoad?: () => any;
}

export function PlainModel (options: IServiceOptions) {
    return function (target) {
        const ng1Injects = Object.keys(options.$inject || {});

        angular
            .module('rxPlayer')
            .factory(options.name, factory);

        factory.$inject = ng1Injects;
        function factory (...deps) {
            ng1Injects.forEach((dep, i) => {
                options.$inject[dep] = deps[i];
            });
            if (options.onDepsLoad) {
                options.onDepsLoad();
            }
            return target;
        }
    };
}
