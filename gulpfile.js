var gulp = require('gulp'),
    karma = require('gulp-karma');

var testCode = function(){
  gulp.src('./foobar')
    .pipe(karma({
      configFile: './karma.conf.js',
      action: 'run'
    }));
}

gulp.task('test', testCode)
