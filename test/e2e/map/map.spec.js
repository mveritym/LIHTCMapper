var MapPage = require('./map.po.js');

describe('Map page', function () {

  this.mapPage = new MapPage();

  beforeEach(function() {
    this.mapPage = new MapPage();
  });

  it('should show a default google map when the page loads', function () {
    this.mapPage.get();
    this.mapPage.waitForMap(function() {
      // to check the Google Map has fully loaded, I check that the container div is not empty
      var items = element(by.className('gm-style')).all(by.tagName('div'));
      expect(items.count()).not.toBe(0);
    });
  });
});
