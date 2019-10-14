const inquirer = require('inquirer');
const { signinUser, signupUser } = require('../e2e/data-helpers');

const startApp = [{
  type: 'list',
  name: 'start',
  message: 'BASHful A Terminal Date Simulator',
  choices: ['sign in', 'sign up']
}];

const dateApp = () => inquirer.prompt(startApp)
  .then(answers => {
    switch(answers.start) {
      case 'Sign In' :
        signinUser();
        break;
      case 'Sign Up' :
        signupUser();
        break;
    }
  });

module.exports = dateApp;