const Visualizer = require('webpack-visualizer-plugin');

module.exports = ({platform}, {module, plugins}) => {
	return {
		entry: `./index.${platform}.js`,
		module: {
			...module,
			rules: [
				{
					test: /\.js?$/,
					exclude: '/node_modules/',
					use: [{
						loader: 'babel-loader'
					}]
				},
				...module.rules
			]
		},
		plugins: [
			...(plugins || []),
			new Visualizer()
		]
	};
};
