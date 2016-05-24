'use strict';

var router = require('express').Router();
var db = require('../models');
var CoffeeDrinker = db.model('coffeedrinker');

module.exports = router;

router.get('/cards/:phoneNumber', function(req, res, next) {
    var phoneNumber = req.params.phoneNumber
    CoffeeDrinker.findOrCreate({
        where: {
            phoneNumber: phoneNumber
        }
    })
    .then(function(data) {
        res.send(data);
    })
    .catch(next);
})
