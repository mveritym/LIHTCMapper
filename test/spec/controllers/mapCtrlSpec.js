'use strict';

describe('Controller: MapCtrl', function () {

  var mapCtrl;

  var canvas = angular.element('<div></div>');
  var lat = 123;
  var lng = 456;
  var zoom = 12;
  var radius = 1609.34 * 0.5; // 0.5 miles in meters

  var mapService = {
    initializeMap: function () {},
    geocode: function () {},
    isGeocodeError: function () {}
  };

  beforeEach(module('lihtcmapperApp'));

  beforeEach(inject(function($controller, $rootScope) {
    var scope = $rootScope.$new();
    mapCtrl = $controller('MapCtrl', {
      $scope: scope,
      MapService: mapService
    });
  }));

  it('should initialize a new map', function () {
    spyOn(mapService, 'initializeMap');
    var radiusOptions = { radius: radius };
    mapCtrl.initialize(canvas, lat, lng, zoom, radiusOptions);
    expect(mapService.initializeMap).toHaveBeenCalledWith(canvas, { center: { lat: lat, lng: lng }, zoom: zoom }, radiusOptions);
  });

  it('should geocode an address and set the geocode error to true', function () {
    spyOn(mapService, 'geocode').and.returnValue(true);
    spyOn(mapService, 'isGeocodeError').and.returnValue(true);
    var fakeAddress = '123 Main Street';
    mapCtrl.codeAddress(fakeAddress);
    expect(mapService.geocode).toHaveBeenCalled();
  });
});
