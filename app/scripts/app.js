'use strict';

/**
 * @ngdoc overview
 * @name lihtcmapperApp
 * @description
 * # lihtcmapperApp
 *
 * Main module of the application.
 */
angular
  .module('lihtcmapperApp', [
    'ngAria',
    'ngResource',
    'ngRoute',
    'ngSanitize'
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
