var gulp = require('gulp');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var del = require('del');
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

gulp.task('copy_to_dest', function() {
  return gulp.src(['**/*.*', '!node_modules/**/*.*']).pipe(gulp.dest('dest/'));
});

gulp.task('clean', function() {
  return del(['dest/modules/**/*.css', 'dest/public/css/framework.css']);
});

gulp.task('generateConfigFile', function() {
  var modulesDir = fs.readdirSync('./modules');
  var modulesArray = [];

  for (var i = 0; i < modulesDir.length; i++) {
    modulesArray.push("'./modules/" + modulesDir[i] + "/" + modulesDir[i] + "'");
  }

  var str = "var ___divider____ = '___';require([" + modulesArray.join(',\r\t') + "])";
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
    .pipe(gulp.dest("dest/"));
});

gulp.task('removeConfigInApp', function() {
  var fileContent = fs.readFileSync('./dest/app.js', "utf-8");
  var realFileContent = '';

  var index = fileContent.indexOf("var ___divider____ = '___';");
  realFileContent = fileContent.substr(0, index);

  fs.writeFileSync("./dest/app.js", realFileContent, "utf-8");
});

function getHtmlTeplate(basedir, output) {
  var moduleDir = fs.readdirSync(basedir);
  for (var j = 0; j < moduleDir.length; j++) {
    getHtmlTeplateInner(basedir, output, moduleDir[j]);
  }
}

function getHtmlTeplateInner(basedir, output, moduleDir) {
  if (moduleDir.indexOf('.html') > 0) {
    var fileName = moduleDir.substring(0, moduleDir.indexOf('.html'));
    var fileContent = fs.readFileSync(basedir + '/' + moduleDir, "utf-8");
    fileContent = hogan.compile(fileContent, {
      asString: true
    });
    output.push('__Template["' + basedir + fileName + '"]=' + fileContent + ';');
  } else if (moduleDir.indexOf('.') === -1) {
    getHtmlTeplate(basedir + moduleDir + '/', output);
  }
}

gulp.task('template', function() {
  var modulesDir = fs.readdirSync('./modules');
  var commonpage = fs.readdirSync('./public/commonpage');
  var output = [
    "var __Template={};"
  ];

  for (var i = 0; i < modulesDir.length; i++) {
    getHtmlTeplate('./modules/' + modulesDir[i] + '/', output);
  }

  for (var j = 0; j < commonpage.length; j++) {
    getHtmlTeplate('./public/commonpage/' + commonpage[j] + '/', output);
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
  return gulp.src(['./public/css/base.css', './public/css/style.css'])
    .pipe(concat('all.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest("dest/"));
});

gulp.task('generateFixedConfigFile', function() {
  var modulesArray = [];

  var str = 'require([' + modulesArray.join(',\r\t') + '])';
  fs.writeFileSync('./buildConfig.js', str);
});

gulp.task('fixedConfigWrap', function() {
  return gulp.src([])
    .pipe(amdOptimize.src("buildConfig", {
      findNestedDependencies: false
    }))
    .pipe(concat("configwrap.js"))
    .pipe(gulp.dest("dest/"));
});

gulp.task('clearDest', function() {
  return del(['buildConfig.js', 'dest/**/*', '!dest/package.js', '!dest/all.css', '!dest/appcore.js', '!dest/appcore-min.js', '!dest/commonlib.js']);
});

gulp.task('build', function() {
  runSequence('buildappcss', 'generateConfigFile', 'generateMockFile', 'mergeModules', 'removeConfigInApp', 'generateFixedConfigFile', 'fixedConfigWrap', 'template', 'mergetemplate', 'clearDest');
});
