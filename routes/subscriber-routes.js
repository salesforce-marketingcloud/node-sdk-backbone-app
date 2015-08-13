'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );
var helpers = require( '../lib/helpers' );

function postSubscriber ( req, res ) {
	var options = {
		props: {"EmailAddress" : "newexample@bh.exacttarget.com"
				,"SubscriberKey" : "SDKSubscriber2"
				,"Attributes": [{'Name': 'First Name', 'Value': 'ExactTarget Example'}]
				//,"Lists": [{'ID':'6286','Status':'Active'}] //to add to specific lists
		}
	};				
	
	var subscriber = ET_Client.subscriber(options);	
			
	subscriber.post(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function getSubscriber ( req, res ) {
	var options = {
		props: ["EmailAddress","SubscriberKey"]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'SubscriberKey',
        	operator: 'equals',
        	rightOperand: 'SDKSubscriber'
   		}
   		*/
	};	
	var subscriber = ET_Client.subscriber(options);
	
	subscriber.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function patchSubscriber ( req, res ) {
	var options = {
		props: {"Status" : "Unsubscribed", "SubscriberKey" : "SDKSubscriber"}
	};	
	var subscriber = ET_Client.subscriber(options);
	
	subscriber.patch(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function deleteSubscriber ( req, res ) {
	var options = {
		props: {"SubscriberKey" : "SDKSubscriber"}  //required
	};	
	var subscriber = ET_Client.subscriber(options);
	
	subscriber.delete(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};


restRouter.get( '/test-subscriber-post', function( req, res ) {
	helpers.sendCodeOrData(postSubscriber, req, res);
});

restRouter.get( '/test-subscriber-get', function( req, res ) {	
	helpers.sendCodeOrData(getSubscriber, req, res);
});	

restRouter.get( '/test-subscriber-patch', function( req, res ) {
	helpers.sendCodeOrData(patchSubscriber, req, res);
});

restRouter.get( '/test-subscriber-delete', function( req, res ) {
	helpers.sendCodeOrData(deleteSubscriber, req, res);
});



// exporting the router
module.exports = restRouter;