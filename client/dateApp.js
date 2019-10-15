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
    type: 'list',
    name: 'matchChoice',
    message: 'Pick your date!',
    choices: ['date1', 'date2', 'date3']
  }
];

let matchesReturned = {};

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
  
  // .then(user => {
  //   return request
  //     .post(`${REQUEST_URL}/api/matches`)
  //     .set('Authorization', user.token)
  //     .send(user.minPrefAge, user.maxPrefAge, user.genderPref)
  //     .then(({ body }) => matchesReturned = body);
  // })
  // .then(() => {
  //   inquirer.prompt(matchChoices)
  //     .then(match => {
  //       console.log(match);
        
  //     });
  // });

module.exports = dateApp;