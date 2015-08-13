'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );
var helpers = require( '../lib/helpers' );

function postContentArea ( req, res ) {
	var options = {
		props: {"CustomerKey" : "ExampleContentArea", "Name" : "ExampleContentArea", "Content" : "<b>Some HTML Content Goes here</b>"}
	};			
	
	var contentArea = ET_Client.contentArea(options);	
			
	contentArea.post(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function getContentArea ( req, res ) {
	var options = {
		props: ['Name', 'CustomerKey']  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'Name',
        	operator: 'equals',
        	rightOperand: 'ExampleContentArea'
   		}
   		*/
	};	
	var contentArea = ET_Client.contentArea(options);
	
	contentArea.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function patchContentArea ( req, res ) {
	var options = {
		props: {"CustomerKey" : "ExampleContentArea", "Name" : "ExampleContentArea", "Content" : "<b>Some (new) HTML Content Goes here</b>"}
	};	
	var contentArea = ET_Client.contentArea(options);
	
	contentArea.patch(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function deleteContentArea ( req, res ) {
	var options = {
		props: {"CustomerKey" : "ExampleContentArea"}  //required
	};	
	var contentArea = ET_Client.contentArea(options);
	
	contentArea.delete(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};


restRouter.get( '/test-contentarea-post', function( req, res ) {
	helpers.sendCodeOrData(postContentArea, req, res);
});

restRouter.get( '/test-contentarea-get', function( req, res ) {	
	helpers.sendCodeOrData(getContentArea, req, res);
});	

restRouter.get( '/test-contentarea-patch', function( req, res ) {
	helpers.sendCodeOrData(patchContentArea, req, res);
});

restRouter.get( '/test-contentarea-delete', function( req, res ) {
	helpers.sendCodeOrData(deleteContentArea, req, res);
});


// exporting the router
module.exports = restRouter;