'use strict';

describe('Controller: MapCtrl', function () {

  var mapCtrl, mapService;

  mapService = {
    Geocoder: function () {
      this.geocode = function () {};
    },
    Map: function () {}
  };

  beforeEach(module('lihtcmapperApp'));

  beforeEach(module(function($provide) {
    $provide.value('MapService', mapService);
  }));

  beforeEach(inject(function($controller, $rootScope) {
    var scope = $rootScope.$new();
    mapCtrl = $controller('MapCtrl', {
      $scope: scope
    });
  }));

  it('should initialize the google maps api and create a map', function () {
    var lat = 123;
    var lng = 456;
    var zoom = 12;

    mapCtrl.initialize(lat, lng, zoom);

    expect(mapCtrl.mapOptions.center.lat).toEqual(lat);
    expect(mapCtrl.mapOptions.center.lng).toEqual(lng);
    expect(mapCtrl.mapOptions.zoom).toEqual(zoom);
  });

  it('should center an input location on the map', function () {
    var fakeAddress = '123 Fake Street';
    mapCtrl.codeAddress(fakeAddress);
  });
});
