'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );




// setting up routes
restRouter.get( '/test-campaign-post', function( req, res ) {
	
	var options = {
		props: {"name" : "SDKCampaign", "description": "SDK Created Campaign"}
	};			
	
	var campaign = ET_Client.campaign(options);	
			
	campaign.post(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
	
});

restRouter.get( '/test-campaign-get', function( req, res ) {

	var options = {  //id/props is either/or, not both.
		//id: 553
		props: {"$page" :  "1", "$pageSize" : "10", "$orderBy" : "ModifiedDate DESC"}
	};	
	var campaign = ET_Client.campaign(options);
	
	campaign.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});		
	
});

restRouter.get( '/test-campaign-patch', function( req, res ) {
	var options = {	
		id: 553,	
		props: {"name" : "SDKCampaign", "description": "New desc for SDK Created Campaign"} //include all fields, even if not changed.
	};	
	var campaign = ET_Client.campaign(options);
		
	campaign.patch(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
});

restRouter.get( '/test-campaign-delete', function( req, res ) {
	var options = {
		id: 560
	};	
	var campaign = ET_Client.campaign(options);
	
	campaign.delete(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
});


//****************************************************************************************
//								Campaign Asset
//****************************************************************************************

restRouter.get( '/test-campaign-asset-post', function( req, res ) {
	
	var options = {
		props: {"id" : "553", "ids": [3509], "type": "EMAIL"}
	};			
	
	var campaignAsset = ET_Client.campaignAsset(options);	
			
	campaignAsset.post(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
	
});

restRouter.get( '/test-campaign-asset-get', function( req, res ) {

	var options = {
		props: {"id": "553", "assetId": "774", "$page": "1", "$pageSize": "10", "$orderBy": "ModifiedDate DESC"} //for all, do not include assetId.
	};	
	var campaignAsset = ET_Client.campaignAsset(options);
	
	campaignAsset.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});		
	
});

restRouter.get( '/test-campaign-asset-patch', function( req, res ) {
	res.status(500).send( {error: 'Update is not available for this object.'} );
});

restRouter.get( '/test-campaign-asset-delete', function( req, res ) {
	var options = {
		props: {"id": "553", "assetId": "774"}
	};	
	var campaignAsset = ET_Client.campaignAsset(options);
	
	campaignAsset.delete(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
});



// exporting the router
module.exports = restRouter;