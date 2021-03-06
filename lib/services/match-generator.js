// eslint-disable-next-line new-cap
const chance = require('chance').Chance();
const URL = 'https://randomuser.me/api/portraits/thumb/';

const getMatch = (minAge, maxAge, gender) => {
  const match = {};
  let urlGender;
  if(gender.toLowerCase() === 'female') {
    urlGender = 'women';
  }
  else if(gender.toLowerCase() === 'male') {
    urlGender = 'men';
  }
  else {
    const random = chance.integer({ min: 0, max: 1 });
    if(random === 0) {
      urlGender = 'men';
    }
    else {
      urlGender = 'women';
    }
  }
  match.name = chance.name();
  if(match.gender === 'no preference') {
    const random = Math.floor(Math.random() * 3 + 1);
    if(random === 1) {
      match.gender = 'male';
    } else if(random === 2) {
      match.gender = 'female';
    } else {
      match.gender = 'non-binary';
    }
  }
  match.gender = gender;
  match.age = chance.integer({ min: minAge, max: maxAge });
  match.location = {
    city: chance.city(),
    state: chance.state()
  };
  match.image = `${URL}${urlGender}/${chance.integer({ min: 0, max: 99 })}.jpg`;
  return match;
};

module.exports = getMatch;