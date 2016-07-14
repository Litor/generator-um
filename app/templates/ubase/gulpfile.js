var gulp = require('gulp');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var zip = require('gulp-zip');
var amdOptimize = require("amd-optimize");
var uglify = require('gulp-uglify');
var fs = require('fs');
var hogan = require("hogan.js");

gulp.task('serve', function() {
  connect.server({
    port: 9001
  });
});

gulp.task('default', ['concat_css'], function(cb) {
  gulp.watch('**/*.css', function() {
    gulp.run('concat_css');
  });

  runSequence('serve', cb);
});

gulp.task('concat_css', function() {
  return gulp.src(['public/css/framework.css', 'modules/**/*.css', 'public/commonpage/**/*.css'])
    .pipe(concat('base.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('zip', function() {
  return gulp.src('dest/**')
    .pipe(zip('FEApp.zip'))
    .pipe(gulp.dest('dest'));
});

gulp.task('copy_to_dest', function() {
  return gulp.src(['**/*.*', '!node_modules/**/*.*']).pipe(gulp.dest('dest/'));
});

gulp.task('clean', function() {
  return del(['dest/modules/**/*.css', 'dest/public/css/framework.css']);
});

gulp.task('generateConfigFile', function() {
  var modulesDir = fs.readdirSync('./modules');
  var modulesArray = ["'config'"];

  for (var i = 0; i < modulesDir.length; i++) {
    modulesArray.push("'./modules/" + modulesDir[i] + "/" + modulesDir[i] + "'");
  }

  var str = 'require([' + modulesArray.join(',\r\t') + '])';
  fs.writeFileSync('./buildConfig.js', str);
});

gulp.task('generateMockFile', function() {
  fs.writeFileSync('./dest/tempConfig.js', 'require.config({baseUrl: "./",paths: {"utils": "./dest/utils","configUtils": "./dest/configUtils","router": "./dest/router",}});');
  fs.writeFileSync('./dest/utils.js', "define(function(require, exports, module) {return ''});");
  fs.writeFileSync('./dest/configUtils.js', "define(function(require, exports, module) {return ''});");
  fs.writeFileSync('./dest/router.js', "define(function(require, exports, module) {return ''});");
});

gulp.task('mergeModules', function() {
  return gulp.src(["modules/**/*.js"])
    // Traces all modules and outputs them in the correct order.
    .pipe(amdOptimize.src("buildConfig", {
      configFile: "./dest/tempConfig.js",
      findNestedDependencies: false,
      exclude: ['configUtils', 'router', 'utils']
    }))
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dest/"));
});

function getHtmlTeplate(basedir, dir, output, relativeDir) {
  var moduleDir = fs.readdirSync(basedir + dir);
  for (var j = 0; j < moduleDir.length; j++) {
    getHtmlTeplateInner(basedir, dir, output, relativeDir, moduleDir[j]);
  }
}

function getHtmlTeplateInner(basedir, dir, output, relativeDir, moduleDir) {
  if (moduleDir.indexOf('.html') > 0) {
    var fileName = moduleDir.substring(0, moduleDir.indexOf('.html'));
    var fileContent = fs.readFileSync(basedir + dir + '/' + moduleDir, "utf-8");
    fileContent = hogan.compile(fileContent, {
      asString: true
    });
    output.push('__Template["' + relativeDir + fileName + '"]=' + fileContent + ';');
  } else if (moduleDir.indexOf('.') === -1) {
    getHtmlTeplate(basedir + dir + '/', moduleDir, output, dir + '/');
  }
}

gulp.task('template', function() {
  var modulesDir = fs.readdirSync('./modules');
  var output = [
    "var __Template={};"
  ];

  for (var i = 0; i < modulesDir.length; i++) {
    getHtmlTeplate('./modules/', modulesDir[i], output, '');
  }

  fs.writeFileSync("./dest/template.js", output.join('\r'), "utf-8");
});

gulp.task('mergetemplate', function() {
  return gulp.src(['./dest/template.js', './dest/configwrap.js', './dest/app.js'])
    .pipe(concat("package.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dest/"));
});

gulp.task('buildappcss', function() {
  return gulp.src(['./public/css/base.js', './public/css/style.css'])
    .pipe(concat('all.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest("dest/"));
});

gulp.task('generateFixedConfigFile', function() {
  var modulesArray = ["'config'"];

  var str = 'require([' + modulesArray.join(',\r\t') + '])';
  fs.writeFileSync('./buildConfig.js', str);
});

gulp.task('fixedConfigWrap', function() {
  return gulp.src(["./config.js"])
    .pipe(amdOptimize.src("buildConfig", {
      findNestedDependencies: false
    }))
    .pipe(concat("configwrap.js"))
    .pipe(gulp.dest("dest/"));
});

gulp.task('clearDest', function() {
  return del(['dest/**/*', '!dest/package.js', '!dest/all.css', '!dest/appcore.js', '!dest/appcore-min.js', '!dest/commonlib.js']);
});

gulp.task('build', function() {
  runSequence('buildappcss', 'generateConfigFile', 'generateMockFile', 'mergeModules', 'generateFixedConfigFile', 'fixedConfigWrap', 'template', 'mergetemplate', 'clearDest');
});
