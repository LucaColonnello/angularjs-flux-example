var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
  '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
  '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

// webpack sets the NODE_ENV when calling it with -p or -d
if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

var webpackConfig = {
    cache: true,
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: "app.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { stage: 0 }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader!' + AUTOPREFIXER_LOADER )
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader!' + AUTOPREFIXER_LOADER + '!less' )
            }
        ]
    },
    plugins: [
      new ExtractTextPlugin('style.css', { allChunks: true })
    ],

    resolve: {
        root: __dirname,
        modulesDirectories: ["node_modules", "bower_components"],
        extensions: ['', '.js', '.jsx']
    }
};


module.exports = webpackConfig;