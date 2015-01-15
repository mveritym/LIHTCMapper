'use strict';

angular
  .module('lihtcmapperApp', [
    'ngAria',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngSlider'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
