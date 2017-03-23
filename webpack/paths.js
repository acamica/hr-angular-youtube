const path = require('path');
const root = path.resolve(__dirname, '../');
const node_modules = path.join(root, '/node_modules');
const dist = path.join(root, '/dist');

module.exports = {
    root, node_modules, dist
}
