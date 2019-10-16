const inquirer = require('inquirer');
const { signinPrompt, signupPrompt } = require('./dateApp');

const startApp = [{
  type: 'list',
  name: 'start',
  message: 'BASHful A Terminal Date Simulator',
  choices: ['Sign In', 'Sign Up']
}];

const dateApp = () => inquirer.prompt(startApp)
  .then(answers => {    
    switch(answers.start) {
      case 'Sign In' :
        signinPrompt();
        break;
      case 'Sign Up' :
        signupPrompt();
        break;
    }    
  });

module.exports = dateApp;