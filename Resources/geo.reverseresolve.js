exports.get = function(latlng, _callback) {
	var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=false';
	xhr = Ti.Network.createHTTPClient();
	xhr.open('GET', url, true);
	xhr.onload = function() {
		var _res = JSON.parse(this.responseText);
		if (_res.status == 'OK') {
			var comps = _res.results[0].address_components;
			var res = {};
			for (var i = 0; i < comps.length; i++) {
				if (comps[i].types[0] == 'country')
					res.country = comps[i]["long_name"];
				if (comps[i].types[0] == 'locality')
					res.city = comps[i]["long_name"];
				if (comps[i].types[0] == 'route')
					res.street = comps[i]["long_name"];
				if (comps[i].types[0] == 'street_number')
					res.number = comps[i]["long_name"];
			}
			if (!res.number) res.number = '';
			if (!res.street) res.street = '';
			
			_callback({
				res : res,
				success : true
			});
		}
		_callback({
			success : false
		});
	};
	xhr.onerror = function() {
		_callback({
			success : false
		});
	};
	xhr.send();
}
