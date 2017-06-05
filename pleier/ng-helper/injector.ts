import module from './module';

const injectorPromise = new Promise<ng.auto.IInjectorService>(resolve => {
    const loadInjector = ($injector: ng.auto.IInjectorService) => resolve($injector);
    loadInjector.$inject = ['$injector'];
    module.run(loadInjector);
});

export function getService<T> (service: string): Promise<T> {
    return injectorPromise.then(injector => injector.get(service));
}

export function getInjector () {
    return injectorPromise;
}


