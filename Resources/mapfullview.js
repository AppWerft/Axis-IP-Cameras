exports.create = function(_camera) {
	var self = Ti.UI.createWindow({
		title : _camera.title,
		backgroundImage : '/assets/bg.png',
		navBarHidden : false,
		barColor : 'gray'
	});
	self.container = Ti.UI.createView({
		layout : 'vertical',
		borderRadius : 7,
		width : '90%',
		backgroundColor : 'gray',
		height : 200,
		top : -220
	});
	self.container.add(Ti.UI.createView({
		height : 10
	}));
	var elems = ['Street', 'City', 'Country'];
	for (var i = 0; i < elems.length; i++) {
		var elem = elems[i];
		self.container.add(require('legende').get(elem));
		self[elem] = Titanium.UI.createTextField({
			color : '#336699',
			height : 20,
			width : Ti.UI.FILL,
			autocorrect : false,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			hintText : elem,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		self.container.add(self[elem]);
	}
	self.button = Titanium.UI.createButton({
		title : 'Looking for address',
		top : 15,
		width : 200,
		height : 30
	});
	self.button.addEventListener('click', function() {
		self["Street"].blur();
		self["Country"].blur();
		self["City"].blur();
		require('geo.resolve').get({
			street : self.Street.value,
			city : self.City.value,
			country : self.Country.value,
		}, function(_e) {
			self.mapview.setLocation({
				latitude : _e.res.lat,
				longitude : _e.res.lng,
				animate : true,
				latitudeDelta : 0.04,
				longitudeDelta : 0.04
			});
			self.mapview.removeAnnotation(self.mapview.camerapin);
			self.mapview.camerapin.setLatitude(_e.res.lat);
			self.mapview.camerapin.setLongitude(_e.res.lng);
			self.mapview.addAnnotation(self.mapview.camerapin);
		});
	});
	self.container.add(self.button);
	self.add(self.container);
	self.mapview = Ti.Map.createView({
		bottom : 0,
		height : 230,
		borderRadius : 7,
		mapType : Ti.Map.HYBRID_TYPE,
		region : {
			latitude : _camera.lat,
			longitude : _camera.lon,
			latitudeDelta : 0.004,
			longitudeDelta : 0.004,
		}
	});
	self.mapview.camerapin = Titanium.Map.createAnnotation({
		latitude : _camera.lat,
		longitude : _camera.lon,
		draggable : true,
		title : _camera.title,
		subtitle : 'You can drag the marker to change position',
		image : '/assets/camera.png',
		animate : true,

	});
	self.mapview.addAnnotation(self.mapview.camerapin);
	self.mapview.addEventListener('pinchangedragstate', function(_e) {
		self.mapview.camerapin.subtitle = '';
		require('geo.reverseresolve').get(_e.annotation.getLatitude() + ',' + _e.annotation.getLongitude(), function(_res) {
			if (_res != null) {
				self.Street.value = _res.street + ' ' + _res.number;
				self.City.value = _e.city;
				self.Country.value = _e.country;
			}
		});
	});
	self.container.animate(Ti.UI.createAnimation({
		top : -7,
		duration : 700
	}));
	self.add(self.mapview);

	require('geo.reverseresolve').get(_camera.lat + ',' + _camera.lon, function(_res) {
		console.log(_res);
		if (_res != null) {
			self["Street"].value = _res.street + ' ' + _res.number;
			self["City"].value = _res.city;
			self["Country"].value = _res.country;
		}
	});

	return self;
}