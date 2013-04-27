exports.create = function() {
	var self = Ti.UI.createWindow();
	self.cam = Ti.UI.createImageView({
		image : '/assets/214.png',
		top : 0,
		width : 200,
		height : 300,
		top : -300
	});
	self.overlay = Ti.UI.createView({
		backgroundImage : '/assets/Default.png',
		width : '100%',
		height : '100%',
		zIndex : 9999,
		backgroundColor : 'silver'
	});
	self.add(self.overlay);
	self.overlay.add(self.cam);
	self.cam.animate(Ti.UI.createAnimation({
		top : 0,
		duration:700
	}));
	return self;
}
