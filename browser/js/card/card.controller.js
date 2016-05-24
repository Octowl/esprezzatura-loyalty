'use strict';

coffeeCard.controller('CardCtrl', function ($scope, $log, $state, CardFactory, card) {

	$scope.card = card ; 

	$scope.getNumber = function(number) {
		return new Array(number);
	}

});
