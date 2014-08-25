//returns array with Actual location names either using native geoLocation or geolocation.js
function getLocation() {
	var resp = '';
	if (navigator.geolocation) {
		//console.log("IM NATIVE!! :-)");
		navigator.geolocation.getCurrentPosition(success_callback);
	} else if (geo_position_js.init()) {
		// console.log("IM JAVASCRIPT :-)");
		geo_position_js.getCurrentPosition(success_callback, error_callback, {
			enableHighAccuracy : true
		});
	} else {
		return ("Functionality not available");
	}

	function success_callback(p) {
		//GOOGLE PLACE API KEY
		var $key = "";

		$data = fetchData(p);
		console.log(data);
		function fetchData(p) {
			//geo_position_js.showMap(p.coords.latitude, p.coords.longitude);
			var longitude = p.coords.latitude.toFixed(4);
			var latitude = p.coords.longitude.toFixed(4);
			var coords = new Array();
			coords['latitude'] = latitude;
			coords['longitude'] = longitude;

			$url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&key=" + $key;
			return $.ajax({
				url : $url,
				cache : false,
				dataType : "json",
				type : "GET",
			}).done(function(data) {
				//action data returned by Google places API
				return data;
			});
		}

	}

	function error_callback(p) {
		alert('error=' + p.message);
	}

	return resp;

}

//return
function getLatLong() {
	var resp;
	if (navigator.geolocation) {
		// console.log("IM NATIVE!! :-)");
		navigator.geolocation.getCurrentPosition(success_callback);
	} else if (geo_position_js.init()) {
		// console.log("IM JAVASCRIPT :-)");
		geo_position_js.getCurrentPosition(success_callback, error_callback, {
			enableHighAccuracy : true
		});
	} else {
		return ("Functionality not available");
	}

	function success_callback(p) {
		var $key = "";
		//GOOGLE PLACE API KEY
		//geo_position_js.showMap(p.coords.latitude, p.coords.longitude);
		var longitude = p.coords.latitude.toFixed(4);
		var latitude = p.coords.longitude.toFixed(4);
		var coords = new Array();
		coords['latitude'] = latitude;
		coords['longitude'] = longitude;

		resp = coords;

		//pass to google places api to get location
	}

	function error_callback(p) {
		alert('error=' + p.message);
	}

	return resp;
}
