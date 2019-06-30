module.exports = {
  output: {
      filename: "[name].bundle.js"
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
  }
};
