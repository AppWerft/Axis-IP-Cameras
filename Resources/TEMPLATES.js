exports.cameraitem = {
	properties : {
		height : Ti.UI.CONF.iconsize,
		bindId : 'camera',
	},
	childTemplates : [{
		type : 'Ti.UI.View',
		properties : {
			width : Ti.UI.FILL,
			height : Ti.UI.CONF.iconsize

		},
		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'image',
			properties : {
				left : 0,
				top : 0,
				defaultImage : '',
				width : Ti.UI.CONF.iconsize,
				height : Ti.UI.CONF.iconsize
			},
			events : {}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				color : '#666',
				height : Ti.UI.CONF.fontsize_title * 1.2,
				font : {
					fontSize : Ti.UI.CONF.fontsize_title,
					fontWeight : 'bold',
				},
				left : Ti.UI.CONF.padding + Ti.UI.CONF.iconsize,
				top : Ti.UI.CONF.padding / 2,
				width : Ti.UI.FILL,
			},
			events : {}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'subtitle',
			properties : {
				font : {
					fontSize : Ti.UI.CONF.fontsize_subtitle
				},
				left : Ti.UI.CONF.padding + Ti.UI.CONF.iconsize,
				top : 2*Ti.UI.CONF.fontsize_title,
				width : Ti.UI.FILL,
				height : Ti.UI.CONF.fontsize_subtitle
			},
			events : {}
		}]
	}]
};
