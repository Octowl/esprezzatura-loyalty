'use strict';

coffeeCard.factory('CardFactory', function($http) {
    var CardFactory = {};

    function resToData(res) {
        return res.data;
    }

    function getCard(res) {
        var data = resToData(res);
        var card = data[0];
        card.created = data[1];
        return card;
    }

    CardFactory.findOrCreate = function(phoneNumber) {
        return $http.get('/api/cards/' + phoneNumber).then(getCard);
    };

    CardFactory.updateNumber = function(num, id) {
        return $http.put('/api/cards/' + id, {drinksNumber: num}).then(resToData);
    };

    return CardFactory;
});
