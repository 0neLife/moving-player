var gulp         = require("gulp"),
    sass         = require('gulp-sass'),
    cssnano      = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin     = require('gulp-imagemin'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    browserSync  = require('browser-sync').create(),
    rename       = require('gulp-rename');

gulp.task('browser-sync', ['html', 'sass', 'scripts', 'libs', 'img'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        files: ['./dist/**/*.html', './dist/css/*.css', './dist/js/*.js', './dist/libs/*.js', './dist/img/*.+(jpg|jpeg|png|gif)']
    });
});

gulp.task("html", function() {
  return gulp.src("app/**/*.html")
  .pipe(gulp.dest("dist"))
  .pipe(browserSync.stream());
});

gulp.task("sass", function() {
  return gulp.src("app/sass/**/*.sass")
    .pipe(concat('styles.sass'))
    .pipe(sass())
    .pipe(autoprefixer({
   		browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
    	cascade: false
		}))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("scripts", function() {
  return gulp.src("app/js/**/*.js")
		.pipe(concat('scripts.js')) 
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.stream());
});

gulp.task('libs', function() {
	return gulp.src([
		'app/libs/jquery/*.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/libs'));
});

gulp.task('img', function() {
	return gulp.src("app/img/*.+(jpg|jpeg|png|gif)")
	    .pipe(imagemin({
	        progressive: true,
	        svgoPlugins: [{ removeViewBox: false }],
	        interlaced: true
	    }))
	    .pipe(gulp.dest("dist/img"))
});

gulp.task("watch", function() {
	gulp.watch("app/*.html", ['html']);
	gulp.watch("app/sass/*.sass", ['sass']);
	gulp.watch("app/libs/*.js", ['libs']);
	gulp.watch("app/js/*.js", ['scripts']);
});

gulp.task('default', ['watch','browser-sync']);