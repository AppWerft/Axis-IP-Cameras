exports.get = function(url, _callback) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', url + '/');
	xhr.onload = function() {
		var page = this.responseText;
		var regex = /<META HTTP-EQUIV="Refresh" CONTENT="0; URL=(.*?)">/gi;
		regex.exec(page);
		url += RegExp.$1;
		Ti.API.log(url);
		var subxhr = Titanium.Network.createHTTPClient();
		subxhr.open('GET', url);
		subxhr.onload = function() {
			_callback(this.responseText.match(/AXIS([^<]+)/gi)[0]);
		};
		subxhr.onerror = function() {
		};
		subxhr.send();
	};
	xhr.onerror = function() {
	};
	xhr.send();
}
// <title>Live view  - AXIS 212 PTZ Network Camera</title>

//http://camera1.mairie-brest.fr/view/index.shtml