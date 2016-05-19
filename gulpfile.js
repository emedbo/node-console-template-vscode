var gulp        = require("gulp"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    sourcemaps  = require("gulp-sourcemaps"),
    uglify      = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    mocha       = require("gulp-mocha"),
    istanbul    = require("gulp-istanbul");
    
var tsProject = tsc.createProject("tsconfig.json");
var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task('build-app', function () {
    return gulp.src([
        'source/**/*.ts'
    ])
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject))
    .js
    .pipe(sourcemaps.write('.', {
        sourceRoot: ""
    }))
    .pipe(gulp.dest('source/'));
});

gulp.task("build-test", function() {
    return gulp.src([
            "test/**/*.ts"
        ])
        .pipe(tsc(tsTestProject))
        .js.pipe(gulp.dest("test/"));
});

gulp.task("build", function(cb) {
    runSequence(["build-app", "build-test"], cb);
});

//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("istanbul:hook", function() {
    return gulp.src(['source/**/*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["build", "istanbul:hook"], function() {
    return gulp.src('test/**/*.test.js')
        .pipe(mocha({ui: 'bdd'}))
        .pipe(istanbul.writeReports());
});