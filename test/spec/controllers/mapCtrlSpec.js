'use strict';

describe('Controller: MapCtrl', function () {

  var mapCtrl;

  var canvas = angular.element('<div></div>');
  var lat = 123;
  var lng = 456;
  var zoom = 12;

  var mapService = {
    initializeMap: function () {},
    geocode: function () {}
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
    mapCtrl.initialize(canvas, lat, lng, zoom);
    expect(mapService.initializeMap).toHaveBeenCalledWith(canvas, {
      center: { lat: lat, lng: lng },
      zoom: zoom
    });
  });

  it('should geocode an address', function () {
    spyOn(mapService, 'geocode').and.returnValue(true);
    var fakeAddress = '123 Main Street';
    mapCtrl.codeAddress(fakeAddress);
    expect(mapService.geocode).toHaveBeenCalledWith(fakeAddress);
    expect(mapCtrl.geocodeError).toBeTruthy();
  });
});
