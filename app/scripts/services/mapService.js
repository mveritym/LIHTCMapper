/*global google */
'use strict';

angular.module('lihtcmapperApp').service('MapService', function () {

  var OAK_CITY_HALL_LAT = 37.8052754;
  var OAK_CITY_HALL_LONG = -122.2725614;

  var mapOptions = {};
  var map = {};

  this.initialize = function () {
    mapOptions = {
      center: { lat: OAK_CITY_HALL_LAT, lng: OAK_CITY_HALL_LONG },
      zoom: 8
    };
  };

  this.createMap = function (canvas) {
    map = new google.maps.Map(canvas, mapOptions);
  };
});
