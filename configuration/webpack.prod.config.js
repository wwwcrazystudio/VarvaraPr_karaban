/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
const {
  merge
} = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

const environment = require('./environment');

const webpackConfiguration = require('../webpack.config');

module.exports = merge(webpackConfiguration, {
  mode: 'production',

  /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
  devtool: false,
  module: {
    rules: [
      // Styles
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader', 'postcss-loader', 'sass-loader'
        ],
      },
    ],
  },
  /* Optimization configuration */
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },

  /* Performance treshold configuration values */
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  /* Additional plugins configuration */
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', {
            interlaced: true
          }],
          ['jpegtran', {
            progressive: true
          }],
          ['optipng', {
            optimizationLevel: 5
          }],
          [
            'svgo',
            {
              plugins: [{
                name: 'removeViewBox',
                active: false
              }, ],
            },
          ],
        ],
      },
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.(woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/.test(entry)) {
          return 'font';
        }
      },
      fileWhitelist: [/\.(woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/],
      include: 'allAssets'
    })
  ],
});