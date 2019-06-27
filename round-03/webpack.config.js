// web
const path = require('path');
module.exports = {
    entry: {
        'index': './src/web/assets/scripts/index.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'x-tag': 'node_modules/x-tag/dist/x-tag-polyfilled.js'
        }
    }
}