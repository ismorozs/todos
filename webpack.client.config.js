const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelMinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');
const settings = require('./settings');

module.exports = (env = {}, argv) => {
  const GLOBAL__VERSION_NUMBER = env.VERSION_NUMBER || settings.DEFAULT_VERSION_NUMBER;
  const config = require('./webpack.common.config')(env, argv);

  config.devServer = {
    contentBase: './dist',
    historyApiFallback: {
      index: 'index.html'
    },
    hot: true,
    stats: {
      colors: true,
    }
  };

  config.devtool = 'cheap-module-eval-source-map';

  config.entry = ['./src/client/index.js'];

  config.output = {
    filename: '[name]' + GLOBAL__VERSION_NUMBER + '.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  };

  config.plugins.push(new MiniCssExtractPlugin({ filename: '[name]' + GLOBAL__VERSION_NUMBER + '.css' }));

  config.module.rules.push({ test: /\.ejs$/, loader: 'ejs-compiled-loader' });

  if (argv.mode !== 'production') {
    config.entry.unshift('webpack-hot-middleware/client');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (argv.mode === 'production') {
    config.devtool = false;
    config.plugins.push(
      new OptimizeCssAssetsPlugin(),
      new babelMinifyPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src') + '/index.ejs',
        templateParameters: {
          content: '',
          preloadedState: '',
          stylesTag: '',
          scriptTag: '',
        }
      })
    );
  }

  return config;
};
