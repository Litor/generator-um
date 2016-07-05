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

      this.log(yosay('Create your own ' + chalk.red('Yeoman') + ' generator with superpowers!'));


      var moduleNamePrompts = [{
        name: 'moduleName',
        message: "What's the name of you module / page?",
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
        message: "What's the page of the page(tab, step,searchtable,searchgrid)?",
        default: 'simple',
        choices: [{
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

          this.prompt(paperDialogPrompts, function(props) {
            this.isPaperDialog = props.isPaperDialog;

            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }
  },

  writing: {
    app: function() {
      this.mkdir(this.moduleName);
      switch (this.type) {
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
