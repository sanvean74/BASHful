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
    return signupUser(testUser).then(() => {
      return signinUser(testUser).then(body => (user = body));
    });
  });

  const player = {
    age: 18,
    minPrefAge: 18,
    maxPrefAge: 120,
    gender: 'non-binary',
    genderPref: ['non-binary']
  };

  it('posts user', () => {
    return request
      .post('/api/users')
      .send(testUser)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {

          },
        );
      });
  });

  it('updates user extra fields', () => {
    return request
      .put(`/api/users/${user._id}`)
      .set('Authorization', user.token)
      .send(player)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            __v: 0,
            _id: expect.any(String),
            hash: expect.any(String),
            email: expect.any(String),
            name: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "age": 18,
            "email": Any<String>,
            "gender": "non-binary",
            "genderPref": Array [
              "non-binary",
            ],
            "hash": Any<String>,
            "maxPrefAge": 120,
            "minPrefAge": 18,
            "name": Any<String>,
          }
        `
        );
      });
  });

  it('gets the user by id', () => {
    return request
      .put(`/api/users/${user._id}`)
      .set('Authorization', user.token)
      .send(player)
      .expect(200)
      .then(() => {
        return request
          .get(`/api/users/${user._id}`)
          .set('Authorization', user.token)
          .expect(200)
          .then(({ body }) => {
            expect(body).toMatchInlineSnapshot(
              {
                __v: 0,
                _id: expect.any(String),
                hash: expect.any(String),
                email: expect.any(String),
                name: expect.any(String)
              },

              `
              Object {
                "__v": 0,
                "_id": Any<String>,
                "age": 18,
                "email": Any<String>,
                "gender": "non-binary",
                "genderPref": Array [
                  "non-binary",
                ],
                "hash": Any<String>,
                "maxPrefAge": 120,
                "minPrefAge": 18,
                "name": Any<String>,
              }
            `
            );
          });
      });
  });

  it('deletes user', () => {
    return request
      .delete(`/api/users/${user._id}`)
      .set('Authorization', user.token)
      .expect(200)
      .then(() => {
        return request
          .get(`/api/users/${user._id}`)
          .set('Authorization', user.token)
          .expect(200)
          .then(({ body }) => {
            expect(body).toBe(null);
          });
      });
  });
});
