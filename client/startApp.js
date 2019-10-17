const inquirer = require('inquirer');
const { signinPrompt, signupPrompt, aboutUsPrompt } = require('./dateApp');

const startApp = [{
  type: 'list',
  name: 'start',
  message: 'BASHful: A Terminal Date Simulator \n',
  choices: ['Sign In', 'Sign Up', 'Meet the Devs']
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
      case 'Meet the Devs' :
        aboutUsPrompt().then(dateApp);
        break;
    }    
  })
  .catch(err => {
    console.log('error:', err);
  });

module.exports = dateApp;