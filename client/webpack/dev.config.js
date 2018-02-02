const merge = require('webpack-merge');
const base = require('./base.config');

module.exports = merge(base, {
  devtool: 'cheap-module-eval-source-map',
  watch: true,
});
