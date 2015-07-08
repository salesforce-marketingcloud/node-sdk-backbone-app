'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );


//****************************************************************************************
//								Bounce Event
//****************************************************************************************
restRouter.get( '/test-bounceevent-post', function( req, res ) {
	
	res.status(500).send( {error: 'Create is not available for this object.'} );
	
});

restRouter.get( '/test-bounceevent-get', function( req, res ) {

	var options = {
		props: ["SendID", "EventDate", "SubscriberKey"]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'SubscriberKey',
        	operator: 'equals',
        	rightOperand: 'example@bh.exacttarget.com'
   		}
   		*/
	};	
	var bounceevent = ET_Client.bounceEvent(options);
	
	bounceevent.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});		
	
});

restRouter.get( '/test-bounceevent-patch', function( req, res ) {
	res.status(500).send( {error: 'Update is not available for this object.'} );
});

restRouter.get( '/test-bounceevent-delete', function( req, res ) {
	res.status(500).send( {error: 'Delete is not available for this object.'} );
});


//****************************************************************************************
//								Click Event
//****************************************************************************************
restRouter.get( '/test-clickevent-post', function( req, res ) {
	
	res.status(500).send( {error: 'Create is not available for this object.'} );
	
});

restRouter.get( '/test-clickevent-get', function( req, res ) {

	var options = {
		props: ["SendID", "EventDate", "SubscriberKey"]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'SubscriberKey',
        	operator: 'equals',
        	rightOperand: 'example@bh.exacttarget.com'
   		}
   		*/
	};	
	var clickevent = ET_Client.clickEvent(options);
	
	clickevent.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});		
	
});

restRouter.get( '/test-clickevent-patch', function( req, res ) {
	res.status(500).send( {error: 'Update is not available for this object.'} );
});

restRouter.get( '/test-clickevent-delete', function( req, res ) {
	res.status(500).send( {error: 'Delete is not available for this object.'} );
});


//****************************************************************************************
//								Open Event
//****************************************************************************************
restRouter.get( '/test-openevent-post', function( req, res ) {
	
	res.status(500).send( {error: 'Create is not available for this object.'} );
	
});

restRouter.get( '/test-openevent-get', function( req, res ) {

	var options = {
		props: ["SendID", "EventDate", "SubscriberKey"]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'SubscriberKey',
        	operator: 'equals',
        	rightOperand: 'example@bh.exacttarget.com'
   		}
   		*/
	};	
	var openevent = ET_Client.openEvent(options);
	
	openevent.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});		
	
});

restRouter.get( '/test-openevent-patch', function( req, res ) {
	res.status(500).send( {error: 'Update is not available for this object.'} );
});

restRouter.get( '/test-openevent-delete', function( req, res ) {
	res.status(500).send( {error: 'Delete is not available for this object.'} );
});


//****************************************************************************************
//								Sent Event
//****************************************************************************************
restRouter.get( '/test-sentevent-post', function( req, res ) {
	
	res.status(500).send( {error: 'Create is not available for this object.'} );
	
});

restRouter.get( '/test-sentevent-get', function( req, res ) {

	var options = {
		props: ["SendID", "EventDate", "SubscriberKey"]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'SubscriberKey',
        	operator: 'equals',
        	rightOperand: 'example@bh.exacttarget.com'
   		}
   		*/
	};	
	var sentevent = ET_Client.sentEvent(options);
	
	sentevent.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});		
	
});

restRouter.get( '/test-sentevent-patch', function( req, res ) {
	res.status(500).send( {error: 'Update is not available for this object.'} );
});

restRouter.get( '/test-sentevent-delete', function( req, res ) {
	res.status(500).send( {error: 'Delete is not available for this object.'} );
});


//****************************************************************************************
//								Unsub Event
//****************************************************************************************
restRouter.get( '/test-unsubevent-post', function( req, res ) {
	
	res.status(500).send( {error: 'Create is not available for this object.'} );
	
});

restRouter.get( '/test-unsubevent-get', function( req, res ) {

	var options = {
		props: ["SendID", "EventDate", "SubscriberKey"]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'SubscriberKey',
        	operator: 'equals',
        	rightOperand: 'example@bh.exacttarget.com'
   		}
   		*/
	};	
	var unsubevent = ET_Client.unsubEvent(options);
	
	unsubevent.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});		
	
});

restRouter.get( '/test-unsubevent-patch', function( req, res ) {
	res.status(500).send( {error: 'Update is not available for this object.'} );
});

restRouter.get( '/test-unsubevent-delete', function( req, res ) {
	res.status(500).send( {error: 'Delete is not available for this object.'} );
});




// exporting the router
module.exports = restRouter;