const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `bundle.js`,
    publicPath: '/',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
      containers: path.resolve(__dirname, 'src', 'containers'),
      actions: path.resolve(__dirname, 'src', 'actions'),
      reducers: path.resolve(__dirname, 'src', 'reducers'),
      selectors: path.resolve(__dirname, 'src', 'selectors'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test:/\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  },
  externals: {
    react: 'react'
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['ru']
    })
  ],
};