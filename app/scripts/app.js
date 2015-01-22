'use strict';

angular
  .module('lihtcmapperApp', [
    'ngAria',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap-slider'
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
