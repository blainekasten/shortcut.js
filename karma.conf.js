module.exports = function(config) {
  config.set({
    autoWatch: true,
    basePath: '',
    frameworks: ['jasmine'],
    browsers: ['Firefox'],//, 'Firefox']//, 'PhantomJS'];
    //browsers: ['Safari', 'Chrome', 'Firefox'],//, 'Firefox']//, 'PhantomJS'];
    colors: true,
    files: [
      'libs/jquery.min.js',
      'shortcut.js',
      'test/shortcut.js'
    ],
    reporters: ['progress'],
    port: 9876,
    runnerPort: 9100,
    singleRun: false
  });
};
