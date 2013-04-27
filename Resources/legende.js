exports.get = function(text) {
	return Ti.UI.createLabel({
		text : text,
		top : 10,
		color : 'white',
		left : 5,
		right : 5,
		height : 14,
		font : {
			fontFamily : 'RotisSansSerif-ExtraBold',
			fontSize : 12
		}
	});
}
