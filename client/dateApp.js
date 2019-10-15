const inquirer = require('inquirer');
const { signinPrompt, signupPrompt } = require('./start');
const request = require('superagent');

const REQUEST_URL = require('./requestUrl');

const startApp = [{
  type: 'list',
  name: 'start',
  message: 'BASHful A Terminal Date Simulator',
  choices: ['Sign In', 'Sign Up']
}];

const matchChoices = [
  {

  }
]

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
  })
  
  .then(user => {
    return request
      .post(`${REQUEST_URL}/api/matches`)
      .set('Authorization', user.token)
      .send(user.minPrefAge, user.maxPrefAge, user.genderPref)
      .then(({ body }) => body);
  })
  .then(() => {
    inquirer.prompt()
  })

module.exports = dateApp;