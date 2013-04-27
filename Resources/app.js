var splash = require('splashwindow').create();
splash.open();

var tabGroup = Ti.UI.createTabGroup({
		bottom : -50
	});
var win = require('listofcameras').get(function() {
	tabGroup.addTab(Ti.UI.createTab({
		window : win
	}));
	tabGroup.open();
});

