/*jshint node:true, esversion:6*/
'use strict';

var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/esp', {
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
        defaultValue: 1
    }
},{
    instanceMethods: {
        updateDrinks: function(num) {
            num++;
            if(num == this.drinksNumber) this.drinksNumber--;
            else this.drinksNumber = num;
            return this.save();
        }
    }
});

module.exports = db;
