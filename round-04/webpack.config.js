const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlAfterPlugin = require("./config/htmlAfterPlugin");
// 获取参数
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _module = argv.modules || 'nomodule';
console.log(argv.modules, "dev参数");
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _mergeModuleConfig = require(`./config/webpack.${_module}.js`);
const merge = require('webpack-merge');
const webpackConfig = {
    plugins: [
        new HtmlWebpackPlugin({
            template: _module == "nomodule" ? `src/index.html` : `dist/index.html`,
            filename: `index.html`
        }),
        new htmlAfterPlugin({
            isHack: true
        }),
    ]
}
// webpack 配置
module.exports = merge(_mergeConfig, webpackConfig, _mergeModuleConfig);