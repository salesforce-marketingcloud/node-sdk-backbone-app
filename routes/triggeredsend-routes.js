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
	
	var triggeredSend = ET_Client.triggeredSend(options);	
			
	triggeredSend.post(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
	
});

restRouter.get( '/test-triggeredsend-get', function( req, res ) {

	var options = {
		props: ["Name"
				,"CustomerKey"
				,"SendClassification.CustomerKey"
				,"SendClassification.ObjectID"
				,"SendClassification.PartnerKey"
				,"TriggeredSendStatus"
				]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'TriggeredSendKey',
        	operator: 'equals',
        	rightOperand: 'SDKTriggeredSend'
   		}
   		*/
	};	
	var triggeredSend = ET_Client.triggeredSend(options);
	
	triggeredSend.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});		
	
});

restRouter.get( '/test-triggeredsend-patch', function( req, res ) {
	var options = {
		props: {"CustomerKey" : "1859"
				, "Name" : "SDK Example, now Updated!"
				, "SendClassification": {"ObjectID" : "1930abcb-633f-e411-b83d-38eaa7142645"}} 
	};	
	var triggeredSend = ET_Client.triggeredSend(options);
	
	triggeredSend.patch(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
});

restRouter.get( '/test-triggeredsend-delete', function( req, res ) {
	var options = {
		props: {"CustomerKey" : "1859"}  //required
	};	
	var triggeredSend = ET_Client.triggeredSend(options);
	
	triggeredSend.delete(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
});

restRouter.get( '/test-triggeredsend-send', function( req, res ) {
	var options = {
			
			props: {
				"TriggeredSendDefinition": {
					"CustomerKey" : "1859"
				}	
				,"Subscribers": [{
					"EmailAddress" : "newexample@bh.exacttarget.com" 
					,"SubscriberKey" : "newexample@bh.exacttarget.com"
					,"Attributes" : [{'Name' : 'FirstName', 'Value' : 'Bob'}, {'Name' : 'LastName', 'Value' : 'Smith'}]
				}]
			}			
	};	
	var triggeredSend = ET_Client.triggeredSend(options);
	
	triggeredSend.send(function(err,response) {
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