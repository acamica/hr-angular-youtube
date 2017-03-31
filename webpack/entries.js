const {
    root,
    node_modules,
    dist
} = require('./paths');

const path = require('path');

const demos = [
    // 'basic',
    'controls',
    // 'fullscreen',
    'html5-controls',
    'marker',
    'overlay',
    'overlay-html5',
];

const {zipObj} = require('ramda');



// I need to create something like this
// entries = {
//   'controls': ['./demo/controls/controls.component.ts', path.join(dist, '/rx-player-tpls.global.js')],
// }
// Function to create the path to the temo, ex './demo/controls/controls.component.ts'
const getDemoComponent = demo => path.join(root, `/demo/${demo}/${demo}.component.ts`)

// The templates file is always the same
const templates = path.join(dist, '/rx-player-tpls.global.js');

// Function to join them together
const createEntryList = demo => [getDemoComponent(demo), templates];

const entries = zipObj(demos, demos.map(createEntryList))
// 'controls': ['./demo/controls/controls.component.ts', path.join(dist, '/rx-player-tpls.global.js')],
// const

module.exports = entries;
