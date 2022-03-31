const { dest, src, series, parallel } = require('gulp')
const gulp = require('gulp')
const browsersync = require('browser-sync').create()
const del = require('del')
const scss = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const group_media = require('gulp-group-css-media-queries')
const panini = require('panini')
const ttf_to_woff = require('gulp-ttf-to-woff')


function browserSync() {
	browsersync.init({
		server: {
			baseDir: './dist/',
		},
		port: 3000,
		notify: false,
		open: false,
	})
}

// Refresh functions
function html() {
	panini.refresh();
	return src('./src/*.html')
		.pipe(
			panini({
				root: './src/',
				layouts: './src/layouts/',
				partials: './src/partials/',
			})
		)
		.pipe(dest('./dist/'))
		.pipe(browsersync.stream())
}

function css() {
	return src('./src/assets/scss/style.scss')
		.pipe(
			scss({
				outputStyle: 'expanded',
			})
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
			})
		)
		.pipe(dest('./dist/css/'))
		.pipe(browsersync.stream())
}

function img() {
	return src('./src/assets/img/*.{jpg,jpeg,png,ico,svg,gif,webp}')
		.pipe(dest('./dist/img/')
		)
}

function js() {
	return src('./src/assets/js/*.js')
		.pipe(dest('./dist/js/'))
		.pipe(browsersync.stream())
}

function fonts() {
	return src('./src/assets/fonts/*.woff')
		.pipe(dest('./dist/fonts/'))
		.pipe(browsersync.stream())
}

function watchFiles() {
	gulp.watch(['./src/**/*.html'], html)
	gulp.watch(['./src/assets/scss/*.scss', './src/assets/scss/blocks/*.scss'], css)
	gulp.watch(['./src/assets/img/*.{jpg,jpeg,png,ico,svg,gif,webp}'], img)
	gulp.watch(['./src/assets/js/*.js'], js)
}

function cleanDist() {
	return del('dist');
}

gulp.task('toWoff', () => {
	src('./src/assets/fonts/*.ttf')
		.pipe(ttf_to_woff())
		.pipe(dest('./src/assets/fonts/'))
		.pipe(dest('./dist/fonts/'))
	return del('./src/assets/fonts/*.ttf')

})


exports.default = parallel(
	series(cleanDist, fonts, parallel(html, css, js), img),
	watchFiles,
	browserSync
)

exports.build = parallel(
	series(cleanDist, fonts, parallel(html, css, js), img))