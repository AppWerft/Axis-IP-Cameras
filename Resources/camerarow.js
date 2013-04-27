exports.get = function(camera) {
	camera.lat = camera.latlon.split(',')[0];
	camera.lon = camera.latlon.split(',')[1];
	camera.protocol = 'http';
	camera.host = camera.url.split(':')[0];
	camera.port = camera.url.split(':')[1] || 80;

	var row = Ti.UI.createTableViewRow({
		hasChild : true,
		height : Ti.UI.SIZE,
		camera : camera
	});

	row.container = Ti.UI.createView({
		left : 110,
		top : 0,
		height : Ti.UI.SIZE,
		layout : 'vertical'
	});
	row.add(row.container);
	row.container.add(Ti.UI.createLabel({
		text : camera.title,
		height : Ti.UI.SIZE,
		color : '#444',
		width : Ti.UI.FILL,
		top : 3,
		font : {
			fontWeight : 'bold',
			fontSize : 22,
			fontFamily : 'RotisSansSerif-ExtraBold'
		}
	}));
	if (camera.subtitle)
		row.container.add(Ti.UI.createLabel({
			text : camera.subtitle,
			height : Ti.UI.SIZE,
			width : Ti.UI.FILL,

			color : '#444',
			top : 3,
			font : {
				fontWeight : 'bold',
				fontSize : 16,
				fontFamily : 'RotisSansSerif-ExtraBold'
			}
		}));
	row.url = camera.protocol + '://' + camera.host + ':' + camera.port + '/axis-cgi/jpg/image.cgi';
	row.icon = Ti.UI.createImageView({
		left : 0,
		width : 100,
		height : 66,
		borderRadius : 4,
		borderWidth : 0,
		borderColor : 'silver',
		defaultImage : '',
		image : row.url
	});
	row.add(row.icon);
	require('cachedimage').cache('cache66t', row.url, row.icon, true);
	return row;
}	