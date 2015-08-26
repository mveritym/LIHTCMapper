'use strict';

angular.module('lihtcmapperApp')
.controller('SliderCtrl', ['$scope', 'MapService', function ($scope, mapService) {

  var slider = this;

  slider.MILES_TO_METERS = 1609.34;
  
  slider.value = 0.5;
  slider.options = {
    min: 0,
    max: 1.5,
    step: 0.1,
    tooltip: 'hide'
  };

  $scope.$watch('slider.value', function(newRange) {
    slider.updateRange(newRange);
  });

  this.updateRange = function (rangeInMiles) {
    mapService.setRangeCircleRadius(rangeInMiles * slider.MILES_TO_METERS);
  };

}]);
