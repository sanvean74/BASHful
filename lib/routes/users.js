/* eslint-disable new-cap */
const router = require('express').Router();
const User = require('../models/user');
const ensureAuth = require('../middleware/ensure-auth');

router
  .post('/', (req, res, next) => {
    User.create(req.body)
      // .lean('-hash -password')
      .then(user => res.json(user))
      .catch(next);
  })

  .get('/:id', ensureAuth(), (req, res, next) => { 
    User.findByIf(req.params.id)
      .lean() 
      .then(user => res.json(user))
      .catch(next);
  })

  .put('/:id', ensureAuth(), (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(user => res.json(user))
      .catch(next);
  })

  .delete('/:id', ensureAuth(), (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
      .then(user => res.json(user))
      .catch(next);
  });

module.exports = router; 