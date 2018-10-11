// var gulp = require('gulp')
//
// gulp.task('copy-views', function () {
//     gulp.src('views/**/*')                    // 选中views文件夹下的所有文件包括子文件中的
//         .pipe(                                        // 管道思想，上一级的输出作为下一级的输入
//             gulp.dest('dist/views')          // 将上诉命令的结果放置dist文件夹中，没有dist文件夹会自动创建
//         )
// })
//
// gulp.task('copy-assets', function () {
//     gulp.src('assets/**/*')                     // 选中views文件夹下的所有文件包括子文件中的
//         .pipe(                                         // 管道思想，上一级的输出作为下一级的输入
//             gulp.dest('dist/assets')         // 将上诉命令的结果放置dist文件夹中，没有dist文件夹会自动创建
//         )
// })

var gulp = require('gulp')   // 引入gulp
var sass = require('gulp-sass') // 将scss文件转换成为css文件
var cleanCss = require('gulp-clean-css') // 压缩css
var rename = require('gulp-rename') // 重命名
var uglify = require('gulp-uglify') // 压缩js
var connect = require('gulp-connect') // 服务器
var babel = require('gulp-babel')

// 复制assets文件夹下的所有东西至dist/assets
gulp.task('copy-assets', function () {
    gulp.src('assets/**/*')
        .pipe(gulp.dest('dist/assets'))
        .pipe(connect.reload())
})

// 复制views文件夹下的所有东西至dist/views
gulp.task('copy-views', function () {
    gulp.src('views/**/*')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})

gulp.task('copy-json', function () {
    gulp.src('json/**/*')
        .pipe(gulp.dest('dist/json'))
        .pipe(connect.reload())
})

// scss文件处理
gulp.task('scss', function () {
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(function (path) {
            path.extname = '.css'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCss())
        .pipe(rename(function (path) {
            path.extname = '.min.css'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})
// scss文件处理
gulp.task('css', function () {
    gulp.src('scss/**/*.css')
    // .pipe(sass().on('error', sass.logError))
        .pipe(rename(function (path) {
            path.extname = '.css'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCss())
        .pipe(rename(function (path) {
            path.extname = '.min.css'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})

// js处理
gulp.task('js', function () {
    gulp.src('js/**/*.js')
    // .pipe(babel())
        .pipe(rename(function (path) {
            path.extname = '.js'
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = '.min.js'
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
})

gulp.task('watch', function () {
    gulp.watch('assets/**/*', ['copy-assets'])
    gulp.watch('views/**/*', ['copy-views'])
    gulp.watch('json/**/*', ['copy-json'])
    gulp.watch('scss/**/*.scss', ['scss'])
    gulp.watch('scss/**/*.css', ['css'])
    gulp.watch('js/**/*.js', ['js'])
})
gulp.task('server', function () {
    connect.server({
        root: 'dist',
        livereload: true
    })
})


// 一起执行指令
gulp.task('build', ['copy-assets', 'copy-views', 'scss', 'js', 'css', 'copy-json'], function () {
    console.log('ok')
})

gulp.task('default', ['build', 'watch', 'server'])