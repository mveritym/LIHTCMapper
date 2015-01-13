'use strict';

angular.module('lihtcmapperApp')
  .controller('MapCtrl', ['$scope', 'MapService', function ($scope, mapService) {

    this.address = '';
    this.mapOptions = {};
    this.map = {};
    this.geocoder = {};
    this.geocodeError = false;
    this.marker = {};

    var OAK_CITY_HALL_LAT = 37.8052754;
    var OAK_CITY_HALL_LNG = -122.2725614;
    var DEFAULT_ZOOM = 15;

    var mapCtrl = this;

    this.parseGeocodeResults = function (results, status) {
      if (status === mapService.GeocoderStatus.OK) {
        mapCtrl.geocodeError = false;
        var latLng = new mapService.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        mapCtrl.map.setCenter(latLng);

        mapCtrl.marker.setMap(null);
        mapCtrl.marker = new mapService.Marker({
          map: mapCtrl.map,
          position: latLng
        });
      } else {
        mapCtrl.geocodeError = true;
        mapCtrl.marker.setMap(null);
      }
      $scope.$digest();
    };

    this.codeAddress = function (address) {
      this.geocoder.geocode( {'address': address}, this.parseGeocodeResults);
    };

    this.initialize = function (lat, lng, zoom) {
      var canvas = document.getElementById('map-canvas');
      var defaultCenter = { lat: lat, lng: lng };
      this.mapOptions = {
        center: defaultCenter,
        zoom: zoom
      };
      this.geocoder = new mapService.Geocoder();
      this.map = new mapService.Map(canvas, this.mapOptions);
      this.marker = new mapService.Marker({
        position: { lat: lat, lng: lng }
      });
    };

    this.initialize(OAK_CITY_HALL_LAT, OAK_CITY_HALL_LNG, DEFAULT_ZOOM);
  }]);
