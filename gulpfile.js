var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function() {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./compiled/css'))
        .pipe(bs.reload({stream: true}));
});

gulp.task('default', ['sass'], function() {
    gulp.start('browser-sync');
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
    gulp.watch("*/*.js").on('change', bs.reload);
})