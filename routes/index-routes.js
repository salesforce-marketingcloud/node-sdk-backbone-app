'use strict';

var express     = require( 'express' );
var indexRouter = express.Router();
var config = require( 'config' );

var defaultOptions = {
	title: 'node-sdk-backbone-app | by Salesforce Marketing Cloud',
	ui: config.ui,
	uiJSON: JSON.stringify( config.ui )
};

// setting up routes
indexRouter.get( '/', function( req, res ) {	
	res.render( 'index', defaultOptions );
});


// exporting the router
module.exports = indexRouter;
