/*global google */
'use strict';

angular.module('lihtcmapperApp').service('PlacesService', ['ngGPlacesAPI', function (placesAPI) {

    var map, amenities;

    this.initialize = function (defaultMap) {
        map = defaultMap;
        amenities = {};
    };


    this.showAmenities = function (radius, type) {
        if (!amenities[type]) {
            searchForAmenities(radius, type);
        } else {
            addAmenitiesToMap(type);
        }
    };

    this.hideAmenities = function (type) {
        removeAmenitiesFromMap(type);
    };

    this.resetAmenities = function () {
        for (var type in amenities) {
            console.log(type);
            removeAmenitiesFromMap(type);
        }
        amenities = {};
    };

    function searchForAmenities (radius, type) {
        var center = map.getCenter();
        placesAPI.nearbySearch({
            latitude: center.lat(),
            longitude: center.lng(),
            radius: radius,
            types: [type]
        }).then(
            function(results) {
                console.log('Found places!');
                createPlaceMarkers(type, results);
            }, function(err) {
                console.log(err);
                amenities[type] = [];
            }
        );
    }

    function addAmenitiesToMap(type) {
        var markers = amenities[type];
        setMapForMarkers(markers, map);
    }

    function removeAmenitiesFromMap (type) {
        var markers = amenities[type];
        setMapForMarkers(markers, null);
    }

    function setMapForMarkers(markers, map) {
        markers.forEach(function (marker) {
            marker.setMap(map);
        });
    }

    function createPlaceMarkers(type, results) {
        for (var i = 0; i < results.length; i++) {
            var marker = createPlaceMarker(results[i], type);
            addMarkerToAmenitiesList(marker, type);
        }
    }

    function createPlaceMarker(place) {
        return new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
    }

    function addMarkerToAmenitiesList(marker, type) {
        if (!amenities[type]) {
            amenities[type] = [marker];
        } else {
            amenities[type].push(marker);
        }
    }

}]);
