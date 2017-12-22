const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';

const app = path.resolve('app/');
const build = path.resolve('build', env);

module.exports = {
  entry: app,
  output: {
    path: build,
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    modules: [
      app,
      'node_modules',
    ],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {minimize: true}},
            'postcss-loader',
            'less-loader'
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {minimize: true}},
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(app, 'index.html')
    }),

    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks(module) {
        return module.context &&
          module.context.indexOf('node_modules') >= 0;
      }
    })
  ]
};
