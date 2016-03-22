var gulp = require('gulp');  // Base gulp package
var babelify = require('babelify'); // Used to convert ES6 & JSX to ES5
var browserify = require('browserify'); // Providers "require" support, CommonJS
var notify = require('gulp-notify'); // Provides notification to both the console and Growel
var rename = require('gulp-rename'); // Rename sources
var sourcemaps = require('gulp-sourcemaps'); // Provide external sourcemap files
var livereload = require('gulp-livereload'); // Livereload support for the browser
var gutil = require('gulp-util'); // Provides gulp utilities, including logging and beep
var chalk = require('chalk'); // Allows for coloring for logging
var source = require('vinyl-source-stream'); // Vinyl stream support
var buffer = require('vinyl-buffer'); // Vinyl stream support
var watchify = require('watchify'); // Watchify for source changes
var merge = require('utils-merge'); // Object merge tool
var duration = require('gulp-duration'); // Time aspects of your gulp process
var Server = require('karma').Server; // used by karma to run unit tests
var opn = require('opn');
var globalShim = require('browserify-global-shim').configure({
  "react": "React",
  "react-dom": "ReactDOM"
});

// Configuration for Gulp
var config = {
  js: {
    src: './public/scripts/main.jsx',
    watch: './public/scripts/**/*',
    outputDir: './public/build/',
    outputFile: 'build.js',
  },
  standalone: {
    outputDir: './public/build/standalone/'
  },
  moduleName: 'SeedComments' // name of the module we are exporting
};

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Error reporting function
function mapError(err) {
  if (err.fileName) {
    // Regular error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/scripts/', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description));
  } else {
    // Browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}

// Completes the final file outputs
function bundle(bundler) {
  var bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle(function(err, src, map){})
    .on('error', mapError) // Map error reporting
    .pipe(source('main.jsx')) // Set source name
    .pipe(buffer()) // Convert to gulp pipeline
    .pipe(rename(config.js.outputFile)) // Rename the output file
    .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
    .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
    .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    })) // Output the file being created
    .pipe(bundleTimer) // Output time timing of the file creation
    .pipe(livereload({ start: true })); // Reload the view in the browser
}

function buildBundle(bundler) {
  var bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle(function(err, src, map){})
    .on('error', mapError) // Map error reporting
    .pipe(source('main.jsx')) // Set source name
    .pipe(buffer()) // Convert to gulp pipeline
    .pipe(rename(config.js.outputFile)) // Rename the output file
    .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
    .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
    .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    })) // Output the file being created
    .pipe(bundleTimer); // Output time timing of the file creation

}
function standaloneBundle(bundler) {
  var bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle({standalone: config.moduleName}, // the module name
      function(err, src, map){})
    .on('error', mapError) // Map error reporting
    .pipe(source('main.jsx')) // Set source name
    .pipe(buffer()) // Convert to gulp pipeline
    .pipe(rename(config.js.outputFile)) // Rename the output file
    .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
    .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
    .pipe(gulp.dest(config.standalone.outputDir)) // Set the output folder
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    })) // Output the file being created
    .pipe(bundleTimer); // Output time timing of the file creation

}
//
gulp.task('livereload', function() {
  livereload.listen(); // Start livereload server
  var args = merge(watchify.args, { debug: true, extensions:".jsx"}); // Merge in default watchify args with browserify arguments

  var bundler = browserify(config.js.src, args) // Browserify
    .plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']}) // Watchify to watch source file changes
    .transform(babelify, {presets: ['es2015', 'react']}); // Babel tranforms

  bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)
  opn('http://localhost:3000');

  bundler.on('update', function() {
    bundle(bundler); // Re-run bundle on source updates
  });
});

gulp.task('build', ['test'], function() {
  var args = {extensions:".jsx"}; // Merge in default watchify args with browserify arguments

  var bundler = browserify(config.js.src, args) // Browserify
    .plugin('minifyify', {map: false})
    .transform(babelify, {presets: ['es2015', 'react']}) // Babel transform
    .transform(globalShim); // Removes React and ReactDOM from dependencies since they are assumed

  var standaloneBundler = browserify(config.js.src, args) // Browserify
    .plugin('minifyify', {map: false})
    .transform(babelify, {presets: ['es2015', 'react']}) // Babel transform
    .transform(globalShim); // Removes React and ReactDOM from dependencies since they are assumed

  buildBundle(bundler);
  standaloneBundle(standaloneBundler);
});
//

// Gulp task for build
gulp.task('default', ['livereload'], function() {

});
