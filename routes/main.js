'use strict';

var indexRoutes = require( './index-routes' );
var restRoutes = require( './rest-routes' );
var soapRoutes = require( './soap-routes' );
var deRoutes = require( './de-routes' );

module.exports = {
	index: indexRoutes
	,rest: restRoutes
	,soap: soapRoutes
	,de: deRoutes
};
