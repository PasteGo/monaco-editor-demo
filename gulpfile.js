const gulp       = require("gulp");
const clean      = require('gulp-clean');
const concat     = require('gulp-concat');
const htmlmin    = require('gulp-html-minifier');
const merge      = require('merge-stream');

const destDIR = "./dest";

function cleanFile(source) {
    return gulp.src(source)
               .pipe(clean({force: true}));
}

function cleanDest() {
    return cleanFile([destDIR + "/*"]);
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
    return htmlMin("./src/*.html", destDIR);
}

function copy() {
    return merge([
        {"src": "./src/samples/**/*", "dest": "./dest/samples"},
        {"src": "./src/config.json", "dest": "./dest"}
    ].map((item) => {
        return gulp.src(item.src).pipe(gulp.dest(item.dest));
    }));
}

exports.cleanDest = cleanDest;
exports.gao = gao;
exports.copy = copy;
exports.default = gulp.series(
    cleanDest, 
    gulp.parallel(gao, copy)
);

