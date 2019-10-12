const request = require('../request');
const db = require('../db');
const { signupUser, signinUser } = require('../data-helpers');


describe('users api', () => {
  beforeEach(() => {
    return db.dropCollection('users');
  });

  const testUser = {
    email: 'user@user.com',
    password: 'abc123',
    name: 'Bill'
  };

  let user = null;
  beforeEach(() => {
    return signupUser(testUser)
      .then(() => {
        return signinUser(testUser)
          .then(body => user = body);
      });
  });

  const player = {
    age: 18,
    minPrefAge: 18,
    maxPrefAge: 120,
    gender: 'non-binary',
    genderPref: 'non-binary'
  };

  it('updates user extra fields', () => {
    return request
      .put(`/api/users/${user._id}`)
      .set('Authorization', user.token)
      .send(player)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          email: expect.any(String),
          name: expect.any(String),
          hash: expect.any(String),
          _id: expect.any(String),
          __v: 0,
          ...player
        });
      });

  });
});