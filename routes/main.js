'use strict';

var indexRoutes = require( './index-routes' );
var restRoutes = require( './rest-routes' );
var soapRoutes = require( './soap-routes' );
var deRoutes = require( './de-routes' );
var campaignRoutes = require( './campaign-routes' );
var contentAreaRoutes = require( './contentarea-routes' );
var emailRoutes = require( './email-routes' );
var folderRoutes = require( './folder-routes' );
var listRoutes = require( './list-routes' );
var subscriberRoutes = require( './subscriber-routes' );
var triggeredSendRoutes = require( './triggeredSend-routes' );
var trackingRoutes = require( './tracking-routes' );


module.exports = {
	index: indexRoutes
	,rest: restRoutes
	,soap: soapRoutes
	,de: deRoutes
	,campaign: campaignRoutes
	,contentArea: contentAreaRoutes
	,email: emailRoutes
	,folder: folderRoutes
	,list: listRoutes
	,subscriber: subscriberRoutes
	,triggeredSend: triggeredSendRoutes
	,tracking: trackingRoutes
};
