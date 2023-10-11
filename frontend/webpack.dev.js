const { merge } = require('webpack-merge');
const common = require('./webpack.common');

/**
 * Webpack dev config
 * @type {import('webpack').Configuration}
 */
module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[contenthash].js',
  },
});
