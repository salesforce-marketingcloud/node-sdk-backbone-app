'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );




// setting up routes
restRouter.get( '/test-list-post', function( req, res ) {
	
	var options = {
		props: {"ListName" : "SDKList", "Description" : "SDK Created List"}
	};			
	
	var list = ET_Client.List(options);	
			
	list.post(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
	
});

restRouter.get( '/test-list-get', function( req, res ) {

	var options = {
		props: ["ListName", "CustomerKey", "ID"]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'ID',
        	operator: 'equals',
        	rightOperand: '6284'
   		}
   		*/
	};	
	var list = ET_Client.List(options);
	
	list.get(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});		
	
});

restRouter.get( '/test-list-patch', function( req, res ) {
	var options = {
		props: {"ID": "6284", "ListName" : "SDK Example, now Updated!"}
	};	
	var list = ET_Client.List(options);
	
	list.patch(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});

restRouter.get( '/test-list-delete', function( req, res ) {
	var options = {
		props: {"ID": "6284"}  //required
	};	
	var list = ET_Client.List(options);
	
	list.delete(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});

//****************************************************************************************
//								List Subscriber
//****************************************************************************************

restRouter.get( '/test-list-subscriber-post', function( req, res ) {
	
	res.status(500).send( {error: 'Create is not available for this object.'} );
	
});

restRouter.get( '/test-list-subscriber-get', function( req, res ) {

	var options = {
		props: ["ListID", "SubscriberKey"]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'SubscriberKey',
        	operator: 'equals',
        	rightOperand: 'example@example.com'
   		}
   		*/
	};	
	var listsub = ET_Client.ListSubscriber(options);
	
	listsub.get(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});		
	
});

restRouter.get( '/test-list-subscriber-patch', function( req, res ) {
	res.status(500).send( {error: 'Update is not available for this object.'} );
});

restRouter.get( '/test-list-subscriber-delete', function( req, res ) {
	res.status(500).send( {error: 'Delete is not available for this object.'} );
});




// exporting the router
module.exports = restRouter;