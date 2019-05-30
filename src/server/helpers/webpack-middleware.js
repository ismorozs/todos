const webpack = require('webpack');
const webpackConfig = require('../../../webpack.client.config')({ PORT: GLOBAL__PORT }, { mode: 'development' });
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, { publicPath: webpackConfig.output.publicPath });
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

module.exports = (app) => {
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
}
