import gulp from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import rename from 'gulp-rename'
import gutil from 'gulp-util'
import path from 'path'
import { exec } from 'child_process'

const browserSync = require('browser-sync').create();

const compile = () => {
  gulp.src(path.normalize('components/**.js'))
    .pipe(babel())
    .on('error', gutil.log)
    .pipe(gulp.dest('lib'))
    .on('end', () => exec(
      `${path.normalize('./node_modules/.bin/mjml')} index.mjml`,
      (error, stdout) => {
        console.log(stdout)
        console.log('> MJML compilation finished')
      }
    ))
}

gulp.task('build', compile)

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: '.'
    },
    files: '**/*.html',
    open: true
  })

  compile()
  return watch([
    path.normalize('components/**.js'),
    path.normalize('index.mjml'),
  ], compile)
})
