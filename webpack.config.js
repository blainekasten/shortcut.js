/**
 * @see http://webpack.github.io/docs/configuration.html
 * for webpack configuration options
 */


/*
 * Banner Plugin is for code climate
 * @see https://gist.github.com/Ceane/9115471e90f4959e79da
 */
var webpack = require('webpack');
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin();


module.exports = {
  plugins: [
  ],

  context: __dirname + '/src',

  entry: './index',
  output: {
    filename: 'shortcut.js',

    // We want to save the bundle in the same directory as the other JS.
    path: __dirname + '/dist',
    library: "shortcut",
    libraryTarget: "umd"
  },

  // Turns on source maps
  // Prefix with a '#' to squash the FF warnings that say:
  // 'Using //@ to indicate sourceMappingURL pragmas is deprecated.
  // Use //# instead'
  //devtool: '#eval-source-map',

  // The 'module' and 'loaders' options tell webpack to use loaders.
  // @see http://webpack.github.io/docs/using-loaders.html
  module: modules(),

  resolve: {
    extensions: '.js'
  }
};





function modules(){
  return {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime'},
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    ]
  };
}
