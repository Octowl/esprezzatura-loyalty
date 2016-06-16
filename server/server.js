/*jshint node:true, esversion:6*/
'use strict';

var http = require('http');
var chalk = require('chalk');
var server = http.createServer();
var db = require('./models');

var PORT = process.env.PORT || 1337;

server.on('request', require('./app'));

db.sync({force: true})
    .then(function () {
        server.listen(PORT, function () {
            console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
        });
    })
    .catch(function (err) {
        console.error(chalk.red(err.stack));
        process.kill(1);
    });
