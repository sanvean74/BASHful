const request = require('../request');
const { dropCollection } = require('../db');

describe('Answers API', () => {
  beforeEach(() => dropCollection('answers'));
  beforeEach(() => dropCollection('users'));

  const userData = {
    email: 'user@user.com',
    password: 'abc123',
    roles: [],
    name: 'Evan',
    gender: 'male',
    age: 27,
    genderPref: 'female'
  };

  let user;

  beforeEach(() => {
    return request
      .post('/api/auth/signup')
      .send(userData)
      .then(({ body }) => (user = body));
  });

  it('posts answers', () => {
    console.log(user);
    return request
      .post('/api/answers')
      .send({
        answers: ['Evan', 'female', 23, 30]
      })
      .set('Authorization', user.token)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            user: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "answers": Array [
              "Evan",
              "female",
              "23",
              "30",
            ],
            "user": Any<String>,
          }
        `
        );
      });
  });
});
