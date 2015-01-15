'use strict';

describe('MapService', function() {

  var markerMap = null, circleMap = null, mapService = {};

  var canvas = angular.element('<div></div>');
  var mapOptions = { center: { lat: 123, lng: 456 }, zoom: 12 };
  var rangeCircleOptions = { radius: 1609.34 * 0.5 }; // 0.5 miles in meters

  var emptyFn = function () {};

  var setMarkerMapFn = function (newMap) { markerMap = newMap; };
  var getMarkerMapFn = function () { return markerMap; };
  var setCircleMapFn = function (newMap) { circleMap = newMap; };
  var getCircleMapFn = function () { return circleMap; };

  var fakeGmaps = {
    Map: function (options) {
      return {
        options: options,
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
        setMap: setMarkerMapFn,
        getMap: getMarkerMapFn,
        setPosition: emptyFn
      };
    },
    Circle: function (options) {
      return {
        options: options,
        setMap: setCircleMapFn,
        getMap: getCircleMapFn,
        setCenter: emptyFn
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

  it('should use the google maps api to initialize a new map, geocoder, marker, and rangeCircle', function () {
    spyOn(mapService, 'clearMap');
    spyOn(mapService, 'placeOnMap');
    mapService.initializeMap(canvas, mapOptions, rangeCircleOptions);

    expect(mapService.api).toHaveBeenCalled();
    expect(mapService.clearMap).toHaveBeenCalled();
    expect(mapService.placeOnMap).toHaveBeenCalled();

    expect(mapService.getMap()).toEqual(new fakeGmaps.Map(canvas, mapOptions));
    expect(mapService.getGeocoder()).toEqual(new fakeGmaps.Geocoder());
    expect(mapService.getMarker()).toEqual(new fakeGmaps.Marker());
    expect(mapService.getRangeCircle()).toEqual(new fakeGmaps.Circle(rangeCircleOptions));
  });

  describe('after a map has been initialized', function () {

    beforeEach(function() {
      mapService.initializeMap(canvas, mapOptions, rangeCircleOptions);
    });

    describe('the geocoder', function () {

      it('should geocode an address', function () {
        spyOn(mapService.getGeocoder(), 'geocode');
        var fakeAddress = '123 Main Street';
        var callback = function () {};
        mapService.geocode(fakeAddress, callback);
        expect(mapService.getGeocoder().geocode).toHaveBeenCalled();
      });

      it('should update the map, marker, and rangeCircle if the geocoder succeeds', function () {
        var fakeLatFn = function () { return 'fakeLat'; };
        var fakeLngFn = function () { return 'fakeLng'; };

        var status = fakeGmaps.GeocoderStatus.OK;
        var results = [{ geometry: { location: {
          lat: fakeLatFn,
          lng: fakeLngFn
        }}}];

        spyOn(mapService, 'setMapCenter');
        spyOn(mapService, 'setMarkerPosition');
        spyOn(mapService, 'setRangeCirclePosition');
        spyOn(mapService, 'placeOnMap');

        mapService.parseGeocodeResults(results, status);

        expect(mapService.setMapCenter).toHaveBeenCalledWith(fakeLatFn(), fakeLngFn());
        expect(mapService.setMarkerPosition).toHaveBeenCalledWith(fakeLatFn(), fakeLngFn());
        expect(mapService.setRangeCirclePosition).toHaveBeenCalledWith(fakeLatFn(), fakeLngFn());
        expect(mapService.placeOnMap).toHaveBeenCalled();
      });

      it('should clear the map of markers if the geocoder fails', function () {
        var results = {};
        var status = fakeGmaps.GeocoderStatus.ZERO_RESULTS;
        spyOn(mapService, 'clearMap');
        mapService.parseGeocodeResults(results, status);
        expect(mapService.clearMap).toHaveBeenCalled();
      });
    });

    describe('map and marker update functions', function () {

      it('should set the map\'s center', function () {
        spyOn(mapService.api(), 'LatLng');
        spyOn(mapService.getMap(), 'setCenter');
        var newLat = 123;
        var newLng = 456;
        mapService.setMapCenter(newLat, newLng);
        expect(mapService.api().LatLng).toHaveBeenCalledWith(newLat, newLng);
        expect(mapService.getMap().setCenter).toHaveBeenCalledWith(new fakeGmaps.LatLng(newLat, newLng));
      });

      it('should clear the map of the marker and the rangeCircle', function () {
        spyOn(mapService.getMarker(), 'setMap');
        spyOn(mapService.getRangeCircle(), 'setMap');
        mapService.clearMap();
        expect(mapService.getMarker().setMap).toHaveBeenCalledWith(null);
        expect(mapService.getRangeCircle().setMap).toHaveBeenCalledWith(null);
      });

      it('should put the marker and the radius circle on the map if both are null', function () {
        mapService.getMarker().setMap(null);
        mapService.getRangeCircle().setMap(null);

        spyOn(mapService.getMarker(), 'setMap');
        spyOn(mapService.getRangeCircle(), 'setMap');

        mapService.placeOnMap();

        expect(mapService.getMarker().setMap).toHaveBeenCalledWith(mapService.getMap());
        expect(mapService.getRangeCircle().setMap).toHaveBeenCalledWith(mapService.getMap());
      });

      it('should not put the marker and the radius circle on the map if they are already set', function () {
        spyOn(mapService.getMarker(), 'setMap');
        spyOn(mapService.getRangeCircle(), 'setMap');

        mapService.placeOnMap();

        expect(mapService.getMarker().setMap).not.toHaveBeenCalled();
        expect(mapService.getRangeCircle().setMap).not.toHaveBeenCalled();
      });

      it('should set the location marker\'s position', function () {
        var newLat = 123;
        var newLng = 456;
        spyOn(mapService.getMarker(), 'setPosition');
        mapService.setMarkerPosition(newLat, newLng);
        expect(mapService.getMarker().setPosition).toHaveBeenCalledWith({ lat: newLat, lng: newLng });
      });

      it('should set the range circle\'s position', function () {
        var newLat = 123;
        var newLng = 456;
        spyOn(mapService.getRangeCircle(), 'setCenter');
        mapService.setRangeCirclePosition(newLat, newLng);
        expect(mapService.getRangeCircle().setCenter).toHaveBeenCalledWith({ lat: newLat, lng: newLng });
      });
    });
  });
});
