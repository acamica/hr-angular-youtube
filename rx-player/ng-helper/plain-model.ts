import module from './module';

export interface IServiceOptions {
    name: string;
    $inject?: any;
    onDepsLoad?: () => any;
}

export function PlainModel (options: IServiceOptions) {
    return function (target: any) {
        const ng1Injects = Object.keys(options.$inject || {});

        module.factory(options.name, factory);

        factory.$inject = ng1Injects;
        function factory (...deps: any[]) {
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
