const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin' );
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env = {}, argv) => {
  const config = require('./webpack.common.config')(env, argv);

  config.target = 'node';

  config.entry = './src/server/index.js';

  config.output = {
    filename: 'server.js',
    path: __dirname,
  };

  config.node = {
    __filename: true,
    __dirname: true
  };

  config.externals = [nodeExternals()];

  config.module.rules.push({ test: /\.ejs$/, loader: 'html-loader' });

  config.plugins.push(
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname, 'src', 'client')
    ]),
    new MiniCssExtractPlugin({
      filename: './dist/[name]_dev_.css',
    })
  );

  if (argv.mode !== 'production') {
    config.output.filename = 'serverDev.js';

    config.plugins.push(new NodemonPlugin({
      script: './serverDev.js',
    }));
  }

  return config;
};
