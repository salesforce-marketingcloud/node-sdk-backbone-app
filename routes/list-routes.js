'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );
var helpers = require( '../lib/helpers' );

function postList ( req, res ) {
	var options = {
		props: {"ListName" : "SDKList", "Description" : "SDK Created List"}
	};			
	
	var list = ET_Client.list(options);	
			
	list.post(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function getList ( req, res ) {
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
	var list = ET_Client.list(options);
	
	list.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function patchList ( req, res ) {
	var options = {
		props: {"ID": "6284", "ListName" : "SDK Example, now Updated!"}
	};	
	var list = ET_Client.list(options);
	
	list.patch(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function deleteList ( req, res ) {
	var options = {
		props: {"ID": "6284"}  //required
	};	
	var list = ET_Client.list(options);
	
	list.delete(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};


restRouter.get( '/test-list-post', function( req, res ) {
	helpers.sendCodeOrData(postList, req, res);
});

restRouter.get( '/test-list-get', function( req, res ) {	
	helpers.sendCodeOrData(getList, req, res);
});	

restRouter.get( '/test-list-patch', function( req, res ) {
	helpers.sendCodeOrData(patchList, req, res);
});

restRouter.get( '/test-list-delete', function( req, res ) {
	helpers.sendCodeOrData(deleteList, req, res);
});



//****************************************************************************************
//								List Subscriber
//****************************************************************************************


function getListSubscriber ( req, res ) {
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
	var listsub = ET_Client.listSubscriber(options);
	
	listsub.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};


restRouter.get( '/test-list-subscriber-post', function( req, res ) {
	res.status(500).send( {error: 'Create is not available for this object.'} );
});

restRouter.get( '/test-list-subscriber-get', function( req, res ) {	
	helpers.sendCodeOrData(getListSubscriber, req, res);
});	

restRouter.get( '/test-list-subscriber-patch', function( req, res ) {
	res.status(500).send( {error: 'Update is not available for this object.'} );
});

restRouter.get( '/test-list-subscriber-delete', function( req, res ) {
	res.status(500).send( {error: 'Delete is not available for this object.'} );
});




// exporting the router
module.exports = restRouter;