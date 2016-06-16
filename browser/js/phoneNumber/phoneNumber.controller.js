'use strict';

coffeeCard.controller('PhoneNumberCtrl', function ($scope, $log, $state) {

    $scope.submit = function(phoneNumber) {
      
        $state.go('cardState', {phone : phoneNumber});

	}
});
