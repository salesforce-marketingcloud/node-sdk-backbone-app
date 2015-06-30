'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );




// setting up routes
restRouter.get( '/test-subscriber-post', function( req, res ) {
	
	var options = {
		props: {"EmailAddress" : "newexample@bh.exacttarget.com"
				,"SubscriberKey" : "SDKSubscriber2"
				,"Attributes": [{'Name': 'First Name', 'Value': 'ExactTarget Example'}]
				//,"Lists": [{'ID':'6286','Status':'Active'}] //to add to specific lists
		}
	};				
	
	var subscriber = ET_Client.Subscriber(options);	
			
	subscriber.post(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
	
});

restRouter.get( '/test-subscriber-get', function( req, res ) {

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
	var subscriber = ET_Client.Subscriber(options);
	
	subscriber.get(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});		
	
});

restRouter.get( '/test-subscriber-patch', function( req, res ) {
	var options = {
		props: {"Status" : "Unsubscribed", "SubscriberKey" : "SDKSubscriber"}
	};	
	var subscriber = ET_Client.Subscriber(options);
	
	subscriber.patch(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});

restRouter.get( '/test-subscriber-delete', function( req, res ) {
	var options = {
		props: {"SubscriberKey" : "SDKSubscriber"}  //required
	};	
	var subscriber = ET_Client.Subscriber(options);
	
	subscriber.delete(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});



// exporting the router
module.exports = restRouter;