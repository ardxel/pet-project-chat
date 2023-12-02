const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
/**
 * Webpack prod config
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[fullhash].js',
    chunkFilename: '[name].[id].[chunkhash].js',
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: [/test\.[jt]sx?$/, /.*\/__mocks__\/.*/, path.resolve(__dirname, 'src/test')],
        parallel: true,
        terserOptions: {
          compress: true,
          output: {
            comments: false,
            beautify: false,
          },
        },
        extractComments: true,
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

module.exports = merge(common, config);
