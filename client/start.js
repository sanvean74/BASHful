const inquirer = require('inquirer');
// const chalk = require('chalk');
const request = require('superagent');

const REQUEST_URL = require('./requestUrl');

const signinInput = [
  {
    type: 'input',
    name: 'email',
    message: 'Please enter your email'
  },
  {
    type: 'password',
    name: 'password',
    message: 'Please enter a password'
  }
];

const signupInput = [
  {
    type: 'input',
    name: 'name',
    message: 'Please type your name'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Please enter your email'
  },
  {
    type: 'password',
    name: 'password',
    message: 'Please enter a password'
  }
];

const signupPrefs = [
  {
    type: 'list',
    name: 'gender',
    message: 'Please enter your gender',
    choices: ['male', 'female', 'non-binary']
  },
  {
    type: 'number',
    name: 'age',
    message: 'Please enter your age',
    default: 18
  },
  {
    type: 'input',
    name: 'image',
    message: 'Please add a link to your best selfie'
  },
  {
    type: 'checkbox',
    name: 'genderPref',
    message: 'Which gender are you looking to date?',
    choices: ['male', 'female', 'non-binary', 'no preference']
  },
  {
    type: 'number',
    name: 'minPrefAge',
    message: 'What is the youngest you would date?',
    default: 18
  },
  {
    type: 'number',
    name: 'maxPrefAge',
    message: 'What is the oldest you would date?',
    default: 120
  }
];

let chosenThree;

const signinPrompt = () =>
  inquirer.prompt(signinInput)
    .then(answers => {
      let user = {
        email: answers.email,
        password: answers.password
      };
      return request
        .post(`${REQUEST_URL}/api/auth/signin`)
        .send(user)
        .then(({ body }) => body);
    });

const signupPrompt = () =>
  inquirer.prompt(signupInput)
    .then(answers => {
      let user = {
        name: answers.name,
        email: answers.email,
        password: answers.password
      };
      return request
        .post(`${REQUEST_URL}/api/auth/signup`)
        .send(user)
        .then(({ body }) => user = body)
        .then(() => inquirer.prompt(signupPrefs))
        .then(pref => {
          let userPref = {
            gender: pref.gender,
            age: pref.age,
            image: pref.image,
            genderPref: pref.genderPref,
            minPrefAge: pref.minPrefAge,
            maxPrefAge: pref.maxPrefAge
          };
          return request
            .put(`${REQUEST_URL}/api/users/${user._id}`)
            .set('Authorization', user.token)
            .send(userPref);
        })
        .then(({ body }) => {
          return request
            .post(`${REQUEST_URL}/api/matches`)
            .set('Authorization', user.token)
            .send({ minAge: body.minPrefAge, maxAge: body.maxPrefAge, gender: body.genderPref });
        })
        .then(({ body }) => chosenThree = body)
        .then(() => inquirer.prompt(
          {
            type: 'list',
            name: 'matchChoice',
            message: 'Pick your date!',
            choices: [`${chosenThree[0].name}`, `${chosenThree[1].name}`, `${chosenThree[2].name}`]
          }
        ))
        .then(match => {
          console.log(match);
        });
    });


module.exports = { signinPrompt, signupPrompt };