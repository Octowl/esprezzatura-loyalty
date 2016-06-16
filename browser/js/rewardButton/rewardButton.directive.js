'use strict';

coffeeCard.directive('rewardButton', function(){
    return {
        restrict: 'E',
        template: '<div ng-if="rewardNum <= card.drinksNumber" class="btn-reward"><button class="btn btn-circle btn-lg" style="background-image: url({{icon}})" ng-click="claim()"></button></div>',
        scope: {
            update: '=',
            icon: '@',
            card: '=',
            rewardNum: '@'
        },
        link: function(scope) {
            scope.claim = function() {
                var card = scope.card;
                var rewardNum = scope.rewardNum;
                scope.update(card.drinksNumber - rewardNum, card.id);
            }
        }
    };
});
