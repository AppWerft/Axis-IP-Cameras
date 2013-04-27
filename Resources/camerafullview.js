exports.create = function(_camera, admin) {
	var self = Titanium.UI.createWindow({
		title : _camera.title,
		backgroundImage : '/assets/bg.png',
		navBarHidden : false,
		loginactive : false,
		barColor : 'gray'
	});
	function callback4Cameramoving(status) {
		if (self.loginactive)
			return;
		if (status >= 400) {
			self.loginactive = true;
			require('login').create(_camera, function() {
				self.loginactive = false;
			});
			return;
		}
		actInd.show();
		setTimeout(function() {
			actInd.hide()
		}, 800);

	}

	var rightButton = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.COMPOSE
	});
	rightButton.addEventListener('click', function() {
		var admin = require('cameraadmin').create(_camera, false);
		self.tab.open(admin);
	});

	if (!admin)
		self.rightNavButton = rightButton;
	var url = _camera.protocol + '://' + _camera.host + ':' + _camera.port + '/axis-cgi/mjpg/video.cgi';
	var webview = Ti.UI.createWebView({
		width : 440,
		transform : Ti.UI.create2DMatrix().rotate(90),
		height : 320,
		disableBounce : true,
		borderRadius : 7,
		html : '<html><body style="padding:0px;margin:0px;"><img alt="" width="440" height="320" src="' + url + '"></body></html>'
	});
	self.add(webview);
	webview.addEventListener('load', function() {
		actInd.hide()
	});
	var actInd = require('actind').create('Loading webcam movie …');
	actInd.transform = Ti.UI.create2DMatrix().rotate(90);
	actInd.show();
	self.add(actInd);
	var DIRECTIONS = {
		"up" : 'down',
		"down" : 'up',
		"left" : 'right',
		"right" : 'left'
	};
	webview.addEventListener('swipe', function(_e) {
		Ti.API.log(_e.direction);
		actInd.message = 'Camera moves ' + DIRECTIONS[_e.direction];
		require('remotecontrol').com(_camera, 'move=' + DIRECTIONS[_e.direction], callback4Cameramoving);

	});
	webview.addEventListener('dblclick', function(_e) {
		actInd.message = 'Camera zoomes in';
		require('remotecontrol').com(_camera, 'zoom=1000', function(status) {
			if (status >= 400) {
				require('login').create(_camera, callback4Cameramoving);
			} else {
				actInd.show();
				actInd.show();
				setTimeout(function() {
					actInd.hide()
				}, 900);
			}

		});

		setTimeout(function() {
			actInd.hide()
		}, 900);
	});
	Ti.App.addEventListener('resume', function() {
		webview.reload();
	});
	return self;
}