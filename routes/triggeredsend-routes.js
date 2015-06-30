'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );


// setting up routes
restRouter.get( '/test-triggeredsend-post', function( req, res ) {
	
	var options = {
		props: {"Name" : "SDKTriggeredSend"
				,"Description" : "SDK Created TriggeredSend"
				,"Email": {"ID" : 3509}
				,"SendClassification": {"CustomerKey" : "Default Commercial"}
		}
	};			
	
	var triggeredSend = ET_Client.TriggeredSend(options);	
			
	triggeredSend.post(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
	
});

restRouter.get( '/test-triggeredsend-get', function( req, res ) {

	var options = {
		props: ["Name","CustomerKey","SendClassification.CustomerKey","SendClassification.ObjectID","SendClassification.PartnerKey"]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'TriggeredSendKey',
        	operator: 'equals',
        	rightOperand: 'SDKTriggeredSend'
   		}
   		*/
	};	
	var triggeredSend = ET_Client.TriggeredSend(options);
	
	triggeredSend.get(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});		
	
});

restRouter.get( '/test-triggeredsend-patch', function( req, res ) {
	var options = {
		props: {"CustomerKey" : "1859", "Name" : "SDK Example, now Updated!"} 
	};	
	var triggeredSend = ET_Client.TriggeredSend(options);
	
	triggeredSend.patch(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});

restRouter.get( '/test-triggeredsend-delete', function( req, res ) {
	var options = {
		props: {"CustomerKey" : "1859"}  //required
	};	
	var triggeredSend = ET_Client.TriggeredSend(options);
	
	triggeredSend.delete(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});

restRouter.get( '/test-triggeredsend-send', function( req, res ) {
	var options = {
			props: {"CustomerKey" : "1859"}
			,subscribers: [{
				"EmailAddress" : "newexample@bh.exacttarget.com" 
				,"SubscriberKey" : "newexample@bh.exacttarget.com"
				,"Attributes" : [{'Name' : 'FirstName', 'Value' : 'Bob'}, {'Name' : 'LastName', 'Value' : 'Smith'}]
			}]
	};	
	var triggeredSend = ET_Client.TriggeredSend(options);
	
	triggeredSend.send(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});



// exporting the router
module.exports = restRouter;