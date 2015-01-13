'use strict';

angular.module('lihtcmapperApp')
  .controller('MapCtrl', ['$scope', 'MapService', function ($scope, mapService) {

    this.address = '';
    this.geocodeError = false;

    var DEFAULT_CANVAS = document.getElementById('map-canvas');
    var OAK_CITY_HALL_LAT = 37.8052754;
    var OAK_CITY_HALL_LNG = -122.2725614;
    var DEFAULT_ZOOM = 15;
    //var RADIUS = 804.672;

    // function updateMarkerOnMap (newLocation) {
    //   mapCtrl.marker.setMap(null);
    //   mapCtrl.marker = new mapService.api().Marker({
    //     map: mapCtrl.map,
    //     position: newLocation
    //   });
    // }

    // function updateBoundaryOnMap (newLocation) {
    //   mapCtrl.boundary.setMap(null);
    //   mapCtrl.boundary = new mapService.api().Circle({
    //     map: mapCtrl.map,
    //     center: newLocation,
    //     radius: RADIUS
    //   });
    // }

    this.codeAddress = function (address) {
      this.geocodeError = mapService.geocode(address);
    };

    this.initialize = function (canvas, lat, lng, zoom) {
      var defaultCenter = { lat: lat, lng: lng };
      mapService.initializeMap(canvas, { center: defaultCenter, zoom: zoom });
    };

    this.initialize(DEFAULT_CANVAS, OAK_CITY_HALL_LAT, OAK_CITY_HALL_LNG, DEFAULT_ZOOM);
  }]);
