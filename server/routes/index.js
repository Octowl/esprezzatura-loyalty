/*jshint node:true, esversion:6*/
'use strict';

var router = require('express').Router();
var db = require('../models');
var Customer = db.model('customer');

module.exports = router;

router.get('/cards/:phoneNumber', function(req, res, next) {
    var phoneNumber = req.params.phoneNumber;
    Customer.findOrCreate({
        where: {
            phoneNumber: phoneNumber
        }
    })
    .then(function(data) {
        res.send(data);
    })
    .catch(next);
});

router.put('/cards/:id', function(req, res, next){
    Customer.findById(req.params.id)
    .then(function(foundCustomer){
        return foundCustomer.updateDrinks(req.body.drinksNumber);
    })
    .then(function(updatedCustomer){
        res.send(updatedCustomer);
    })
    .catch(next);
});
