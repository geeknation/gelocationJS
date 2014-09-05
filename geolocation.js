//returns array with Actual location names either using native geoLocation or geolocation.js
function getLocation() {
	var resp = '';
	if (navigator.geolocation) {
		//console.log("IM NATIVE!! :-)");
		navigator.geolocation.getCurrentPosition(success_callback, error_callback, {
			enableHighAccuracy : true
		});
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
		var $key = "AIzaSyDbimQ9nDAzirm34TsfcB7nbG8MW4CPqCs";

		var $data = fetchData(p);
		console.log($data);
		function fetchData(p) {
			//geo_position_js.showMap(p.coords.latitude, p.coords.longitude);
			var latitude = p.coords.latitude.toFixed(4);
			var longitude = p.coords.longitude.toFixed(4);
			var coords = new Array();
			coords['latitude'] = latitude;
			coords['longitude'] = longitude;

			$url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&key=" + $key;

			$.getScript($url).done(function(data, textStatus, jqxhr) {

			}).fail(function() {

			});
			return $.ajax({
				url : $url,
				cache : false,
				dataType : "script",
				type : "GET",
			}).done(function(data) {
				//action data returned by Google places API
				return data;
			});
		}

		return $data;
	}

	function error_callback(p) {
		return false;
	}

	return $data;

}

//PARENT FUNCTION
function getLatLong() {
	var resp='';
	if (navigator.geolocation) {
		// console.log("IM NATIVE!! :-)");
		navigator.geolocation.getCurrentPosition(success_callback, error_callback, {
			enableHighAccuracy : true
		});
	} else if (geo_position_js.init()) {
		// console.log("IM JAVASCRIPT :-)");
		geo_position_js.getCurrentPosition(success_callback, error_callback, {
			enableHighAccuracy : true
		});
	} else {
		return false;
	}
	//CHILD FUNCTION
	function success_callback(p) {
		var coords=[];
		coords.push(p.coords.latitude);
		coords.push(p.coords.longitude);
		resp=coords;
	}

	function error_callback(p) {
		
	}
	
	return resp;
}


var coords=[];

coords=getLatLong();

//logs undefined
console.log(coords);

