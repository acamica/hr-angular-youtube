const path = require('path');
const {
    root,
    node_modules,
    dist
} = require('./webpack/paths');

const entries = require('./webpack/entries');
module.exports = {
    // entry: {
    //     'controls': ['./demo/controls/controls.component.ts', path.join(dist, '/rx-player-tpls.global.js')],
    //     'overlay-html5': ['./demo/overlay-html5/overlay-html5.component.ts', path.join(dist, '/rx-player-tpls.global.js')],
    // },
    entry: entries,
    output: {
        filename: '[name]-bundle.js',
        path: path.join(dist, '/demo')
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
                configFileName: path.join(root, '/tsconfig.json')
            },
            exclude: /node_modules/,
        }]
    },
    resolve: {
        alias: {
            'rx-player': path.join(root, '/rx-player'),
            'ui.bootstrap': path.join(node_modules, '/angular-ui-bootstrap/index.js')
        },
        extensions: [".ts", ".js"]
    },
};
