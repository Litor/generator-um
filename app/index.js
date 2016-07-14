'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: {
    askFor: function() {
      var done = this.async();

      this.log(yosay('Create your own ' + chalk.red('ubase page') + ' generator with superpowers!'));


      var moduleNamePrompts = [{
        name: 'moduleName',
        message: "What's the name of you app / page?",
        default: 'moduleName'
      }];

      var paperDialogPrompts = [{
        name: 'isPaperDialog',
        type: 'confirm',
        defaults: false,
        message: "does page show in paperdialog?",
      }];

      var prompts = [{
        name: 'type',
        type: 'list',
        message: "What's the type do you want?",
        default: 'simple',
        choices: [{
          name: 'ubase',
          value: 'ubase'
        }, {
          name: 'simple',
          value: 'simple'
        }, {
          name: 'searchtable',
          value: 'searchtable'
        }, {
          name: 'searchgrid',
          value: 'searchgrid',
        }, {
          name: 'searchcard',
          value: 'searchcard',
        }, {
          name: 'emapform',
          value: 'emapform',
        }, {
          name: 'emapformoutline',
          value: 'emapformoutline',
        }, {
          name: 'propertydialog',
          value: 'propertydialog',
        }, {
          name: 'tab',
          value: 'tab',
        }, {
          name: 'tabiframe',
          value: 'tabiframe',
        }, {
          name: 'wizard',
          value: 'wizard',
        }]
      }];

      this.prompt(moduleNamePrompts, function(props) {
        this.moduleName = props.moduleName;
        this.prompt(prompts, function(props) {
          this.type = props.type;

          if (this.type === 'ubase') {
            done();
          } else {
            this.prompt(paperDialogPrompts, function(props) {
              this.isPaperDialog = props.isPaperDialog;
              done();
            }.bind(this));
          }
        }.bind(this));
      }.bind(this));
    }
  },

  writing: {
    app: function() {
      this.mkdir(this.moduleName);
      switch (this.type) {
        case 'ubase':
          this.mkdir(this.moduleName + '/modules');
          this.mkdir(this.moduleName + '/public/commonpage');
          this.mkdir(this.moduleName + '/public/css');
          this.mkdir(this.moduleName + '/public/images');
          this.copy(
            this.templatePath(this.type + '/style.css'),
            this.destinationPath(this.moduleName + '/public/css/style.css')
          );
          this.copy(
            this.templatePath(this.type + '/logo.png'),
            this.destinationPath(this.moduleName + '/public/images/logo.png')
          );
          this.copy(
            this.templatePath(this.type + '/user.png'),
            this.destinationPath(this.moduleName + '/public/images/user.png')
          );
          this.copy(
            this.templatePath(this.type + '/config.js'),
            this.destinationPath(this.moduleName + '/config.js')
          );
          this.copy(
            this.templatePath(this.type + '/.editorconfig'),
            this.destinationPath(this.moduleName + '/.editorconfig')
          );
          this.copy(
            this.templatePath(this.type + '/.eslintrc'),
            this.destinationPath(this.moduleName + '/.eslintrc')
          );
          this.copy(
            this.templatePath(this.type + '/gulpfile.js'),
            this.destinationPath(this.moduleName + '/gulpfile.js')
          );
          this.copy(
            this.templatePath(this.type + '/index.html'),
            this.destinationPath(this.moduleName + '/index.html')
          );
          this.copy(
            this.templatePath(this.type + '/package.json'),
            this.destinationPath(this.moduleName + '/package.json')
          );
          break;
        case 'simple':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          this.template(this.type + '/umodule1IndexPage.html', this.moduleName + '/' + this.moduleName + 'IndexPage.html');
          break;

        case 'searchtable':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          this.template(this.type + '/umodule1IndexPage.html', this.moduleName + '/' + this.moduleName + 'IndexPage.html');
          break;

        case 'searchgrid':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          this.template(this.type + '/umodule1CardTpl.html', this.moduleName + '/' + this.moduleName + 'CardTpl.html');
          this.template(this.type + '/umodule1IndexPage.html', this.moduleName + '/' + this.moduleName + 'IndexPage.html');
          break;

        case 'searchcard':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          this.template(this.type + '/umodule1CardTpl.html', this.moduleName + '/' + this.moduleName + 'CardTpl.html');
          this.template(this.type + '/umodule1IndexPage.html', this.moduleName + '/' + this.moduleName + 'IndexPage.html');
          break;

        case 'emapform':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          this.template(this.type + '/umodule1IndexPage.html', this.moduleName + '/' + this.moduleName + 'IndexPage.html');
          break;

        case 'emapformoutline':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          this.template(this.type + '/umodule1IndexPage.html', this.moduleName + '/' + this.moduleName + 'IndexPage.html');
          break;

        case 'tab':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          this.template(this.type + '/umodule1IndexPage.html', this.moduleName + '/' + this.moduleName + 'IndexPage.html');
          this.template(this.type + '/umodule1TabTpl.html', this.moduleName + '/' + this.moduleName + 'TabTpl.html');
          break;

        case 'tabiframe':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          this.template(this.type + '/umodule1IndexPage.html', this.moduleName + '/' + this.moduleName + 'IndexPage.html');
          this.template(this.type + '/umodule1TabTpl.html', this.moduleName + '/' + this.moduleName + 'TabTpl.html');
          break;

        case 'wizard':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          this.template(this.type + '/umodule1IndexPage.html', this.moduleName + '/' + this.moduleName + 'IndexPage.html');
          break;

        case 'propertydialog':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          break;
      }
    }
  }
});
