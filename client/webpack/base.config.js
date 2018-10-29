const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';

const app = path.resolve('app/');
const build = path.resolve('../server/API/public', env);

module.exports = {
  entry: app,
  devtool: 'inline-source-map',
  output: {
    path: build,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [app, 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: '../tslint.json',
          tsConfigFile: 'tsconfig.json',
        },
      },
      {
        test: /\.ts(x?)$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          useBabel: true,
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { minimize: true } },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { minimize: true } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(app, 'index.html'),
      favicon: 'app/favicon.ico',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};
