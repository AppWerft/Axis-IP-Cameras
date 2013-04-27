exports.create = function(_camera,_callback) {
	var self = Ti.UI.createWindow({
		borderColor : '#eceded',
		borderWidth : 2,
		borderRadius : 10,
		width : 272,
		transform : Ti.UI.create2DMatrix({
			rotate : 0
		}),
		height : 200,
		backgroundImage : '/assets/login/alert-bg.png'
	});
	self.add(Ti.UI.createLabel({
		color : '#fff',
		top : 35,
		width : 260,
		height : 'auto',
		textAlign : 'center',
		font : {
			fontSize : 14
		},
		text : 'Give me login/password for this camera.'
	}));
	self.cancel = Ti.UI.createButton({
		backgroundImage : Ti.Filesystem.resourcesDirectory + '/assets/login/btn-inactive.png',
		width : 127,
		height : 43,
		bottom : 5,
		left : 5,
		borderRadius : 5,
		font : {
			fontWeight : 'bold'
		},
		title : 'Cancel'
	});
	self.add(Ti.UI.createLabel({
		color : '#fff',
		top : 10,
		width : 260,
		height : 'auto',
		textAlign : 'center',
		font : {
			fontSize : 17,
			fontWeight : 'bold'
		},
		text : 'Access denied'
	}));
	self.ok = Ti.UI.createButton({
		backgroundImage : Ti.Filesystem.resourcesDirectory + '/assets/login/btn-active.png',
		width : 127,
		height : 43,
		bottom : 5,
		right : 5,
		borderRadius : 5,
		font : {
			fontWeight : 'bold'
		},
		title : 'OK'
	});
	self.password = Ti.UI.createTextField({
		width : 260,
		height : 28,
		bottom : 60,
		backgroundColor : '#fff',
		hintText : 'Password',
		font : {
			fontSize : 16
		},
		returnKeyType : Ti.UI.RETURNKEY_DONE,
		enableReturnKey : true,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_BEZEL,
		passwordMask : true
	});
	self.login = Ti.UI.createTextField({
		width : 260,
		height : 28,
		bottom : 100,
		backgroundColor : '#fff',
		hintText : 'Login',
		font : {
			fontSize : 16
		},
		returnKeyType : Ti.UI.RETURNKEY_DONE,
		enableReturnKey : true,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_BEZEL,
		passwordMask : false
	});
	self.add(self.login);
	self.add(self.password);

	self.add(self.cancel);
	self.add(self.ok);
	self.cancel.addEventListener('click', function() {
		self.close();
		_callback(true);
	});
	self.ok.addEventListener('click', function() {
		_camera.login = self.login;
		_camera.password = self.password;
		self.close();
		_callback(false);
	});
	self.open();
}
