const webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

module.exports = () => {

  const plugins = [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
        filename: "index.html"
      })
  ];

  const devServer = {
    hot: true,
    public: 'biggles.live',
    historyApiFallback: true,
    port: process.env.CLIENT_PORT || 8080,
    proxy: {
      '/api': {
        target: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}`,
        pathRewrite: {'^/api': ''}
      }
    }
  }

  return {
    entry: path.join(__dirname, "src", "index.js"),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
          loader: "file-loader?name=[name].[ext]",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    plugins: plugins,
    devServer: devServer
  }
};
