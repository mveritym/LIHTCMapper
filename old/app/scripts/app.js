'use strict';

angular
  .module('lihtcmapperApp', [
    'ngAria',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap-slider',
    'ngGPlaces'
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
  })
  .config(function (ngGPlacesAPIProvider){
    ngGPlacesAPIProvider.setDefaults({
      radius:500
    });
});
