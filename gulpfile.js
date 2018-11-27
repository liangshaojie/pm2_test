"use strict";

//1.0 导入需要的资源
var gulp = require("gulp");

// 保证任务执行的顺序
const runSequence = require("run-sequence");

// 运行之前，把dist目录干掉
const clean = require("gulp-clean");

//2.0 gulp来执行任务，默认会执行defalut的任务
//定义任务,gulp默认执行名称为default的任务
//将来我们只需要执行：gulp所有任务全部搞定
gulp.task('default', () => {
    console.log('default执行完毕!')
    // 先执行 clean ，再执行压缩js，css，html等任务
    runSequence('clean', ['es6toes5anduglify', 'htmlmin'])
})


const babel = require("gulp-babel"); //es6转es5需要的包
const uglify = require(" "); //js压缩需要的包

gulp.task("es6toes5anduglify", () => {
    gulp
        .src(["./src/controllers/*.js", "./src/routers/*.js", "./src/tools/*.js", "./src/app.js"], {
            base: "src"
        })
        .pipe(babel({ presets: ["@babel/env"] }))
        .pipe(uglify()) //压缩js （一定是要先转成es5语法以后再压缩）
        .pipe(gulp.dest("dist"));
});

//4.0 压缩css
//导入需要的包
const mincss = require("gulp-clean-css"); //压缩css的包
const rev = require('gulp-rev')

gulp.task("mincss", () => {
    gulp
        .src(["./src/statics/css/*.css"], { base: "src" })
        .pipe(mincss({ compatibility: "ie8" })) //兼容IE8
        .pipe(rev()) // 生成文件指纹
        .pipe(gulp.dest("dist"))
        .pipe(rev.manifest()) // 生成清单文件
        .pipe(gulp.dest("./rev"));
});


//5.0 对html进行压缩
const htmlmin = require("gulp-htmlmin"); //压缩html的
const revCollector = require('gulp-rev-collector');

gulp.task("htmlmin", ['mincss'], () => {
    gulp
        .src(["./rev/*.json", "./src/statics/views/*.html"], { base: "src" })
        .pipe(revCollector()) // 对html中引用的样式和脚本链接进行更新
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                minifyJS: true,
                removeComments: true
            })
        ) //表示将空白行及换行都压缩掉
        .pipe(gulp.dest("dist"));
});

//6.0 执行清楚任务，删除掉dist,rev目录
gulp.task("clean", function () {
    return gulp.src(["dist"]).pipe(clean());
});
