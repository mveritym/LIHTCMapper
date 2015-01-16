var MapPage = require('./map.po.js');

describe('Map page', function () {

  var mapPage;

  beforeAll(function() {
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

  describe('when an invalid address is entered', function () {

    it('should show an error message when an address is entered and erased', function () {
      mapPage.address.sendKeys('a');
      mapPage.address.clear();
      browser.wait(mapPage.geocodeError.isDisplayed);
      expect(mapPage.geocodeError.isDisplayed()).toBeTruthy();
    });

    it('should show an error message when the address search fails', function () {
      mapPage.address.sendKeys('Not a valid address');
      mapPage.submitButton.click();
      browser.wait(mapPage.geocodeError.isDisplayed);
      expect(mapPage.geocodeError.isDisplayed()).toBeTruthy();
    });
  });

  describe('when a valid address is entered', function () {

    beforeAll(function() {
      mapPage.address.clear();
      mapPage.enterValidAddress('1 Frank H. Ogawa Plaza, Oakland, California 94612');
    });

    it('should show the range slider', function () {
      browser.wait(mapPage.slider.isDisplayed, 2000);
      expect(mapPage.slider.isDisplayed()).toBeTruthy();
    });

    it('should not show an error message', function () {
      expect(mapPage.geocodeError.isDisplayed()).toBeFalsy();
    });
  });
});
