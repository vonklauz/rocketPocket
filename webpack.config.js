const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: __dirname + '/dist',

	},
	plugins: [new HtmlWebpackPlugin({
		template: './src/index.html'
	})],
	externals: {
		moment: 'moment'
	}
}
