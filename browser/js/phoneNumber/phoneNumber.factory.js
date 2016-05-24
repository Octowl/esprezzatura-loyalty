'use strict';

coffeeCard.factory('PhoneFactory', function($http) {
    var PhoneFactory = {}

    function getCard(res) {
        var card = res.data[0]
        card.created = res.data[1]
        return card
    }

    PhoneFactory.findOrCreate = function(phoneNumber) {
        return $http.get('/api/cards/' + phoneNumber).then(getCard);
    }

    return PhoneFactory
})
