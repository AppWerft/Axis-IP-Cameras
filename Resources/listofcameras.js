exports.get = function(_callback) {
	Ti.include('cameras.js');
	var rightButton = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.ADD
	});
	var self = Titanium.UI.createWindow({
		title : 'List of cameras',
		navBarHidden : false,
		barColor : 'gray',
		rightNavButton : rightButton
	});
	
	self.container = Ti.UI.createScrollableView({
		showPagingControl : true,
		zIndex : 0
	});
	self.add(self.container);
	setTimeout(function() {
		self.tv = Ti.UI.createTableView({
			backgroundImage : '/assets/bg.png',
			height : Ti.UI.FILL,
		});
		var pins = [];
		for (var i = 0; i < cameras.length; i++) {
			self.tv.appendRow(require('camerarow').get(cameras[i]));
		}
		_callback();
		self.mapview = Ti.Map.createView({
			mapType : Ti.Map.HYBRID_TYPE,
			region : {
				latitude : 0,
				longitude : 0,
				latitudeDelta : 4,
				longitudeDelta : 4,
			}
		});

		self.tv.addEventListener('click', function(_e) {

			var admin = require('camerafullview').create(_e.rowData.camera, false);
			self.tab.open(admin);
		});

		var pins = [];
		for (var i = 0; i < cameras.length; i++) {
			pins[i] = Titanium.Map.createAnnotation({
				latitude : cameras[i].lat,
				longitude : cameras[i].lon,
				title : cameras[i].title,
				image : '/assets/camera.png',

			});
			self.mapview.addAnnotations(pins);

		}
		self.container.views = [self.tv, self.mapview];

	}, 100);
	return self;
}