'use strict';

var router = require('express').Router();
var db = require('../models');
var Customer = db.model('customer');
var User = db.model('user');

module.exports = router;


router.post('/login', function (req, res, next) {
  User.findOne({
    where: {
      email : req.body.email + ''
    }, 
    attributes: {
    include: ['password', 'salt']
    }
  }
  )
  .then(function (user) {
    if (!user || !user.authenticate(req.body.password)) {
      res.sendStatus(401);
    } 
    req.login(user, function(err) {
      if(err) next(err);
      else res.send(user);
    })
  })
  .catch(next);
});

router.delete('/logout', function(req, res, next) {
  req.logout();
  res.sendStatus(204);
})

router.get('/me', function(req, res, next) {
  if(req.user) res.send(req.user);
  else res.sendStatus(404);
})

module.exports = router;