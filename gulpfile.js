var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	jade = require('gulp-jade'),
	plumber = require('gulp-plumber'),
	fs = require('fs'),
	compass = require('gulp-compass');

var jade_path = './app/jade/pages/*.jade',
	scss_path = './app/scss/**/*.scss',
	html_path = './app/pages',
	css_path = './app/css';

gulp.task('jade',function() {
	var YOUR_LOCALS = {};

	gulp.src(jade_path)
		.pipe(plumber())
		.pipe(jade({
			locals: YOUR_LOCALS,
			pretty: '\t'
			}))
		.pipe(gulp.dest(html_path))
});

gulp.task('compass', function() {
	gulp.src(scss_path)
		.pipe(plumber())
		.pipe(compass({
			config_file: './config.rb',
			css: './app/css',
			sass: './app/scss'
		}))
}); 

gulp.task('watch', function(){
	gulp.watch(jade_path, ['jade']);
	//gulp.watch('./pages.json', ['index']);
	gulp.watch(scss_path, ['compass'])
});


gulp.task('server', function() {
	browserSync({
		port:9000,
		server: {
			baseDir:'./app/pages'
		}
	});
});

// gulp.task('watch',function() {
// 	gulp.watch([
// 		'./app/*.html',
// 		'./app/css/**/*.css',
// 		'./app/js/**/*.js'
// 		]).on('change',browserSync.reload)
// });


// gulp.task('index', function() {
// 	var YOUR_LOCALS = './pages.json';

// 	gulp.src('./index.jade')
// 		.pipe(plumber())
// 		.pipe(jade({
// 			locals: JSON.parse(fs.readfile(YOUR_LOCALS, 'utf8')),
// 			pretty : '\t',
// 		}))
// 		.pipe(gulp.dest('.'))
// });

gulp.task('default',['server','watch']);