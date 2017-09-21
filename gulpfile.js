const VERSION = '0.0.1';

// Require our dependencies
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gutil = require('gulp-util');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

// Set assets paths.
const paths = {
  'css': ['css/style.css', 'css/screen.css', 'css/modal.css', 'css/keyframes.css'],
  'scripts': [
    'js/resources.js',
    'js/views/GameBoard.js',
    'js/views/Modal.js',
    'js/pieces/GamePiece.js',
    'js/pieces/Enemy.js',
    'js/pieces/GamePiecePool.js',
    'js/pieces/EnemyPool.js',
    'js/pieces/CollectiblePool.js',
    'js/pieces/Player.js',
    'js/GameController.js',
    'js/app.js'
  ]
};

const destFolder = 'dist/' + VERSION + '/';

/**
 * Handle errors and alert the user.
 */
function handleErrors() {
  const args = Array.prototype.slice.call(arguments);

  notify.onError({
    'title': 'Task Failed [<%= error.message %>',
    'message': 'See console.',
    'sound': 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  }).apply(this, args);

  gutil.beep(); // Beep 'sosumi' again.

  // Prevent the 'watch' task from stopping.
  this.emit('end');
}
//
// /**
//  * Delete style.css and style.min.css before we minify and optimize
//  */
// gulp.task('clean:styles', () =>
//     del(['style.css', 'style.min.css'])
// );

/**
 * Concatenate and transform JavaScript.
 *
 * https://www.npmjs.com/package/gulp-concat
 * https://github.com/babel/gulp-babel
 */
gulp.task('css:concat', () =>
    gulp.src(paths.css)

    // Deal with errors.
        .pipe(plumber(
            {'errorHandler': handleErrors}
        ))

        // Concatenate partials into a single script.
        .pipe(concat('style.css'))

        // Save the file.
        .pipe(gulp.dest(destFolder))
);

/**
 * Minify and optimize style.css.
 *
 * https://www.npmjs.com/package/gulp-cssnano
 */
gulp.task('cssnano', ['css:concat'], () =>
    gulp.src(destFolder + 'style.css')
        .pipe(plumber({'errorHandler': handleErrors}))
        .pipe(cssnano({
          'safe': true // Use safe optimizations.
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(destFolder))
);

/**
 * Concatenate and transform JavaScript.
 *
 * https://www.npmjs.com/package/gulp-concat
 * https://github.com/babel/gulp-babel
 */
gulp.task('concat', () =>
    gulp.src(paths.scripts)

    // Deal with errors.
        .pipe(plumber(
            {'errorHandler': handleErrors}
        ))

        // Convert ES6+ to ES2015.
        .pipe(babel({
          presets: ['ES2015']
        }))

        // Concatenate partials into a single script.
        .pipe(concat('app.js'))

        // Save the file.
        .pipe(gulp.dest(destFolder))
);

/**
 * Minify compiled JavaScript.
 *
 * https://www.npmjs.com/package/gulp-uglify
 */
gulp.task('uglify', ['concat'], () =>
    gulp.src(destFolder + 'app.js')
        .pipe(plumber({'errorHandler': handleErrors}))
        .pipe(rename({'suffix': '.min'}))

        // Convert ES6+ to ES2015.
        .pipe(babel({
          presets: ['ES2015']
        }))
        .pipe(uglify({
          'mangle': false
        }))
        .pipe(gulp.dest(destFolder))
);

/**
 * JavaScript linting.
 *
 * https://www.npmjs.com/package/gulp-eslint
 */
gulp.task('js:lint', () =>
    gulp.src(['scripts/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);
/**
 * Process tasks and reload browsers on file changes.
 *
 * https://www.npmjs.com/package/browser-sync
 */
gulp.task('watch', function() {

  // Run tasks when files change.
  gulp.watch(paths.css, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
});

/**
 * Create individual tasks.
 */
gulp.task('scripts', ['uglify']);
gulp.task('styles', ['cssnano']);
gulp.task('lint', ['js:lint']);
gulp.task('default', ['styles', 'scripts']);