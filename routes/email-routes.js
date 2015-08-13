'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );
var helpers = require( '../lib/helpers' );

function postEmail ( req, res ) {
	var options = {
		props: {"CustomerKey" : "SDK Example", "Name":"SDK Example", "Subject" : "Created Using the SDK", "HTMLBody": "<b>Some HTML Goes here</b>", "EmailType" : "HTML", "IsHTMLPaste" : "true"}
	};			
	
	var email = ET_Client.email(options);	
			
	email.post(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function getEmail ( req, res ) {
	var options = {
		props: ['Name', 'CustomerKey', 'ID']  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'Name',
        	operator: 'equals',
        	rightOperand: 'SDK Example'
   		}
   		*/
	};	
	var email = ET_Client.email(options);
	
	email.get(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function patchEmail ( req, res ) {
	var options = {
		props: {"CustomerKey" : "SDK Example", "Name" : "SDK Example", "Content" : "<b>Some (new) HTML Content Goes here</b>", "EmailType" : "HTML", "IsHTMLPaste" : "true"}
	};	
	var email = ET_Client.email(options);
	
	email.patch(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};

function deleteEmail ( req, res ) {
	var options = {
		props: {"CustomerKey" : "SDK Example"}  //required
	};	
	var email = ET_Client.email(options);
	
	email.delete(function(err,response) {
		if (err) {
			res.status(500).send( err )
		} else {
			var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
			var result = response && response.body ? response.body : response;
			response && res.status(statusCode).send( result );
		}
	});
};


restRouter.get( '/test-email-post', function( req, res ) {
	helpers.sendCodeOrData(postEmail, req, res);
});

restRouter.get( '/test-email-get', function( req, res ) {	
	helpers.sendCodeOrData(getEmail, req, res);
});	

restRouter.get( '/test-email-patch', function( req, res ) {
	helpers.sendCodeOrData(patchEmail, req, res);
});

restRouter.get( '/test-email-delete', function( req, res ) {
	helpers.sendCodeOrData(deleteEmail, req, res);
});


// exporting the router
module.exports = restRouter;