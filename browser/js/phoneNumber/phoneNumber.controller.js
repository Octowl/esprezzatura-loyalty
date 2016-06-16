'use strict';

coffeeCard.controller('PhoneNumberCtrl', function ($scope, $state) {

    $scope.submit = function(phoneNumber) {

        $state.go('cardState', {phone : phoneNumber});

	}
});
