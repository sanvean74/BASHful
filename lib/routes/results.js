// eslint-disable-next-line new-cap
const router = require('express').Router();
const Result = require('../models/result');
const ensureAuth = require('../middleware/ensure-auth');

router
  .post('/', ensureAuth(), (req, res, next) => {
    req.body.owner = req.user.id;
    Result.create(req.body)
      .then(result => res.json(result))
      .catch(next);
  })

  .get('/:id', ensureAuth(), (req, res, next) => {
    Result.findById(req.params.id)
      .then(result => res.json(result))
      .catch(next);
  });

module.exports = router; 