import * as angular from 'angular';
import './module';

const injectorPromise = new Promise<ng.auto.IInjectorService>(resolve => {
    const loadInjector = ($injector) => resolve($injector);
    loadInjector.$inject = ['$injector'];
    angular
        .module('rxPlayer')
        .run(loadInjector);
});

export function getInjector () {
    return injectorPromise;
}
// angular.module('ng')

// const imports = {
//     $http: undefined as ng.IHttpService
// };

// @PlainModel({
//     name: 'TypedRecordRestUtils',
//     $inject: imports
// })
// export class TypedRecordRestUtils {} // Fix the way we use angular 1 injections in this cases


// // Create a deferred $http function
// export function $http<T> (url: ng.IRequestConfig): ng.IHttpPromise<T> {
//     // return Maybe.fromNullable(imports.$http)
//     //             .toPromise()
//     //             .catch(_ => {
//     //                 console.log('Imports not load');
//     //                 return (any) => Promise.resolve(null);
//     //                 // return Promise.reject('Imports not load');
//     //             })
//     //             .then($http => $http<T>(url));
//     return imports.$http<T>(url);
// }
