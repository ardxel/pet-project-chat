const path = require('path');
require('dotenv').config();
/* PLUGINS */
const { HotModuleReplacementPlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

const resolveFromMainDir = (endpoint) => {
  return path.resolve(__dirname, endpoint);
};

const _constants = {
  paths: {
    BUILD_DIR: resolveFromMainDir('build'),
    PUBLIC_DIR: resolveFromMainDir('static'),
    SRC_DIR: resolveFromMainDir('src'),
    HTML_TEMPLATE: path.join(__dirname, 'public', 'index.html'),
    ENTRYPOINT: path.join(__dirname, 'src', 'index.tsx'),
  },
  env: {
    isServe: Boolean(process.env.SERVE),
    port: parseInt(process.env.PORT, 10) || 3000,
  },
};

const configurePlugins = () => {
  /**
   * @type {import('webpack').Configuration['plugins']}
   */
  const plugins = [
    /* to simplify the creation of the main HTML file and maintenance of webpack bundles */
    new HtmlWebpackPlugin({
      template: _constants.paths.HTML_TEMPLATE,
    }),
    new DotenvPlugin({
      systemvars: true,
      safe: process.env.NODE_ENV === 'development',
      silent: true,
    }),
    /* for page reloading */
    new HotModuleReplacementPlugin({}),
    new ProvidePlugin({
      React: 'react',
    }),
  ];

  if (_constants.env.isServe) {
    /* for enabling "fast refresh" of react components  */
    plugins.push(new ReactRefreshWebpackPlugin());
  }
  return plugins;
};

/**
 * @return {import('webpack').Configuration['module']['rules']}
 */
const configureRules = () => {
  return [
    // --- JS | TS USING BABEL
    {
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // Using a cache to avoid of recompilation
        },
      },
    },
    // --- JS | TS USING ESBUILD
    // {
    //   test: /\.[jt]sx?$/,
    //   exclude: /node_modules/,
    //   use: {
    //     loader: "esbuild-loader",
    //     options: {
    //       tsconfig: "./tsconfig.json",
    //     },
    //   },
    // },
    // --- HTML
    {
      test: /\.(html)$/,
      use: ['html-loader'],
    },
    // --- IMG
    {
      test: /\.(png|jpe?g|gif|webp|ico)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/img/[hash][ext]',
      },
    },
    // --- SVG
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
    // --- FONTS
    {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      exclude: /node_modules/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/fonts/[hash][ext]',
      },
    },
    // --- CSS
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
  ];
};

/**
 * @return {import('webpack-dev-server').Configuration}
 */
const configureDevServer = () => {
  return {
    historyApiFallback: true, // Apply HTML5 History API if routes are used
    compress: true, // Enables gzip compression for the entire file being served.
    open: true,
    hot: true, // Reload the page after changes saved (HotModuleReplacementPlugin)
    client: {
      // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true, // Prints compilation progress in percentage in the browser.
    },
    port: _constants.env.port,
    devMiddleware: {
      writeToDisk: true,
    },
  };
};

/**
 * Webpack common config
 * @return {import('webpack').Configuration}
 */
module.exports = {
  devServer: configureDevServer(),
  plugins: configurePlugins(),
  entry: _constants.paths.ENTRYPOINT,
  output: {
    path: _constants.paths.BUILD_DIR,
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ baseUrl: _constants.paths.SRC_DIR })],
  },
  module: {
    strictExportPresence: true,
    rules: configureRules(),
  },
};
