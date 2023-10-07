const path = require('path');
require('dotenv').config();
/* PLUGINS */
const { HotModuleReplacementPlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const resolveFromDir = (endpoint) => {
  return path.resolve(__dirname, endpoint);
};

const _constants = {
  paths: {
    BUILD_DIR: resolveFromDir('build'),
    PUBLIC_DIR: resolveFromDir('static'),
    SRC_DIR: resolveFromDir('src'),
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
      test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/img/[hash][ext]',
      },
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
 * @type {import('webpack').Configuration}
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
  },
  module: {
    strictExportPresence: true,
    rules: configureRules(),
  },
};
