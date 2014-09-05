var Scripts = {
	 twitter    : '//platform.twitter.com/widgets.js',
	facebook   : 'http://static.ak.fbcdn.net/connect.php/js/FB.Share',
	googleplus : 'https://apis.google.com/js/plusone.js',
	linkedin   : 'http://platform.linkedin.com/in.js'
};

// When the button is clicked all the scripts
// are loaded. The conainers are already
// on the website. They will be filled
// as soon as the script is loaded.
jQuery('a.share-link').click(function() {
	for (var script in Scripts ) {
		jQuery.cachedGetScript(Scripts[script]);
	}
});

// Function that get and caches the scripts
jQuery.cachedGetScript = function(script) {
	if (!cachedScriptPromises[script]) {
		cachedScriptPromises[script] = jQuery.Deferred(function(defer) {
			jQuery.getScript(script).then(defer.resolve, defer.reject);
		}).promise();
	}
	return cachedScriptPromises[script];
}; 