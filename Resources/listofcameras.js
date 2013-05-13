exports.create = function() {
	Ti.include('cameras.js');
	var rightButton = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.ADD
	});
	var self = Titanium.UI.createWindow({
		title : 'List of AXIS-cameras',
		navBarHidden : false,
		barColor : 'black',
		rightNavButton : rightButton
	});

	self.container = Ti.UI.createScrollableView({
		showPagingControl : true,
		zIndex : 0
	});
	//self.add(self.container);

	var data = [];
	for (var i = 0; i < cameras.length; i++) {
		var camera = cameras[i];
		camera.host = camera.url.split(':')[0];camera.port = camera.url.split(':')[1] || 80;
		camera.lat = camera.latlon.split(',')[0];
		camera.lon = camera.latlon.split(',')[1];
		data.push({
			image : {
				image : 'http://' + camera.host + ':' + camera.port + '/axis-cgi/jpg/image.cgi'
			},
			title : {
				text : camera.title
			},
			subtitle : {
				text : camera.subtitle
			},
			properties : {
				itemId : JSON.stringify(camera),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}
		});
	}
	var cameralistTemplate = require('TEMPLATES').cameraitem;
	var section = Ti.UI.createListSection({
		items : data,
	});
	self.cameralistview = Ti.UI.createListView({
		sections : [section],
		templates : {
			'cameras' : cameralistTemplate
		},
		defaultItemTemplate : 'cameras',
	});
	self.mapview = Ti.Map.createView({
		mapType : Ti.Map.HYBRID_TYPE,
		region : {
			latitude : 0,
			longitude : 0,
			latitudeDelta : 4,
			longitudeDelta : 4,
		}
	});
	var pins = [];
	for (var i = 0; i < cameras.length; i++) {
		pins[i] = Ti.Map.createAnnotation({
			latitude : cameras[i].lat,
			longitude : cameras[i].lon,
			title : cameras[i].title,
			image : '/assets/camera.png',
		});
		self.mapview.addAnnotations(pins);
	}
	self.container.views = [self.cameralistview, self.mapview];

	self.add(self.container);
	self.cameralistview.addEventListener('itemclick', function(_e) {
		console.log(_e.itemId);
		self.tab.open(require('cameraadmin').create(JSON.parse(_e.itemId)), {
			animate : true
		});
	});
	return self;
}