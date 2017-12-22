const merge = require('webpack-merge');
const base = require('./base.config');

module.exports = merge(base, {
  devtool: 'source-maps',
  watch: true,
});
