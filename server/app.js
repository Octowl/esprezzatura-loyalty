/*jshint node:true, esversion:6*/
'use strict';
require('babel-register');

var express = require('express');
var app = express();

var chalk = require('chalk');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

var passport = require('passport');
var session = require('express-session');
//require secrets 

var db = require('./models');
var Customer = db.model('customer');
var User = db.model('user');


module.exports = app;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
	secret: 'Welovecoffee',
	resave: false,
	saveUninitialized: false
}))

passport.serializeUser(function(user, done) {
	done(null, user.id);	
});

passport.deserializeUser(function(id,done) {
	User.findById(id)
	.then(function(user) {
		done(null, user);
	})
	.catch(done);
})

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../browser')));
app.use(express.static(path.join(__dirname, '../node_modules')));


//routes
app.use('/api', require('./routes'));
app.use('/auth', require('./routes/authentication.js'));

/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

var validFrontendRoutes = ['/', '/phone', '/card', '/card/:phone', '/login'];
var indexPath = path.join(__dirname, '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
