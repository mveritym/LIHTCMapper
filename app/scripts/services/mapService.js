/*global google */
'use strict';

angular.module('lihtcmapperApp').service('MapService', function () {

  var gmaps, geocoder, map, marker;

  this.initializeMap = function (canvas, mapOptions) {
    gmaps = this.api();
    map = new gmaps.Map(canvas, mapOptions);
    geocoder = new gmaps.Geocoder();
    marker = new gmaps.Marker();
    marker.setMap(map);
  };

  this.setMapCenter = function (lat, lng) {
    var newLocation = new gmaps.LatLng(lat, lng);
    map.setCenter(newLocation);
    // updateBoundaryOnMap(newLocation);
  };

  this.clearMap = function () {
    marker.setMap(null);
  };

  this.updateMarkerPosition = function (lat, lng) {
    marker.setPosition({ lat: lat, lng: lng });
  };

  this.geocode = function (address) {
    var geocoderStatus;
    var mapService = this;
    geocoder.geocode({'address': address}, function (results, status) {
      if (status === gmaps.GeocoderStatus.OK) {
        var location = results[0].geometry.location;
        mapService.setMapCenter(location.lat(), location.lng());
        mapService.updateMarkerPosition(location.lat(), location.lng());
      } else {
        mapService.clearMap();
      }
      geocoderStatus = status;
    });
    return geocoderStatus != gmaps.GeocoderStatus.OK;
  };

  this.api = function () {
    return google.maps;
  };

  // Getters - refactor later??

  this.getGeocoder = function () {
    return geocoder;
  };

  this.getMap = function () {
    return map;
  };

  this.getMarker = function () {
    return marker;
  };
});
