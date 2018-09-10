let gulp = require('gulp'),
    gulpJade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('autoprefixer-stylus'),
    clean = require('gulp-clean'),
    cleanCSS = require('gulp-clean-css'),
    gulpSequence = require('gulp-sequence');

gulp.task('css', () => {
    return gulp.src('./src/stylesheets/styles.styl')
        .pipe(stylus({
            use: [autoprefixer({
                browsers: [
                    'Explorer >= 8',
                    'Edge >= 12',
                    'Opera >= 10.7',
                    'Firefox >= 22',
                    'Chrome >= 20',
                    'Safari >= 6',
                    'Android >= 4',
                    'iOS >= 7'
                ],
                cascade: false,
                remove: false
            })]
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dst/'))
});

gulp.task('jade', () => {
    return gulp.src('./src/templates/*.pug')
        .pipe(gulpJade({
            pretty: true
        }))
        .pipe(gulp.dest('./dst'))
});

gulp.task('clean', () => {
    return gulp.src('./dst', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('watch', () => {
    gulp.watch(['./src/stylesheets/*.styl'], ['css']);
    gulp.watch('./src/templates/*.pug', ['jade']);
});

gulp.task('default', gulpSequence('clean', ['css', 'jade', 'watch']));
gulp.task('build', gulpSequence('clean', ['css', 'jade']));
