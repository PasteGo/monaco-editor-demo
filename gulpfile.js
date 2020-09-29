const gulp       = require("gulp");
const clean      = require('gulp-clean');
const concat     = require('gulp-concat');
const htmlmin    = require('gulp-html-minifier');
const merge      = require('merge-stream');

const distDIR = "./dist";

function cleanFile(source) {
    return gulp.src(source)
               .pipe(clean({force: true}));
}

function cleanDist() {
    return cleanFile([distDIR + "/*"]);
}

function htmlMin(source, destion) {
	return gulp.src(source)
		.pipe(htmlmin({
			removeComments: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			removeEmptyAttributes: true,
			collapseBooleanAttributes: true,
			collapseWhitespace: true,
			minifyJS: true,
			minifyCSS: true
		}))
		.pipe(concat('index.html'))
		.pipe(gulp.dest(destion));
}

function gao() {
    return htmlMin("./src/*.html", distDIR);
}

function copy() {
    return merge([
        {"src": "./src/samples/**/*", "dist": distDIR + "/samples"},
        {"src": "./src/config.json", "dist": distDIR}
    ].map((item) => {
        return gulp.src(item.src).pipe(gulp.dest(item.dist));
    }));
}

exports.cleanDist = cleanDist;
exports.gao = gao;
exports.copy = copy;
exports.default = gulp.series(
    cleanDist, 
    gulp.parallel(gao, copy)
);

