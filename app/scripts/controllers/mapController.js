'use strict';

angular.module('lihtcmapperApp')
  .controller('MapCtrl', ['$scope', 'MapService', function ($scope, mapService) {

    this.address = '';
    $scope.geocodeError = false;
    $scope.showSlider = false;

    var DEFAULT_CANVAS = document.getElementById('map-canvas');
    var OAK_CITY_HALL_LAT = 37.8052754;
    var OAK_CITY_HALL_LNG = -122.2725614;
    var DEFAULT_ZOOM = 14;
    var DEFAULT_RADIUS = 1609.34 * 0.5; // 0.5 miles in meters

    var rangeCircleOptions = {
      strokeColor: '#564280',
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: '#D6C2FF',
      fillOpacity: 0.35,
      radius: DEFAULT_RADIUS
    };

    $scope.sliders = {};
    $scope.sliders.sliderValue = 0.5;

    $scope.testOptions = {
      min: 0,
      max: 1.5,
      step: 0.1,
      tooltip: 'hide'
    };

    $scope.$watch('sliders.sliderValue', function(rangeInMiles) {
      mapService.setRangeCircleRadius(rangeInMiles * 1609.34);
    });


    this.codeAddress = function (address) {
      mapService.geocode(address, function (status) {
        $scope.geocodeError = !status;
        $scope.showSlider = status;
        $scope.$digest();
      });
    };

    this.initialize = function (canvas, lat, lng, zoom, rangeCircleOptions) {
      var defaultCenter = { lat: lat, lng: lng };
      mapService.initializeMap(canvas, { center: defaultCenter, zoom: zoom }, rangeCircleOptions);
    };

    this.initialize(DEFAULT_CANVAS, OAK_CITY_HALL_LAT, OAK_CITY_HALL_LNG, DEFAULT_ZOOM, rangeCircleOptions);
  }]);
