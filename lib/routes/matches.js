/* eslint-disable new-cap */
const router = require('express').Router();
const Match = require('../models/match');

router
  .post('/', (req, res, next) => {
    req.body.owner = req.user.id;

    Match.create(req.body)
      .then(match => res.json(match))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Match.findByIf(req.params.id)
      .lean()
      .then(match => res.json(match))
      .catch(next);
  })

  .get('/', ({ query }, res, next) => {
    const findQuery = {};
    if(query.name) findQuery.name = query.name;
    if(query.age) findQuery.age = query.age;
    if(query.location) findQuery.location = query.location;

    Match.find(findQuery)
      .select('name, age, location')
      .lean()
      .then(matches => {
        res.json(matches);
      })
      .catch(next);
  });

module.exports = router;