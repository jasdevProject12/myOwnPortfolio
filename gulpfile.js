var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function() {
	return gulp.src("static/css/*.scss")
	.pipe(sass()).pipe(gulp.dest("static/css"));
});
gulp.task('default', ['sass'], function() {
	try {
	    gulp.watch("static/css/*.scss",['sass']);
	} catch (error) {
		console.log(error);
	}
});