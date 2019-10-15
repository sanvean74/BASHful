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
    gender: ['non-binary'],
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
            __v: 0,
            _id: expect.any(String),
            hash: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "email": "user@user.com",
            "gender": Array [],
            "genderPref": Array [],
            "hash": Any<String>,
            "name": "Bill",
          }
        `
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
                hash: expect.any(String)
              },
              `
              Object {
                "__v": 0,
                "_id": Any<String>,
                "age": 18,
                "email": "user@user.com",
                "gender": Array [
                  "non-binary",
                ],
                "genderPref": Array [
                  "non-binary",
                ],
                "hash": Any<String>,
                "maxPrefAge": 120,
                "minPrefAge": 18,
                "name": "Bill",
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
