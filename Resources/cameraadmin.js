exports.create = function(_camera) {
	var self = Titanium.UI.createWindow({
		title : 'Configuration',
		backgroundImage : '/assets/bg.png',
		navBarHidden : false,
		barColor : 'black'
	});
	console.log(_camera);
	setTimeout(function() {
		if (!_camera.latlon) {
			require('geo.ip').get(_camera.host, function(_e) {
			});
		}
		var container = Ti.UI.createView({
			layout : 'vertical',
			top : -180,
			width : '90%',
			backgroundColor : 'gray',
			height : 280,
			borderRadius : 7
		});

		container.add(require('legende').get('Title of location:'));
		var title = Ti.UI.createTextField({
			color : '#336699',
			height : 20,
			value : _camera.title,
			top : 0,
			left : 0,
			width : Ti.UI.FILL,
			autocorrect : false,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			hintText : 'Title of location',
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		container.add(title);
		container.add(require('legende').get('Hostname and port of axis-camera:'));
		var url = Ti.UI.createView({
			height : 20
		});

		var host = Titanium.UI.createTextField({
			color : '#336699',
			height : 20,
			value : _camera.host,
			autocorrect : false,
			top : 0,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			left : 0,
			right : 80,
			hintText : 'Hostname',
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		url.add(host);
		var port = Titanium.UI.createTextField({
			color : '#336699',
			height : 20,
			value : _camera.port,
			right : 0,
			autocorrect : false,
			keyboardType : Titanium.UI.KEYBOARD_DECIMAL_PAD,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			width : 60,
			hintText : 'Port',
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		url.add(port);
		container.add(url);
		container.add(require('legende').get('Login:'));
		var login = Ti.UI.createTextField({
			color : '#336699',
			height : 20,
			value : _camera.login,
			width : Ti.UI.FILL,
			autocorrect : false,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			hintText : 'Login',
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		container.add(login);
		container.add(require('legende').get('Password:'));
		var password = Titanium.UI.createTextField({
			color : '#336699',
			height : 20,
			value : _camera.password,
			width : Ti.UI.FILL,
			autocorrect : false,
			autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			hintText : 'Password',
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		container.add(password);
		var save = Ti.UI.createView({
			height : 25
		});
		save.switcher = Ti.UI.createSwitch({
			value : true, // mandatory property for iOS
			top : 63,
			right : 6
		});
		var button = Titanium.UI.createButton({
			title : 'Cameratest',
			top : 15,
			right : 0,
			width : 100,
			height : 30
		});
		button.addEventListener('click', function() {
			port.blur();
			require('cameramodel').get(_camera.protocol + '://' + _camera.host + ':' + _camera.port, function(_model) {
				Ti.API.log(_model);
				var model = Ti.UI.createLabel({
					backgroundColor : 'black',
					color : 'white',
					height : 30,
					text : ' ' + _model + ' ',
					top : 280,
					borderRadius : 5,
					left : -320,
					font : {
						fontFamily : 'RotisSansSerif-ExtraBold'
					}
				});
				self.add(model);
				model.animate(Ti.UI.createAnimation({
					left : '50%'
				}));
			});
		});
		container.add(button);

		var mapview = Ti.Map.createView({
			left : 165,
			bottom : 5,
			width : 150,
			height : 100,
			borderRadius : 7,
			mapType : Ti.Map.HYBRID_TYPE,
			region : {
				latitude : _camera.lat,
				longitude : _camera.lon,
				latitudeDelta : 0.004,
				longitudeDelta : 0.004,

			}
		});
		
		var camerapin = Titanium.Map.createAnnotation({
			latitude : _camera.lat,
			longitude : _camera.lon,
			//	title : _camera.title,
			//	subtitle : 'AXIS 212 PTZ',
			image : '/assets/camera.png',
			animate : true,
		});
		mapview.addAnnotation(camerapin);
		mapview.addEventListener('longpress', function(_e) {
			self.tab.open(require('mapfullview').create(_camera));
		});
		var webview = Ti.UI.createWebView({
			bottom : 5,
			width : 150,
			left : 5,
			height : 100,
			disableBounce : true,
			borderRadius : 7,
			html : '<html><body style="padding:0px;margin:0px;"><img width="180" height="110" alt="" src="http://' + _camera.host + ':' + _camera.port + '/axis-cgi/mjpg/video.cgi"></body></html>'
		});
		webview.addEventListener('click', function() {
			var camerafullview = require('camerafullview').create(_camera,true);
			self.tab.open(camerafullview);
		});
		var slider1 = Titanium.UI.createSlider({
			bottom : 2,
			height : 20,
			width : '90%',
			value : 5,
			min : 0,
			transform : Ti.UI.create2DMatrix().scale(0.5),
			max : 10,
			left : -80,
			opacity : 0.5
		});
		self.add(container);
		self.add(mapview);

		self.add(webview);
		self.add(slider1);
		container.animate(Ti.UI.createAnimation({
			top : 0,
			duration : 500
		}));
		
	}, 0);
	return self;
};
