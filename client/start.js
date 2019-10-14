const inquirer = require('inquirer');
const chalk = require('chalk');

const signinInputs = [
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

const signupInputs = [
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

module.exports = { signinInputs, signupInputs };