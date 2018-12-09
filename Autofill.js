function init() {
	var input = document.getElementById('locationName');
	var autocomplete = new google.maps.places.Autocomplete(input);
	var place = autocomplete.getPlace();

	/*var lng = place.geometry.location.lng();*/
	
/*console.log(lng);*/
autocomplete.addListener('place_changed', function() {
	var placeLat = autocomplete.getPlace().geometry.location.lat();
	var placeLng = autocomplete.getPlace().geometry.location.lng();
	console.log(placeLat)
	console.log(placeLng)
	localStorage.setItem("userLat", placeLat)
	localStorage.setItem("userLong", placeLng)
})

}
google.maps.event.addDomListener(window, 'load', init);

function username()
{
var input = document.getElementById("locationName").value;


console.log(input);



}