var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var tslint = require('gulp-tslint');
var tscConfig = require('./tsconfig.json');
var tsProject = typescript.createProject('tsconfig.json');
var runSequence = require('run-sequence');
var sourceMaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var config = require('config');

function handleErrors(errorObject, callback) {
  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') {
    this.emit('end');
  }
}

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy', function () {
  return gulp.src(['src/**/*', '!**/*.ts'])
    .pipe(gulp.dest('dist'))
});

gulp.task('tslint', function () {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      configuration: './tslint.json'
    }))
    .pipe(tslint.report({
      emitError: true,
      summarizeFailureOutput: true
    }))
    .on('error', handleErrors);
});

// TypeScript compile
gulp.task('compile', function () {
  var tsResult = tsProject.src()
    .pipe(sourceMaps.init())
    .pipe(tsProject())
    .on('error', handleErrors);
  return tsResult.js.pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('dist/'))
    .on('error', handleErrors);
});

gulp.task('run', function () {
  return nodemon({
    script: 'dist/server/server.js',
    watch: 'dist/server',
    ext: 'js json',
    env: {
      NODE_ENV: 'development',
      PORT: config.get('port')
    }
  })
});

gulp.task("libs", () => {
   return gulp.src([
           'core-js/client/shim.min.*',
           'systemjs/dist/system-polyfills.*',
           'systemjs/dist/system.src.*',
           'reflect-metadata/Reflect.*',
           'rxjs/**/*.*',
           'socket.io/**/*',
           'zone.js/dist/**',
           '@angular/**/bundles/**'
       ], {cwd: "node_modules/**"}) /* Glob required here. */
       .pipe(gulp.dest("dist/scripts/lib"));
});

// watch for TypeScript changes
gulp.watch('src/**/*.ts', function () {
  runSequence('tslint', 'compile');
});

// watch for style changes
// gulp.watch('src/styles/**/*',
//   function () {
//     runSequence('css');
//   }
// );

// Watch for HTML, IMG, JS changes
gulp.watch(['src/**/*.html', 'src/res/**/*', 'src/scripts/**/*'],
  function () {
    runSequence('copy');
  }
);

gulp.task('build', function (callback) {
  runSequence('clean', 'copy', 'libs', 'tslint', 'compile', 'run', callback);
});

gulp.task('default', ['build']);