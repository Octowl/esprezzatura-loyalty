'use strict'

coffeeCard.config(function ($stateProvider) {
    $stateProvider.state('phoneState', {
        url: '/phone',
        templateUrl: '/js/phoneNumber/templates/phoneNumber-form.html',
        controller: 'PhoneNumberCtrl'
    });
});
