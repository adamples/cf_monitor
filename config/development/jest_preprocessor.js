var babelJest = require('babel-jest');
var webpackAlias = require('jest-webpack-alias');

module.exports = {
  process: function(src, filename) {
    var output = src;

    if (filename.indexOf('node_modules') === -1) {
      output = babelJest.process(output, filename);
      output = webpackAlias.process(output, filename);
    }

    return output;
  }
};
