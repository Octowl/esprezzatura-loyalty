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
        defaultValue: 1,
        set: function(num) {
                var drinksNumber = this.getDataValue('drinksNumber');

                drinksNumber = drinksNumber == num ? drinksNumber-1 : num;

                drinksNumber = drinksNumber < 0 ? 0 : drinksNumber;

                this.setDataValue('drinksNumber', drinksNumber);
            }
    },
    name : {
        type : Sequelize.STRING
    }
},{
});

module.exports = db;
