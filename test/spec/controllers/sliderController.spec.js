'use strict';

describe('SliderCtrl', function () {

  var sliderCtrl;

  var mapService = {
    setRangeCircleRadius: function () {}
  };

  beforeEach(module('lihtcmapperApp'));

  beforeEach(inject(function($controller, $rootScope) {
    var scope = $rootScope.$new();
    sliderCtrl = $controller('SliderCtrl', {
      $scope: scope,
      MapService: mapService
    });
  }));

  it('should update the range circle\'s radius', function () {
    var newRange = 0.6;
    spyOn(mapService, 'setRangeCircleRadius');
    sliderCtrl.updateRange(newRange);
    expect(mapService.setRangeCircleRadius).toHaveBeenCalledWith(newRange * sliderCtrl.MILES_TO_METERS);
  });
});
