const request = require('../request');
const db = require('../db');
const { signupUser, signinUser } = require('../data-helpers');

describe('matches api', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('matches'));

  const testUser = {
    email: 'user@user.com',
    password: 'abc123',
    name: 'Bill'
  };

  const player = {
    age: 18,
    minPrefAge: 18,
    maxPrefAge: 120,
    gender: ['non-binary'],
    genderPref: ['non-binary']
  };

  let user = null;
  beforeEach(() => {
    return signupUser(testUser).then(() => {
      return signinUser(testUser).then(res => {
        user = res;
        return request
          .put(`/api/users/${user._id}`)
          .set('Authorization', user.token)
          .send(player)
          .expect(200)
          .then(({ body }) => {
            user = body;
            user.token = res.token;
          });
      });
    });
  });

  it('post a match for this user', () => {
    return request
      .post('/api/matches')
      .set('Authorization', user.token)
      .send({
        minAge: user.minPrefAge,
        maxAge: user.maxPrefAge,
        gender: user.genderPref
      })
      .expect(200)
      .then(({ body }) => {
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            age: expect.any(Number),
            gender: [expect.any(String)],
            image: expect.any(String),
            location: {
              city: expect.any(String),
              state: expect.any(String)
            },
            name: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "age": Any<Number>,
            "gender": Array [
              Any<String>,
            ],
            "image": Any<String>,
            "location": Object {
              "city": Any<String>,
              "state": Any<String>,
            },
            "name": Any<String>,
          }
        `
        );
      });
  });
  function postMatch(user) {
    return request
      .post('/api/matches')
      .set('Authorization', user.token)
      .send({
        minAge: user.minPrefAge,
        maxAge: user.maxPrefAge,
        gender: user.genderPref
      })
      .expect(200)
      .then(({ body }) => body);
  }

  it('gets a list of matches', () => {
    return Promise.all([postMatch(user), postMatch(user), postMatch(user)])
      .then(() => {
        return request
          .get('/api/matches')
          .expect(200)
          .set('Authorization', user.token)
          .expect(200);
      }) 
      .then(({ body }) => {
        expect(body.length).toBe(9);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            age: expect.any(Number),
            gender: [expect.any(String)],
            image: expect.any(String),
            location: {
              city: expect.any(String),
              state: expect.any(String)
            },
            name: expect.any(String)
          },

          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "age": Any<Number>,
            "gender": Array [
              Any<String>,
            ],
            "image": Any<String>,
            "location": Object {
              "city": Any<String>,
              "state": Any<String>,
            },
            "name": Any<String>,
          }
        `
        );
      });
  });
});
