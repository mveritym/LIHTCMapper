/*global google */
'use strict';

angular.module('lihtcmapperApp').service('MapService', function () {

  var gmaps, geocoder, map, marker, rangeCircle;

  this.initializeMap = function (canvas, mapOptions, rangeCircleOptions) {
    gmaps = this.api();
    map = new gmaps.Map(canvas, mapOptions);
    geocoder = new gmaps.Geocoder();
    marker = new gmaps.Marker();
    rangeCircle = new gmaps.Circle(rangeCircleOptions);
    this.clearMap();
    this.placeOnMap();
  };

  this.setMapCenter = function (lat, lng) {
    var newLocation = new gmaps.LatLng(lat, lng);
    map.setCenter(newLocation);
  };

  this.clearMap = function () {
    marker.setMap(null);
    rangeCircle.setMap(null);
  };

  this.setMarkerPosition = function (lat, lng) {
    marker.setPosition({ lat: lat, lng: lng });
  };

  this.setRangeCirclePosition = function (lat, lng) {
    rangeCircle.setCenter({ lat: lat, lng: lng });
  };

  this.geocode = function (address, callback) {
    var mapService = this;
    geocoder.geocode({'address': address}, function (results, status) {
      mapService.parseGeocodeResults(results, status);
      callback(status === gmaps.GeocoderStatus.OK);
    });
  };

  this.parseGeocodeResults = function (results, status) {
    if (status === gmaps.GeocoderStatus.OK) {
      var location = results[0].geometry.location;
      this.setMapCenter(location.lat(), location.lng());
      this.setMarkerPosition(location.lat(), location.lng());
      this.setRangeCirclePosition(location.lat(), location.lng());
      this.placeOnMap();
    } else {
      this.clearMap();
    }
  };

  this.placeOnMap = function () {
    if (marker.getMap() === null && rangeCircle.getMap() === null) {
      marker.setMap(map);
      rangeCircle.setMap(map);
    }
  };

  this.api = function () {
    return google.maps;
  };

  // Getters & Setters - refactor later??

  this.getGeocoder = function () {
    return geocoder;
  };

  this.getMap = function () {
    return map;
  };

  this.getMarker = function () {
    return marker;
  };

  this.getRangeCircle = function () {
    return rangeCircle;
  };
});
