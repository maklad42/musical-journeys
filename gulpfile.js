// Boilerplate code for gulfile.js using Gulp 4

// Initialise modules
// Import gulp API functions so we can then use
// them below as series instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');

// Import the gulp functions that we will use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// File paths
const files = {
  scssPath: './src/sass/**/*.scss',
  jsPath: './src/lib/**/*.js'
}

// Sass compliler function
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./css'));
}

// JS compiler function
function jsTask() {
  return src([files.jsPath])
    .pipe(concat('journeys.js'))
    .pipe(uglify())
    .pipe(dest('./js'));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
  watch([files.scssPath, files.jsPath],
    {interval: 1000, usePolling: true}, //Makes docker work
    parallel(scssTask, jsTask),
  );
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs watch task
exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
);
