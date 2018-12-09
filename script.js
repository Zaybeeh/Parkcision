var map;
var infowindow;
var pos;

var userLat;
var userLng;

function myMap() {

  var userLat = localStorage.getItem("userLat")
  var userLng = localStorage.getItem("userLong")
  var myLatlng = new google.maps.LatLng(parseFloat(userLat),parseFloat(userLng));
 
    // Gets users current lat and lng coords of the user by using Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

    //location is stores in pos variable
      pos = {
        lat: parseFloat(userLat),
        lng: parseFloat(userLng)
      }

      var myLocation = pos;
      console.log(myLocation)
        //map is created based on the users location found by the geo location which is stored in myLocation variable. Map is also centered on the users location and is created my using the Google Maps API
      map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 14
      });
        //info window is created inorder to let the user know that the geolocation has found their lat and lng coords
      infoWindow = new google.maps.InfoWindow({
        map: map
      });
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
      console.log(userLat);
      var myLatlng = new google.maps.LatLng(parseFloat(userLat),parseFloat(userLng));
    //users location is used to search for supermarkets nearby in a radius of 5000 by using the Places AAPI
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        
        location: myLatlng,
        radius: 5000,
        types: ['parking']

        

      }, callback);
    })

  }

    //the information gathered by the search for nearby supermarkets is called back. The results of the search is placed into an array using a for loop to count each supermarket found in the radius.
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {

        //console.log(results[i].opening_hours.open_now);

        //createMarker(results[i].name)
        console.log(results[i])
        console.log(results[i]);
      createMarker(results[i], results[i].name);

    }
  }

}
    // This function allows markers to be created on the map at the location of the supermarkets that were found nearby. This allows to user to find which supermarket is closests to them.
function createMarker(place, name, time) {
  var placeLoc = place.geometry.location;
  var colorChosen;
 if (time !== true) {
      color: "red"
  } else {
      color: "green"
  }

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    label: {
        text: name,
        color: colorChosen,
        title: "EBieubd",
        fontWeight: "bold",
        fontSize: "16px"



      }
  });

  google.maps.event.addListener(marker, 'click', function() {
    console.log(place)
    var tempVal = JSON.stringify(place.name)
    localStorage.setItem("locObj",tempVal);
  });
}
}