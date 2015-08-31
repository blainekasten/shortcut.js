//module.exports = function(config) {
  //config.set({
    //browsers: ['FirefoxDeveloper'],
    //files: [ { pattern: 'test-context.js', watched: false } ],
    //frameworks: ['jasmine'],
    //preprocessors: { 'test-context.js': ['webpack'] },
    //webpack: {
      //module: {
        //loaders: [
          //{ test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        //]
      //},
      //watch: true
    //},
    //webpackServer: {
      //noInfo: true
    //}
  //});
//};

module.exports = function(config) {
  config.set({
    autoWatch: true,
    basePath: '',
    frameworks: ['jasmine'],
    //browsers: ['Safari', 'Chrome', 'Firefox'],
    browsers: ['Chrome'],
    colors: true,
    files: [
      'test/libs/jquery.min.js',
      'dist/shortcut.js',
      'test/shortcut.js'
    ],
    reporters: ['progress'],
    port: 9876,
    runnerPort: 9100,
    singleRun: false
  });
};
