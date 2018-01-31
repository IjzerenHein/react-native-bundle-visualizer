const Visualizer = require('webpack-visualizer-plugin');
const { getEntryPoint } = require('./get-entry-point');

const entry = getEntryPoint();

module.exports = ({platform}, {module, plugins}) => {
	return {
		entry,
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
