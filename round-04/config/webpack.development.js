const { join } = require("path");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const setTitle = require("node-bash-title");
setTitle("🍺 开发环境");

module.exports = {
    //   output: {
    //     filename: "[name].bundle.js"
    //   },
    devServer: {
        contentBase: join(__dirname, "../dist"),
        quiet: true,
        hot: true
    },
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: "my project webpack build",
            suppressSuccess: true
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ["You application is running here http://localhost:8080"],
                notes: [
                    "Some additionnal notes to be displayed unpon successful compilation"
                ]
            },
            onErrors: function (severity, errors) {
                new WebpackBuildNotifierPlugin({
                    title: "错误提示❌" + errors.name,
                    suppressSuccess: true
                });
            }
        })
    ]
};
