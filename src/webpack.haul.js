const Visualizer = require('webpack-visualizer-plugin');

module.exports = ({platform}, {module, plugins}) => {
	return {
		entry: `./index.${platform}.js`,
		module: Object.assign(
			{},
			module,
			{
				rules: [
					{
						test: /\.js?$/,
						exclude: '/node_modules/',
						use: [{
							loader: 'babel-loader'
						}]
					}
				].concat(module.rules || [])
			}
		),
		plugins: (plugins || []).concat([new Visualizer()])
	};
};
