var webpack = require('webpack');
var path = require("path");
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: "./app-client.js",
	output: {
		filename: "public/bundle.js"
	},
	plugins: [
		new webpack.DefinePlugin({
		  'process.env': {
			'NODE_ENV': JSON.stringify('production')
		  }
		}),
		new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({ 
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
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