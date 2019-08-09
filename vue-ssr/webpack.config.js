const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _module = argv.modules || 'nomodule';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
// const _mergeModuleConfig = require(`./config/webpack.${_module}.js`);
const merge = require('webpack-merge');
const glob = require('glob');
const files = glob.sync('./src/web/views/**/*.entry.js');
const _plugins = [];

const webpackConfig = {
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
        ..._plugins
    ]
}
// webpack 配置
// module.exports = merge(_mergeConfig, webpackConfig, _mergeModuleConfig);
module.exports = merge(_mergeConfig, webpackConfig);

