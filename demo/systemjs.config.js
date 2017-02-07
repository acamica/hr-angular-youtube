SystemJS.config({
    packages:{
        '/src': {
            defaultExtension: 'ts',
        },
        '/demo': {
            defaultExtension: 'ts',
        },

        '/node_modules/rxjs': {
            // defaultExtension: 'js',
        }
    },
    map: {
        src: '/src',
        angular: '/node_modules/angular/angular.js',
        rxjs: '/node_modules/rxjs',
        'rxPlayerTpl': '/dist/templates.js',
        'ui.bootstrap': '/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    },
    meta: {
        'angular': {
            format: 'global',
            exports: 'angular'
        },
        'ui.bootstrap': {
            format: 'global'
        },
        'rxPlayerTpl': {
            format: 'global'
        }
    },
    transpiler: 'typescript'
});
