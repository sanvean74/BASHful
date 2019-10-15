const inquirer = require('inquirer');
const chalk = require('chalk');
//const agent = require('./requester');
const { signinUser, signupUser } = require('../e2e/data-helpers');
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
    name:'name',
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
        .then(({ body }) => body);
    });

module.exports = { signinPrompt, signupPrompt };