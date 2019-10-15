const inquirer = require('inquirer');
const { signinPrompt, signupPrompt } = require('./start');

const startApp = [{
  type: 'list',
  name: 'start',
  message: 'BASHful A Terminal Date Simulator',
  choices: ['Sign In', 'Sign Up']
}];

const dateApp = () => inquirer.prompt(startApp)
  .then(answers => {
    console.log(answers);
    
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