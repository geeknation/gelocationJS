//returns array with Actual location names either using native geoLocation or geolocation.js
function getLocation(locationData) {
	var resp = '';
	if (navigator.geolocation) {
		//NATIVE HTML 5 GEOLOCATION;
		navigator.geolocation.getCurrentPosition(success_callback, error_callback, {
			enableHighAccuracy : true
		});
	} else if (geo_position_js.init()) {
		// GEOLOCATION JS FALLBACK FOR OLDER BROWSERS
		geo_position_js.getCurrentPosition(success_callback, error_callback, {
			enableHighAccuracy : true
		});
	} else {
		return ("Functionality not available");
	}

	function success_callback(p) {
		//GOOGLE PLACE API KEY
		var $key = "AIzaSyDbimQ9nDAzirm34TsfcB7nbG8MW4CPqCs";
		//geo_position_js.showMap(p.coords.latitude, p.coords.longitude);
		var latitude = p.coords.latitude.toFixed(4);
		var longitude = p.coords.longitude.toFixed(4);
		
		/*
		 var coords = new Array();
		 coords['latitude'] = latitude;
		 coords['longitude'] = longitude;
		 */

		$("#latitude").text(latitude);
		$("#longitude").text(longitude);
		map = new google.maps.Map(document.getElementById('map'), {
			center : new google.maps.LatLng(latitude, longitude),
			zoom : 15
		});
		var coordsLock = new google.maps.LatLng(latitude, longitude);

		$url = "https://api.foursquare.com/v2/venues/search?client_id=V5HDIRMHEKCZLHAKI4P134CN2D4NW2IX2SWBKBLVQ13HATMA&client_secret=PYUMHBMECBFV25JTIWU4ZEFDK2IIVOWDEDO5ED4G0YZQ2MY3&v=20130815&ll=" + coordsLock.toUrlValue(4);
		$.ajax({
			type : "GET",
			url : $url,
			cache : false,
			crossDomain : true,
			contentType : "application/json",
			dataType : "jsonp",
			xhrFields : {
				onprogress : function(e) {
					if (e.lengthComputable) {
						var percent = e.loaded / e.total * 100 + '%';
						$(".progress-bar").css({
							width : percent + "%"
						});
						// $(".progress-bar").text(percent);
					}
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				locationData(errorThrown);
			},
			success : function(data, textStatus, jqXHR) {
				locationData(data);
			}
		});

		/*
		 div = document.getElementById("map");
		 var request = {
		 location : [coordsLock.lat(), coordsLock.lng()],
		 radius : "500"
		 };

		 service = new google.maps.places.PlacesService(map);
		 service.nearbySearch(request, renderResults); */

		function renderResults(results, callBackStatus) {
			for (var i = 0, result; result = results[i]; i++) {
				console.log(result);
			}
		}

	}

	function error_callback(p) {
		return false;
	}

}

function getLatLong(geodata) {
	var resp = '';
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
		var coords = [];
		coords.push(p.coords.latitude);
		coords.push(p.coords.longitude);
		geodata(coords);
	}

	function error_callback(p) {
		console.log("location get fail,please try again...");
	}

	return resp;
}

/*
 *
 * 
 $url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&key=" + $key;
 $.getScript($url).done(function(data, textStatus, jqxhr) {
 locationData(data);

 }).fail(function() {

 });
 $.ajax({
 type : "GET",
 url : $url,
 cache : false,
 crossDomain : true,
 contentType : "application/json",
 dataType : "jsonp",
 xhrFields : {
 onprogress : function(e) {
 if (e.lengthComputable) {
 var percent = e.loaded / e.total * 100 + '%';
 $(".progress-bar").css({
 width : percent + "%"
 });
 // $(".progress-bar").text(percent);
 }
 }
 },
 jsonpCallback : 'jsonCallback',

 error : function(jqXHR, textStatus, errorThrown) {
 console.log(errorThrown);
 },
 success : function(data, textStatus, jqXHR) {

 for ( i = 0; i < data.results.length; i++) {
 myAddress[i] = data.results[i].formatted_address;
 locationData(myAddress[i]);
 }
 }
 });
 * */