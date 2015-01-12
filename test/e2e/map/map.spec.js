var MapPage = require('./map.po.js');

describe('Map page', function () {

  var mapPage;

  beforeEach(function() {
    mapPage = new MapPage();
    mapPage.get();
  });

  it('should show a default google map when the page loads', function () {
    mapPage.waitForMap(function () {
      // to check the Google Map has fully loaded, I check that the container div is not empty
      var items = element(by.className('gm-style')).all(by.tagName('div'));
      expect(items.count()).not.toBe(0);
    });
  });

  it('should show an error message when the address search fails', function () {
    mapPage.waitForMap(function () {
      mapPage.address.sendKeys('Not a valid address');
      mapPage.submitButton.click();
      browser.wait(mapPage.geocodeError.isDisplayed);
      expect(mapPage.geocodeError.isDisplayed()).toBeTruthy();
    });
  });

  it('should not show an error message when the address search succeeds', function () {
    mapPage.waitForMap(function () {
      mapPage.address.sendKeys('1 Frank H. Ogawa Plaza, Oakland, California 94612');
      mapPage.submitButton.click();
      expect(mapPage.geocodeError.isDisplayed()).toBeFalsy();
    });
  });
});
