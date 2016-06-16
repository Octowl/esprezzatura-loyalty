'use strict'

coffeeCard.config(function ($stateProvider) {
    $stateProvider.state('cardState', {
        url: '/card/:phone',
        templateUrl: '/js/card/card.html',
        controller: 'CardCtrl',
        resolve : {
        	card : function($stateParams, CardFactory) {
        		return CardFactory.findOrCreate($stateParams.phone);
        	}
        }
    });
});
