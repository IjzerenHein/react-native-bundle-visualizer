import Visualizer from 'webpack-visualizer-plugin';
import originalConfig from '../../../haul.config.js';

export default {
  webpack: env => {
    const config = originalConfig.webpack(env);
    config.plugins.push(new Visualizer());
    return config;
  }
};
