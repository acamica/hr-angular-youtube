var path = require('path');
var node_modules = path.resolve(__dirname, '../../node_modules/')
module.exports = {
  entry: {
      main: ['./overlay.component.ts', '../../dist/rx-player-tpls.global.js']
  },
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
   rules: [
     {
       test: /\.ts$/,
       loader: 'ts-loader',
       options: {
          configFileName: path.resolve(__dirname, '../../tsconfig.json')
        },
       exclude: /node_modules/,
     },
   ]
  },
  resolve: {
   alias: {
       'rx-player': path.resolve(__dirname, '../../dist/cjs'),
       'ui.bootstrap': path.resolve(node_modules, 'angular-ui-bootstrap/index.js')
   },
   extensions: [".ts", ".js"]
 },
};
