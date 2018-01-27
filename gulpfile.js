const gulp            = require('gulp');
const sass            = require('gulp-sass');
const browserSync     = require('browser-sync').create();
const sourcemaps      = require('gulp-sourcemaps');
const autoprefixer    = require('gulp-autoprefixer');
const reload          = browserSync.reload;

gulp.task('css', function(){
  return gulp.src('src/css/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('copy', function(){
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['css'], function() {
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('src/css/*.scss', ['css']);
  gulp.watch('src/*.html', ['copy']).on('change', reload);
});

gulp.task('default', ['serve', 'copy']);
