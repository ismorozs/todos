const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const settings = require('./settings');

module.exports = (env = {}, argv) => {
  const GLOBAL__PORT = env.PORT || settings.DEFAULT_PORT;
  const GLOBAL__API_URL = `'${env.API_URL || '/todos'}'`;
  const GLOBAL__VERSION_NUMBER = env.VERSION_NUMBER || settings.DEFAULT_VERSION_NUMBER;
  
  return {

    mode: argv.mode,

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: argv.mode === 'development',
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  autoprefixer({
                    browsers: [
                      "> 1%",
                      "last 2 versions",
                    ]
                  })
                ]
              }
            }
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            },
          ],
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
        GLOBAL__PORT,
        GLOBAL__API_URL,
        GLOBAL__VERSION_NUMBER
      })
    ]
  };
};
