const inquirer = require('inquirer');
const { signinPrompt, signupPrompt, aboutUsPrompt } = require('./dateApp');
const terminalImage = require('terminal-image');

const startApp = [{
  type: 'list',
  name: 'start',
  message: 'BASHful: A Terminal Date Simulator \n',
  choices: ['Sign In', 'Sign Up', 'Meet the Devs']
}];

const bashfulLogo = 'assets/images/BASHful-small.png';

const dateApp = () => {
  return terminalImage.file(bashfulLogo)
    .then(img => console.log(img))
    .then(() => inquirer.prompt(startApp))
    .then(answers => {    
      switch(answers.start) {
        case 'Sign In' :
          signinPrompt().then(dateApp);
          break;
        case 'Sign Up' :
          signupPrompt().then(dateApp);
          break;
        case 'Meet the Devs' :
          aboutUsPrompt().then(dateApp);
          break;
      }    
    })
    .catch(err => {
      console.log('error:', err);
    });
};

module.exports = dateApp;