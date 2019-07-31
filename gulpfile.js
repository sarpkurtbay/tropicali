var gulp = require('gulp');
var sass = require('gulp-sass');
var CleanCSS = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');



gulp.task("sass", function() {
    // return the scss file as css file
    return gulp.src("src/css/app.scss")
        // start creating the sourcemap for the changes otherwise minified css will be on one row
        .pipe(sourcemaps.init())
        // change the scss to css
        .pipe(sass())
        // not sure about this one (below)
        .pipe(
            CleanCSS({ 
                compatibility: 'ie8' 
            })
        )
        // write the "real" locations or rows of code so that they can be viewed with the dev inspector tools
        .pipe(sourcemaps.write())
        // put the css file in the folder called "dist"
        .pipe(gulp.dest("dist"))
        // sync the browser to update
        .pipe(browserSync.stream());
})

gulp.task("html", function(){
    // "copy" the index.html file in the src folder and paste it into "dist" folder
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function() {
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function() {
    return gulp.src("src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))

})


gulp.task("watch", function () {
    // run in the background until stopped if the task "watch" has been started (see below)

    // sync the browser
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    // watch for any changes in the src/index.html, if there's a change, run the task called "html"
    gulp.watch("src/*.index", ["html"]).on('change', browserSync.reload);

    // watch for any changes in the src/css/app.css, if there's a change, run the task called "sass"
    gulp.watch("src/css/app.scss", ["sass"])

    gulp.watch("src/fonts/*", ["fonts"])

    gulp.watch("src/img/*", ["images"])
})

// run as the default when gulp has been started in the command line
// start by running the tasks: "html", "sass" and "watch" (which runs until it's paused with ctrl + C )
gulp.task('default', ["html", "sass", "watch", "fonts", "images"]);
  
