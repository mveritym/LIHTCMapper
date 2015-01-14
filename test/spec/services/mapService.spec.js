'use strict';

describe('MapService', function() {

  var map, mapService = {};

  var canvas = angular.element('<div></div>');
  var options = { center: { lat: 123, lng: 456 }, zoom: 12 };

  var emptyFn = function () {};
  var setMapFn = function (newMap) {
    map = newMap;
  };
  var getMapFn = function () {
    return map;
  };

  var fakeGmaps = {
    Map: function () {
      return {
        setCenter: emptyFn
      };
    },
    Geocoder: function () {
      return {
        geocode: emptyFn
      };
    },
    Marker: function () {
      return {
        map: undefined,
        setMap: setMapFn,
        getMap: getMapFn,
        setPosition: emptyFn
      };
    },
    GeocoderStatus: {
      OK: true
    },
    LatLng: function () {}
  };

  beforeEach(function() {
    var $injector = angular.injector(['lihtcmapperApp']);
    mapService = $injector.get('MapService');
    spyOn(mapService, 'api').and.returnValue(fakeGmaps);
  });

  it('should use the google maps api to initialize a new map, geocoder, and marker', function () {
    mapService.initializeMap(canvas, options);

    expect(mapService.api).toHaveBeenCalled();
    expect(mapService.getMap()).toEqual(new fakeGmaps.Map(canvas, options));
    expect(mapService.getGeocoder()).toEqual(new fakeGmaps.Geocoder());
    expect(mapService.getMarker()).toEqual(new fakeGmaps.Marker());

    var markerMap = mapService.getMarker().getMap();
    var map = mapService.getMap();
    expect(markerMap).toEqual(map);
  });

  describe('after a map has been initialized', function () {

    beforeEach(function() {
      mapService.initializeMap(canvas, options);
    });

    it('should geocode an address', function () {
      spyOn(mapService.getGeocoder(), 'geocode');
      var fakeAddress = '123 Main Street';
      var callback = function () {};
      mapService.geocode(fakeAddress, callback);
      expect(mapService.getGeocoder().geocode).toHaveBeenCalled();
    });

    it('should set the map\'s center', function () {
      spyOn(mapService.api(), 'LatLng');
      spyOn(mapService.getMap(), 'setCenter');
      var newLat = 123;
      var newLng = 456;
      mapService.setMapCenter(newLat, newLng);
      expect(mapService.api().LatLng).toHaveBeenCalledWith(newLat, newLng);
      expect(mapService.getMap().setCenter).toHaveBeenCalledWith(new fakeGmaps.LatLng(newLat, newLng));
    });

    it('should clear the map', function () {
      spyOn(mapService.getMarker(), 'setMap');
      mapService.clearMap();
      expect(mapService.getMarker().setMap).toHaveBeenCalledWith(null);
    });

    it('should put the marker on the map', function () {
      mapService.placeOnMap();
      expect(mapService.getMarker().getMap()).not.toEqual(null);
    });

    it('should update the location marker', function () {
      var newLat = 123;
      var newLng = 456;
      spyOn(mapService.getMarker(), 'setPosition');
      mapService.updateMarkerPosition(newLat, newLng);
      expect(mapService.getMarker().setPosition).toHaveBeenCalledWith({ lat: newLat, lng: newLng });
    });
  });
});
