'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );




// setting up routes
restRouter.get( '/test-campaign-post', function( req, res ) {
	
	var options = {
		props: {"name" : "SDKCampaign", "description": "SDK Created Campaign"}
	};			
	
	var campaign = ET_Client.Campaign(options);	
			
	campaign.post(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
	
});

restRouter.get( '/test-campaign-get', function( req, res ) {

	var options = {  //id/props is either/or, not both.
		//id: 553
		props: {"$page" :  "1", "$pageSize" : "10", "$orderBy" : "ModifiedDate DESC"}
	};	
	var campaign = ET_Client.Campaign(options);
	
	campaign.get(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});		
	
});

restRouter.get( '/test-campaign-patch', function( req, res ) {
	var options = {	
		id: 553,	
		props: {"description": "New desc for SDK Created Campaign"}
	};	
	var campaign = ET_Client.Campaign(options);
		
	campaign.patch(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});

restRouter.get( '/test-campaign-delete', function( req, res ) {
	var options = {
		id: 557
	};	
	var campaign = ET_Client.Campaign(options);
	
	campaign.delete(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		res.status(statusCode).send( result );
	});
});





// exporting the router
module.exports = restRouter;