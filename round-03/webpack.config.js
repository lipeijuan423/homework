const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlAfterPlugin = require("./config/htmlAfterPlugin");
const { join } = require("path");
// 获取参数
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _module = argv.modules || 'nomodule';
console.log(argv.modules, "dev参数");
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
// const _mergeModuleConfig = require(`./config/webpack.${_module}.js`);
const merge = require('webpack-merge');
const _entry = {}
const glob = require('glob');
const files = glob.sync('./src/web/views/**/*.entry.js');
const _plugins = [];
for(let item of files){
    // console.log(item, 'item')
    // entry的所有文件名
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
        const entryKey = RegExp.$1;
        const [dist, template] = entryKey.split("-");
        _entry[entryKey] = item;
        _plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/web/views/${dist}/pages/${template}.html`,
            inject: false,
            chunks: [entryKey] // 打包固定的entry, 不然就是全部
        }));
    }
}
const webpackConfig = {
    entry: _entry,
    output: {
        path: join(__dirname, "./dist/assets"), // join is not func
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /(node_modules)/,
                use: {
                    // ?cacheDirectory: true 编译快
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"] // 配置babel, js级别
                    }
                }
            }
        ]
    },
    plugins: [
        ..._plugins,
        new htmlAfterPlugin({
            isHack: true
        }),
    ]
}
// webpack 配置
// module.exports = merge(_mergeConfig, webpackConfig, _mergeModuleConfig);
module.exports = merge(_mergeConfig, webpackConfig);

