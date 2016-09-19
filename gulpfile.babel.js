'use strict';

import gulp from 'gulp';
const $ = require('gulp-load-plugins')({lazy:true});

gulp.task('compile:sass', () => {
    return gulp.src('./development/sass/styles.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['last 2 version', '>5%']}))
        .pipe(gulp.dest('./client/css'));
});

