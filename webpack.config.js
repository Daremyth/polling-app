const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: "./app-client.js",
	output: {
		filename: "public/bundle.js"
	},
	plugins: [
		new webpack.DefinePlugin({
		  'process.env': {
			'NODE_ENV': JSON.stringify('production')
		  }
		})
	  ],
	module: {
		loaders: [
			{
				exclude: /(node_modules|app-server.js)/,
				loader: 'babel'
			}
		]
	}
};