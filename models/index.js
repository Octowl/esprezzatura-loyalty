var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/esp', {
  logging: false
});

var CoffeeDrinker = db.define('coffeedrinker', {
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
        defaultValue: 0
        // set: function(val) {
        //     if(this.getDataValue('drinksNumber') )
        // }
    }
})

module.exports = db;
