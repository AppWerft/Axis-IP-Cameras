var splash = require('splashwindow').create();
splash.open();
Ti.UI.CONF = {
	fontsize_title : Ti.Platform.displayCaps.platformWidth * 0.07,
	fontsize_subtitle : Ti.Platform.displayCaps.platformWidth * 0.04,
	fontsize_label : Ti.Platform.displayCaps.platformWidth * 0.04,
	padding : Ti.Platform.displayCaps.platformWidth * 0.035,
	iconsize : Ti.Platform.displayCaps.platformWidth * 0.22
};
var tabGroup = Ti.UI.createTabGroup({
	bottom : -50
});
tabGroup.open();
tabGroup.addTab(Ti.UI.createTab({
	window : require('listofcameras').create()
}));

