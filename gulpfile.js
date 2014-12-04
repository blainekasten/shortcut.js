require('colors')
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    bump = require('gulp-bump'),
    rename = require('gulp-rename'),
    pkg = require('./package.json'),
    bower_pkg = require('./bower.json'),
    uglify = require('gulp-uglify'),
    coffee = require('gulp-coffee'),
    jasmine = require('gulp-jasmine'),
    prompt = require('prompt'),
    git = require('gulp-git'),
    wait = require('gulp-wait'),
    notify = require('gulp-notify'),
    karma = require('gulp-karma'),
    header = require('gulp-header');

var banner = ['/**', ' * <%= pkg.name %> ', ' * @version <%= pkg.version %> ', ' * @author <%= pkg.author %> ', ' * @license <%= pkg.licenses.type %> ', ' */ \n\n'].join("\n");

/*
  Default Gulp Task. Can be ran via the following commands.
    ```bash
      gulp
      gulp code
    ```

  This will watch any changes on files within src
    Then run jshint and test the code

 */

var code = function(){
  gulp.watch('shortcut.js', function(){
    gulp.src('shortcut.js')
      .pipe(jshint({expr: true})) // JSHint
      .pipe(jshint.reporter('default'));

  });
  testCode();
}

/*
  Build Tools. This function can be ran at command line by:
    `gulp build --type STRING`

  It will run a jslint, code test, version bump,
    uglifyier, minifiyer, console.log remover, script header.

  @params (String) build bump ammount
    major = first number = 1.0.0
    minor = second number = 0.1.0
    patch = third number = 0.0.1

  @params (BashArg) --release Optional.
    If this is passed, it will push the code to github
    and create a release.
 */

var buildDist = function(){
  var bumpTypes = ['major', 'minor', 'patch'],
      bumpType = gutil.env.type;

  if (!bumpType) {
    console.log("\nYou must pass a build bump type [major, minor, patch]".red);
    console.log("\nRun the function again passing --type. \n i.e.  gulp build --type patch\n".red);
    return;
  }

  // Check if type matches a needed bump version
  if (bumpTypes.lastIndexOf(bumpType.toLowerCase()) == -1)
    return console.log("\nInvalid build type. Must be major, minor, or patch\n".red);

  // Async makes this number undependable unless manually figured out
  var pkgVersionArr = pkg.version.split('.'),
      bumpPosition =  bumpTypes.indexOf(bumpType),
      positionsToClear = pkgVersionArr.length - bumpPosition - 1,
      bumpedVersion = Number(pkgVersionArr[bumpTypes.indexOf(bumpType)]) + 1;

  pkgVersionArr[bumpTypes.indexOf(bumpType)] = bumpedVersion;
  for (var i = 2; i > bumpPosition; i--){
    pkgVersionArr[i] = 0;
  }
  pkg.version = pkgVersionArr.join('.');

  prompt.start();
  prompt.get('Confirm Build Process (y/n)'.green, function(err, result){
    result = result[Object.keys(result)[0]]
    if (result != 'y') return;

    //testCode(); // Run Tests

    // Bump Version number
    gulp.src('./package.json')
      .pipe(bump({ type: bumpType.toLowerCase() }))
      .pipe(gulp.dest('./'));

    gulp.src('./bower.json')
      .pipe(bump({ type: bumpType.toLowerCase() }))
      .pipe(gulp.dest('./'));

    // Build Minified and unminified Javascript
    gulp.src('shortcut.js')
      .pipe(jshint({expr: true})) // jslint
      .pipe(jshint.reporter('default'))
      .pipe(uglify()) // Uglify && Minify
      .pipe(rename(pkg.name.replace('.js', '') + '.min.js'))
      .pipe(header(banner, {pkg: pkg}))
      .pipe(gulp.dest('./'))

    // Create Github Release
    if (gutil.env.release){
      var tagName = "v" + pkg.version;

      gulp.src('./')
        .pipe(wait(2000))
        .pipe(git.add())
        .pipe(git.commit("[RELEASE: "+ pkg.version +"]" + pkg.name + " " + Date.now()))
        .pipe(git.push('origin', 'master'))
        .pipe(git.tag(tagName, pkg.version + "Release"))
        .pipe(git.push('origin', tagName));
    }

  });
}

/*
  Test Tool. This function can be ran at command line by:
    `gulp test`

  It will compile coffeescript jasmine tests and run them
 */

var testCode = function(){
  gulp.src('./foobar')
    .pipe(karma({
      configFile: './karma.conf.js',
      action: 'run'
    }));
}


/*
  Bash Implementations.
 */

gulp.task('default', code);
gulp.task('code', code);
gulp.task('build', buildDist);

gulp.task('test', testCode);
