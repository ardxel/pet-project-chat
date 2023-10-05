const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");

/**
 * Webpack prod config
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: "production",
  devtool: false,
  output: {
    filename: "[fullhash].js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: true,
          output: {
            comments: false,
            beautify: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};

module.exports = merge(common, config);
