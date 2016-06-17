/*global angular, console*/
'use strict';

var coffeeCard = angular.module('coffeeCard', ['ui.router', 'ngMessages']);

coffeeCard.run(function ($rootScope) {
 $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
   console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
 });
});

coffeeCard.config(function($urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    // when there is an empty route, redirect to /index
    $urlRouterProvider.when('', '/phone');
});
