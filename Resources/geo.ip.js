exports.get = function(ip, _callback) {
	var url = 'http://tools.webmasterei.com/geoip/?' + ip;
	Ti.API.log(url);
	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', url);
	xhr.onload = function() {
		var res = this.responseText.split('\n');
		Ti.API.log(res[2]+','+res[3]);
		_callback({
			lat : res[2],
			lon : res[3]
		});
	};
	xhr.onerror = function() {
		_callback({
			success : false
		});
	};
	xhr.send();
};
