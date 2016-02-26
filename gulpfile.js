var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	jade = require('gulp-jade'),
	plumber = require('gulp-plumber'),
	fs = require('fs'),
	concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
	compass = require('gulp-compass');

var jade_path_to_watch = './app/jade/**/*.jade',
	jade_path = './app/jade/*.jade',
	scss_path_to_watch = './app/scss/**/*.scss',
	scss_path = './app/scss/*.scss',
	img_path = './app/img/**/*',
	css_path = './app/css',
	js_path = './app/js/**/*',
	prod_css_path = './css',
	prod_img_path = './img',
	prod_js_path = './js',
	prod_html_path = './';

gulp.task('jade',function() {
	var YOUR_LOCALS = {};

	gulp.src(jade_path)
		.pipe(plumber())
		.pipe(jade({
			locals: YOUR_LOCALS,
			pretty: '\t'
			}))
		.pipe(gulp.dest(prod_html_path))
});
// copmas кладет в папку разработки, а оттуда забираем  в дистр и минифицируем
gulp.task('compass', function() {
	gulp.src(scss_path)
		.pipe(plumber())
		.pipe(compass({
			config_file: 'config.rb',
			sourcemap: true,
			debug: true,
			css: './app/css',
			sass: './app/scss'
		}))
		.pipe(minifyCss())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest(prod_css_path));
}); 

// Переносим JS в папку dist
gulp.task('js', function() {
  return gulp.src('./app/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(prod_js_path));
});

gulp.task('copy-js', function() {
  return gulp.src('./app/js/vendor/*.js')
    .pipe(gulp.dest('./js/vendor'));
});

// Картинки копируем кроме папок со спрайтами (в последующем вынести их в отделную папку)
gulp.task('images', function () {
  return gulp.src([img_path,
  	'!./app/img/sprites'])
    .pipe(gulp.dest(prod_img_path));
});

gulp.task('watch', function(){
	gulp.watch(jade_path_to_watch, ['jade']);
	gulp.watch(scss_path_to_watch, ['compass'])
});

gulp.task('default',['watch']);

gulp.task('server', function() {
	browserSync({
		port:9000,
		server: {
			baseDir:'./'
		}
	});
});

gulp.task('build',['js','copy-js','images'], function(){
	gulp.start('server');
});