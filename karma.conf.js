autoWatch = false;

basePath = '';

frameworks = ['jasmine'];

logLevel = LOG_INFO;

autoWatch = true;

browsers = ['Safari', 'Chrome', 'Firefox']//, 'Firefox']//, 'PhantomJS'];
  /*
    Chrome
    ChromeCanary
    Firefox
    Opera
    Safari
    PhantomJS
  */
//captureTimeout = 60000,

colors = true;

//exclude = [],
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'libs/jquery.min.js',
  'src/prototypes/string.coffee',
  'src/MakeUp.loader.coffee',
  'src/MakeUp.coffee',
  'src/**/*.coffee',
  'tests/*.coffee'
];

preprocessors = {
  '**/*.coffee': 'coffee'
};

reporters = ['progress']; /* dots progress junit growl coverage */

port = 9876;
runnerPort = 9100;
//port = 3000;

singleRun = false;
//urlRoot = ''


