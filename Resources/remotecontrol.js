//Ti.include('/lightapps/passwordAlert.js');
exports.com = function(_camera, _action, _callback) {
	var url = 'http://' + _camera.url + '/axis-cgi/com/ptz.cgi?camera=1&' + _action;
	var xhr = Titanium.Network.createHTTPClient({
		onload : function(e) {
			_callback(this.status);
		},
		onerror : function(e) {
			_callback(this.status);
		}
	});
	var authstr = 'Basic ' + Ti.Utils.base64encode(_camera.login + ':' + _camera.password);
	xhr.setRequestHeader('Authorization', authstr);
	xhr.open('GET', url);
	xhr.send();
}
