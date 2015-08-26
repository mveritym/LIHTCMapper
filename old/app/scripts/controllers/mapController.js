'use strict';

angular.module('lihtcmapperApp')
.controller('MapCtrl', ['$scope', 'MapService', 'PlacesService', function ($scope, mapService, placesService) {

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

    this.codeAddress = function (address) {
        mapService.geocode(address, function (status) {
            $scope.geocodeError = !status;
            $scope.showSlider = status;
            $scope.$digest();
        });
        placesService.resetAmenities();
        uncheckAll();
    };

    this.placeSearch = function (type, isChecked) {
        if (isChecked) {
            placesService.showAmenities(DEFAULT_RADIUS, type);
        } else {
            placesService.hideAmenities(type);
        }
    };

    this.initialize = function (canvas, lat, lng, zoom, rangeCircleOptions) {
        var defaultCenter = { lat: lat, lng: lng };
        var promise = mapService.initializeMap(canvas, { center: defaultCenter, zoom: zoom }, rangeCircleOptions);
        var callback = function (map) {
            placesService.initialize(map);
        };
        console.log(promise);
        //console.log(promise.then);
        console.log(callback);
        console.log();
        promise.then(callback);
    };

    function uncheckAll () {
        var checkboxes = angular.element('input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
    }

    this.initialize(DEFAULT_CANVAS, OAK_CITY_HALL_LAT, OAK_CITY_HALL_LNG, DEFAULT_ZOOM, rangeCircleOptions);
}]);
