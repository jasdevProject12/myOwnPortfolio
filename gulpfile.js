var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function() {
	return gulp.src("static/css/*.scss")
	.pipe(sass()).pipe(gulp.dest("static/css"));
});
gulp.task('default', function() {
	    gulp.watch("static/css/*.scss",['sass']);
});