// eslint-disable-next-line new-cap
const router = require('express').Router();
const Answer = require('../models/answer');

router
  .post('/', (req, res, next) => {
    req.body.user = req.user.id;
    Answer.create(req.body)
      .then(result => res.json(result))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Answer.find()
      .then(result => res.json(result))
      .catch(next);
  });

module.exports = router;