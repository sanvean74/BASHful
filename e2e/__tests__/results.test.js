const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('results api', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('results'));

  let user = null;
  beforeEach(() => {
    return signupUser().then(newUser => (user = newUser));
  });

  const result = {
    result:
      "It was (time of day) when (match name) and I met up at (venue). I was excited to go (activity ing) together. There's something about (activity ing) that really helps me see who a person really is deep inside. We had a (emo score dependent variable) time and we're starving afterwards so we went to get some (food). The food was (flavor adjective). After grabbing a bite we went for a walk through the park nearby and saw several (animals) playing. It was really (emo score dependent variable). It made me feel playful so I started (action ing). I was feeling pretty confident about who I am during the date because I was wearing my lucky (color) (clothing item). It always makes me feel more confident. Especially while I (method of travel) through the (place).  All in all things were going pretty (emo score dependent variable). The date was nearing completion but I still didn't feel like I really knew (match name). So I thought why not go get some drinks? We went to (restaurant/bar name) and got (beverages). We talked for what seemed like forever after that."
  };

  it('post a result for this user', () => {
    return request
      .post('/api/results')
      .set('Authorization', user.token)
      .send(result)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            result: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "result": Any<String>,
          }
        `
        );
      });
  });

  function postResult(result, user) {
    return request
      .post('/api/results')
      .set('Authorization', user.token)
      .send(result)
      .expect(200)
      .then(({ body }) => body);
  }

  it('gets result by id', () => {
    return postResult(result, user)
      .then(result => {
        return request
          .get(`/api/results/${result._id}`)
          .set('Authorization', user.token)
          .send(result)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            __v: 0,
            _id: expect.any(String),
            result: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "result": Any<String>,
          }
        `
        );
      });
  });
});
