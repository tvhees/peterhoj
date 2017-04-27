var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var fs = require('fs');
var replace = require('gulp-replace-task');
var runSequence = require('run-sequence');
var del = require('del');
var folderNames = [];
var imgNames = [];

gulp.task('build', function (callback) {
    runSequence(
        'build-clean',
        ['build-sass', 'read-images'],
        ['images-copy', 'fonts-copy', 'media-copy', 'build-javascript', 'html'],
        callback
    );
});

gulp.task('build-dist', function (callback) {
    runSequence(
        'build-clean',
        ['build-sass', 'read-images'],
        ['images-copy', 'fonts-copy', 'build-javascript', 'html'],
        callback
    ).
    pipe(gulp.dest('./dist'));
});

gulp.task('build-clean', function () {
    return del(['./compiled']);
});

gulp.task('build-sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./compiled/css'));
});

gulp.task('read-images', function (callback) {
    var folders = fs.readdirSync('./img');
    imgNames = [];
    folderNames = [];
    folders.forEach(function (folder) {
        folderNames.push(folder);
        imgNames.push(fs.readdirSync('./img/' + folder));
    });
    callback();
});

gulp.task('images-copy', function () {
    return gulp.src('./img/*/*.{png,gif,jpg}')
        .pipe(gulp.dest('./compiled/img'));
});

gulp.task('fonts-copy', function(){
    return gulp.src('./fonts/*.ttf')
        .pipe(gulp.dest('./compiled/fonts'))
});

gulp.task('media-copy', function(){
    return gulp.src('./media/*.*')
        .pipe(gulp.dest('./compiled/media'))
});

gulp.task('build-javascript', function () {
    return gulp.src('scripts/*.js')
        .pipe(replace({
            patterns: [
                {
                    match: 'images',
                    replace: imgNames
                },
                {
                    match: 'folders',
                    replace: folderNames
                }
            ]
        }))
        .pipe(gulp.dest('./compiled/scripts'));
});

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('./compiled'))
})

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./compiled"
        }
    });
});

gulp.task('default', ['build'], function() {
    gulp.start('browser-sync');
    gulp.watch('./scss/*.scss', ['build-sass']).on('change', bs.reload);
    gulp.watch('./img/', ['read-images', 'build-javascript']).on('change', bs.reload);
    gulp.watch('*.html', ['html']).on('change', bs.reload);
    gulp.watch('*/*.js', ['build-javascript']).on('change', bs.reload);
})