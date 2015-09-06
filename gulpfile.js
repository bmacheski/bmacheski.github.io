var gulp           = require('gulp')
  , deploy         = require('gulp-gh-pages')
  , minifyCss      = require('gulp-minify-css')
  , concat         = require('gulp-concat')
  , del            = require('del')
  , sass           = require('gulp-sass')
  , rename         = require('gulp-rename')
  , mainBowerFiles = require('main-bower-files');

gulp.task('bower', function () {
  gulp.src(mainBowerFiles('**/*.js'))
    .pipe(concat('build.js'))
    .pipe(gulp.dest('public/lib'))
  gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'bower_components/font-awesome/css/font-awesome.min.css'
    ])
    .pipe(concat('build.css'))
    .pipe(gulp.dest('public/lib'))
});

gulp.task('clean', function () {
  del('public')
});

gulp.task('copy', function () {
  gulp.src('CNAME')
    .pipe(gulp.dest('public'));
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('public/img'))
  gulp.src('./index.html')
    .pipe(gulp.dest('public'))
});

gulp.task('css', function(){
  gulp.src('src/css/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css/'))
});

gulp.task('deploy', function () {
  return gulp.src("public/**/*")
    .pipe(deploy())
});
/*
gulp.task('fonts', function() { 
    return gulp.src('bower_components/font-awesome/fonts/*') 
      .pipe(gulp.dest('./public/fonts')); 
});
*/
gulp.task('default', [], function() {});
gulp.task('build:dev', ['clean', 'css', 'bower', 'copy']);
gulp.task('serve', ['build:dev']);

