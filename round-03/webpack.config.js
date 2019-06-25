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
            xTag: path.resolve(__dirname, 'node_modules/x-tag/dist/')
        }
    }
}