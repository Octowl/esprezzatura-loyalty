'use strict';

coffeeCard.controller('PhoneNumberCtrl', function ($scope, $log, $state, PhoneFactory) {

    $scope.submit = function(phoneNumber) {
        PhoneFactory.findOrCreate(phoneNumber)
        .then(function(card) {
            console.log(card);
        })
        .catch($log.err);
    }

});
