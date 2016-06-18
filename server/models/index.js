/*jshint node:true, esversion:6*/
'use strict';

var Sequelize = require('sequelize');
var crypto = require('crypto');

var db = new Sequelize('process.env.DATABASE_URL', {
  logging: false
});

db.define('customer', {
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: {
                args: [10,10],
                message: "No phone number found here..."
            }
        }
    },
    drinksNumber: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        set: function(num) {
                var drinksNumber = this.getDataValue('drinksNumber');
                console.log(drinksNumber, num);
                drinksNumber = drinksNumber == num ? drinksNumber-1 : num;
                drinksNumber = drinksNumber < 0 ? 0 : drinksNumber;
                this.setDataValue('drinksNumber', drinksNumber);
            }
    },
    name : {
        type : Sequelize.STRING
    }
});

db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    salt: {
        type: Sequelize.STRING,
        defaultValue: function () {
          return crypto.randomBytes(16).toString('base64');
        }
    },
      password: {
        type: Sequelize.STRING,
        set: function (plaintext) {
          var hashedPassword = this.hash(plaintext);
          this.setDataValue('password', hashedPassword);
        }
      }
  }, {
      instanceMethods: {
        hash: function (plaintext) {
          return crypto.pbkdf2Sync(plaintext, this.salt, 10000, 64).toString('base64');
        },
        authenticate: function (attempt) {
          return this.password === this.hash(attempt);
        }
      },
      defaultScope: {
        attributes: {
          exclude: ['password', 'salt']
        }
      }
});

module.exports = db;
