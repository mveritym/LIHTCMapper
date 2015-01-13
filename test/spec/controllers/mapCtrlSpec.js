'use strict';

describe('Controller: MapCtrl', function () {

  var mapCtrl;
  var lat = 123;
  var lng = 456;
  var zoom = 12;

  var mapService = {
    GeocoderStatus: {
      OK: true,
      ERROR: false
    },
    Geocoder: function () {
      this.geocode = function (){};
    },
    LatLng: function(){},
    Map: function () {
      return {
        setCenter: function(){}
      };
    },
    Marker: function () {
      return {
        setMap: function(){}
      };
    }
  };

  var geocoderResults = [{
    geometry: {
      location: {
        lat: function() { return lat; },
        lng: function() { return lng; }
      }
    }
  }];

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
    mapCtrl.initialize(lat, lng, zoom);

    expect(mapCtrl.mapOptions.center.lat).toEqual(lat);
    expect(mapCtrl.mapOptions.center.lng).toEqual(lng);
    expect(mapCtrl.mapOptions.zoom).toEqual(zoom);
  });

  it('should center an input location on the map when the geocoder returns successfully', function () {
    spyOn(mapService, 'LatLng');
    spyOn(mapCtrl.map, 'setCenter');
    spyOn(mapService, 'Marker');

    mapCtrl.parseGeocodeResults(geocoderResults, mapService.GeocoderStatus.OK);

    expect(mapService.LatLng).toHaveBeenCalledWith(lat, lng);
    expect(mapCtrl.map.setCenter).toHaveBeenCalledWith(new mapService.LatLng());
    expect(mapService.Marker).toHaveBeenCalledWith({
      map: mapCtrl.map,
      position: new mapService.LatLng(geocoderResults[0].geometry.location.lat(), geocoderResults[0].geometry.location.lng())
    });
  });

  describe('location marker', function() {
    beforeEach(function () {
      mapCtrl.initialize(lat, lng, zoom);
    });

    it('should be removed from the map if it\'s there and the geocoder fails', function () {
      spyOn(mapCtrl.marker, 'setMap');
      mapCtrl.parseGeocodeResults(geocoderResults, mapService.GeocoderStatus.ERROR);
      expect(mapCtrl.marker.setMap).toHaveBeenCalledWith(null);
    });

    it('should be updated to the new location when the geocoder succeeds', function () {
      spyOn(mapService, 'Marker');
      mapCtrl.parseGeocodeResults(geocoderResults, mapService.GeocoderStatus.OK);
      expect(mapService.Marker).toHaveBeenCalled();
    });
  });

  describe('geocodeError', function() {
    it('should be set to true if the geocoder fails', function () {
      mapCtrl.geocodeError = false;
      mapCtrl.parseGeocodeResults(geocoderResults, mapService.GeocoderStatus.ERROR);
      expect(mapCtrl.geocodeError).toBeTruthy();
    });

    it('should be set to false if the geocoder succeeds', function () {
      mapCtrl.geocodeError = true;
      mapCtrl.parseGeocodeResults(geocoderResults, mapService.GeocoderStatus.OK);
      expect(mapCtrl.geocodeError).toBeFalsy();
    });
  });
});
