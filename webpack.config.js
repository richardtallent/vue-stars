const webpack = require("webpack")
const path = require("path")
const merge = require("webpack-merge")

function resolve(dir) {
	return path.join(__dirname, "..", dir)
}

var commonConfig = {
	output: {
		path: path.resolve(__dirname + "/dist/"),
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				include: [resolve("src")],
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
		],
	},
	externals: {
		vue: "vue",
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: false,
			mangle: true,
			compress: {
				warnings: false,
			},
		}),
	],
}

module.exports = [
	// Config 1: For browser environment
	merge(commonConfig, {
		entry: path.resolve(__dirname + "/src/plugin.js"),
		output: {
			filename: "vue-stars.min.js",
			libraryTarget: "window",
			library: "VueStars",
		},
	}),

	// Config 2: For Node-based development environments
	merge(commonConfig, {
		entry: path.resolve(__dirname + "/src/VueStars.vue"),
		output: {
			filename: "vue-stars.js",
			libraryTarget: "umd",
			library: "vue-stars",
			umdNamedDefine: true,
		},
	}),
]
