'use strict';

coffeeCard.controller('CardCtrl', function ($scope, $log, $state, CardFactory, card) {

	$scope.card = card ;

	$scope.getNumber = function(number) {
		return new Array(number);
	};

	$scope.updateDrinks = function(num, id) {
		CardFactory.updateNumber(num, id)
		.then(function(newCard){
			$scope.card = newCard;
		})
		.catch($log.error);
	};

	$scope.$watch('card.name', function() {
		CardFactory.updateName($scope.card.name, $scope.card.id)
		.catch($log.error);
	}, true);



});
