'use strict';

angular.module('lihtcmapperApp')
  .controller('MapCtrl', ['MapService', function (mapService) {

    function initialize() {
      var canvas = document.getElementById('map-canvas');
      mapService.initialize();
      mapService.createMap(canvas);
    }

    initialize();
  }]);
