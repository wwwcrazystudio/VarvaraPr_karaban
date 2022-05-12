/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
const {
    merge
} = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');

const themeName = '';

module.exports = merge(webpackConfiguration, {
    mode: 'production',
    output: {
        publicPath: '/wp-content/themes/' + themeName + '/',
    },
    /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
    devtool: false,
    module: {
        rules: [
            // Styles
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: 'auto',
                        },
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    }
                ],
            },
            // Images
            {
                test: /\.(png|gif|jpe?g)$/i,
                generator: {
                    filename: function (pathData) {
                        var relPath = pathData.filename.split('/');
                        relPath.splice(0, 1);
                        relPath.splice(-1, 1);
                        return relPath.join('/') + '/[name][ext][query]';
                    },
                },
            },
            {
                test: /\.svg$/,
                type: 'asset',
                generator: {
                    filename: function (pathData) {
                        var relPath = pathData.filename.split('/');
                        relPath.splice(0, 1);
                        relPath.splice(-1, 1);
                        return relPath.join('/') + '/[name][ext][query]';
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
                        return relPath.join('/') + '/[name][ext][query]';
                    },
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset',
                generator: {
                    filename: function (pathData) {
                        var relPath = pathData.filename.split('/');
                        relPath.splice(0, 1);
                        relPath.splice(-1, 1);
                        return relPath.join('/') + '/[name][ext][query]';
                    },
                },
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
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
        }),
    ],
});