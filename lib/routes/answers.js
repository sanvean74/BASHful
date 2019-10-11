// eslint-disable-next-line new-cap
const router = require('express').Router();
const Answer = require('../models/answer');

router
  .post('/', (req, res, next) => {
    // req.body.user = req.user._id;
    console.log(req.body);
    Answer.create(req.body)
      .then(result => res.json(result))
      .catch(next);
  });


module.exports = router;