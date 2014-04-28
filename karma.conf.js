module.exports = function(config) {
  config.set({
    autoWatch: true,
    basePath: '',
    frameworks: ['jasmine'],
    //browsers: ['Safari', 'Chrome', 'Firefox'],
    browsers: ['Chrome'],
    colors: true,
    files: [
      'test/libs/require.js',
      'test/libs/jquery.min.js',
      'shortcut.js',
      'test/shortcut.js'
    ],
    reporters: ['progress'],
    port: 9876,
    runnerPort: 9100,
    singleRun: false
  });
};
