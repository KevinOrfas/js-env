import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
   vendor: path.resolve(__dirname, 'src/vendor'),
   main: path.resolve(__dirname, 'src/index'),
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
      //Generate an external css file with a hash in the file
      new ExtractTextPlugin('[name].[contenthash].css'),
      //Hash the files using MD5 so that their name change when content changes
      new WebpackMd5Hash(),
      //Use CommonsChunkPlugin to create a separate bundle
      //of vendor libraries so that they ate cached separately
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      //Create HTML file that includes reference to bundle JS.
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: {
            removeComment: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true, 
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        },
        inject: true,
        //Properties you define here are available in index.html
        //using HtmlWebpackPlugin.options.varName
        trackJSToken: '97177e6c002a4618bb6a3abaa7cc3f61'
      }),

      //Eliminate duplicate packages when generating bundle
      new webpack.optimize.DedupePlugin(),
      
      //Minify  js
      new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
