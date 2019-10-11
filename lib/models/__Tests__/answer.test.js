const Answer = require('../answer');
const User = require('../user');

describe('Answer Model', () => {
  it('Valid User Model', () => {
    const userData = {
      email: 'user@user.com',
      password: 'abc123',
      roles: [],
      name: 'Evan',
      gender: 'male',
      age: 27,
      genderPref: 'female'
    };
    const user = new User(userData);

    const answerData = {
      answers: ['Evan', 'female', 23, 30],
      user: user._id
    };
    
    const answer = new Answer(answerData);

    expect(answer.validateSync()).toBeUndefined();
  });
});