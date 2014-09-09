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
		var coords = new Array();
		coords['latitude'] = latitude;
		coords['longitude'] = longitude;
		$url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&key=" + $key;
		/*
		 $.getScript($url).done(function(data, textStatus, jqxhr) {
		 locationData(data);

		 }).fail(function() {

		 });*/
		$.ajax({
			type : "GET",
			url : "sample.json",
			cache : false,
			crossDomain : true,
			contentType : "application/json",

			dataType : "json",
			xhrFields : {
				onprogress : function(e) {
					if (e.lengthComputable) {
						var percent=e.loaded / e.total * 100 + '%';
						$(".progress-bar").css({
							width:percent+"%"
						});
						// $(".progress-bar").text(percent);
					}
				}
			},
			// jsonpCallback : 'jsonCallback',
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			},
			success:function(data,textStatus,jqXHR){
			},
		}).done(function(data) {
			locationData(data);
		});
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
		console.log("location get fail,please try agin.");
	}

	return resp;
}

