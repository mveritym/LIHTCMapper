'use strict';

angular.module('lihtcmapperApp')
  .controller('MapCtrl', ['$scope', 'MapService', function ($scope, mapService) {

    this.address = '';
    this.mapOptions = {};
    this.map = {};
    this.geocoder = {};
    this.geocodeError = false;

    var OAK_CITY_HALL_LAT = 37.8052754;
    var OAK_CITY_HALL_LNG = -122.2725614;
    var DEFAULT_ZOOM = 15;

    var mapCtrl = this;

    this.parseGeocodeResults = function (results, status) {
      if (status === mapService.GeocoderStatus.OK) {
        mapCtrl.geocodeError = false;
        var location = results[0].geometry.location;
        mapCtrl.map.setCenter(new mapService.LatLng(location.lat(), location.lng()));
        new mapService.Marker({
          map: mapCtrl.map,
          position: results[0].geometry.location
        });
      } else {
        mapCtrl.geocodeError = true;
      }
      $scope.$digest();
    };

    this.codeAddress = function (address) {
      this.geocoder.geocode( {'address': address}, this.parseGeocodeResults);
    };

    this.initialize = function (lat, lng, zoom) {
      var canvas = document.getElementById('map-canvas');
      this.mapOptions = {
        center: { lat: lat, lng: lng },
        zoom: zoom
      };
      this.geocoder = new mapService.Geocoder();
      this.map = new mapService.Map(canvas, this.mapOptions);
    };

    this.initialize(OAK_CITY_HALL_LAT, OAK_CITY_HALL_LNG, DEFAULT_ZOOM);
  }]);
