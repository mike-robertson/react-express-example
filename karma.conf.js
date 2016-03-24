// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha', 'browserify'],
    files: [
      // 'public/build/build.js',
      'public/scripts/**/*.spec.js'
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
       'public/scripts/**/*.spec.js': ['browserify']
    },
    browserify: {
        debug: true,
        transform: [ 'babelify' ],
        extensions: ".jsx"
    },

    colors: true
  });
};
