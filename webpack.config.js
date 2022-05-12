/* eslint-disable @typescript-eslint/indent */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/**
 * Webpack main configuration file
 */

const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

const views = fs.readdirSync(path.resolve(__dirname, environment.paths.source, 'views'))
  .filter((file) => path.extname(file).toLowerCase() === '.html');

const htmlPluginEntries = views.map((template) => new HTMLWebpackPlugin({
  inject: true,
  hash: false,
  filename: template,
  template: path.resolve(environment.paths.source, 'views', template),
  favicon: path.resolve(environment.paths.source, 'assets/img', 'favicon.ico'),
  templateParameters: {
    data: require('./src/views/data/data.json'),
  },
  minify: {
    collapseWhitespace: false,
    keepClosingSlash: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  },
}));

htmlPluginEntries.push(new PreloadWebpackPlugin());

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'assets/js', 'index.js'),
  },
  output: {
    filename: 'assets/js/[name].js',
    path: environment.paths.output,
  },
  module: {
    rules: [
      // Vue SFC
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
        }, ],
      },
      // Ejs
      {
        test: /\.ejs$/,
        exclude: /node-modules/,
        use: [{
          loader: 'ejs-loader',
          options: {
            esModule: false,
          }
        }, ],
      },
      // JS / TS
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file) &&
          /local_modules/.test(file)
        ),
        use: ['babel-loader'],
      },
      // Unit test
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
      // Images
      {
        test: /\.(png|gif|jpe?g)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: function (pathData) {
            var relPath = pathData.filename.split('/');
            relPath.splice(0, 1);
            relPath.splice(-1, 1);
            return relPath.join('/') + '/[name].[hash][ext][query]';
          },
        },
      },
      {
        test: /\.svg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: function (pathData) {
            var relPath = pathData.filename.split('/');
            relPath.splice(0, 1);
            relPath.splice(-1, 1);
            return relPath.join('/') + '/[name].[hash][ext][query]';
          },
        },
        use: 'svgo-loader',
      },
      // Videos
      {
        test: /\.(mp4|webm|mov)$/i,
        type: 'asset/resource',
        generator: {
          filename: function (pathData) {
            var relPath = pathData.filename.split('/');
            relPath.splice(0, 1);
            relPath.splice(-1, 1);
            return relPath.join('/') + '/[name].[hash][ext][query]';
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.fonts,
          },
        },
        generator: {
          filename: function (pathData) {
            var relPath = pathData.filename.split('/');
            relPath.splice(0, 1);
            relPath.splice(-1, 1);
            return relPath.join('/') + '/[name].[hash][ext][query]';
          },
        },
      },
    ],
  },
  plugins: [
    // Clean dist folder
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new ImageminWebpWebpackPlugin({
      overrideExtension: false,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: 'jquery',
      _: "lodash"
    }),
    // Compile Vue SFC
    new VueLoaderPlugin(),
  ].concat(htmlPluginEntries),
  target: 'web',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@src': path.resolve(__dirname, environment.paths.source),
      '@assets': path.resolve(__dirname, environment.paths.source, 'assets'),
      '@html': path.resolve(__dirname, environment.paths.source, 'views'),
      '@parts': path.resolve(__dirname, environment.paths.source, 'views/templates'),
      '@data': path.resolve(__dirname, environment.paths.source, 'views/data'),
      '@img': path.resolve(__dirname, environment.paths.source, 'assets/img'),
      '@ph': path.resolve(__dirname, environment.paths.source, 'assets/img/placeholder'),
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
  },
  externals: {
    jquery: 'jQuery',
  },
};