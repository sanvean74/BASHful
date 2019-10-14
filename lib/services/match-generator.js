const Chance = require('chance');
const chance = new Chance();
const URL = 'https://randomuser.me/api/portraits/';

let match = {};
const getMatch = (minAge, maxAge, gender) => {
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