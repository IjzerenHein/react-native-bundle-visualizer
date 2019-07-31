const Visualizer = require('webpack-visualizer-plugin');
const originalConfig = require('../../../webpack.haul.js');

module.exports = function(context, config) {
  config = originalConfig(context, config);
  return Object.assign({}, config, {
    plugins: (config.plugins || []).concat([new Visualizer()])
  });
};
