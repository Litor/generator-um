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
        message: "What's the name of you module?",
        default: 'moduleName'
      }];

      var prompts = [{
        name: 'type',
        message: "What's the page of the page(tab, step,searchtable,searchgrid)?",
        default: 'type'
      }];

      this.prompt(moduleNamePrompts, function(props) {
        this.moduleName = props.moduleName;
        this.prompt(prompts, function(props) {
          this.type = props.type;

          done();
        }.bind(this));
      }.bind(this));
    }
  },

  writing: {
    app: function() {
      this.mkdir(this.moduleName);
      switch (this.type) {
        case 'searchtable':
          this.template(this.type + '/mock.js', this.moduleName + '/mock.js');
          this.template(this.type + '/umodule1.css', this.moduleName + '/' + this.moduleName + '.css');
          this.template(this.type + '/umodule1.js', this.moduleName + '/' + this.moduleName + '.js');
          this.template(this.type + '/umodule1BS.js', this.moduleName + '/' + this.moduleName + 'BS.js');
          this.template(this.type + '/umodule1IndexPage.html', this.moduleName + '/' + this.moduleName + 'IndexPage.html');
          break;

      }
    }
  }
});
