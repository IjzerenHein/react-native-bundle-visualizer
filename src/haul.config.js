import Visualizer from 'webpack-visualizer-plugin';
import { createWebpackConfig } from 'haul';
import { getEntryPoint } from './get-entry-point';

export default {
  webpack: env => {
    const config = createWebpackConfig({
      entry: getEntryPoint()
    })(env);

    config.module.rules[1].exclude = /node_modules(?!.*[\/\\](react|@react-navigation|@react-native-community|@expo|pretty-format|haul|metro))/;
    config.plugins.push(new Visualizer());

    return config;
  }
};
