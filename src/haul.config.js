import Visualizer from 'webpack-visualizer-plugin';
import { createWebpackConfig } from "haul";
import { getEntryPoint } from './get-entry-point';

export default {
  webpack: env => {
    const config = createWebpackConfig({
      entry: getEntryPoint(),
    })(env);

    config.plugins.push(new Visualizer());

    return config;
  }
};
