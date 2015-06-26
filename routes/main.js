'use strict';

var indexRoutes = require( './index-routes' );
var restRoutes = require( './rest-routes' );
var soapRoutes = require( './soap-routes' );
var deRoutes = require( './de-routes' );
var campaignRoutes = require( './campaign-routes' );
var contentAreaRoutes = require( './contentarea-routes' );

module.exports = {
	index: indexRoutes
	,rest: restRoutes
	,soap: soapRoutes
	,de: deRoutes
	,campaign: campaignRoutes
	,contentArea: contentAreaRoutes
};
