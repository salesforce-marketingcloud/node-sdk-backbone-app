'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );




// setting up routes
restRouter.get( '/test-folder-post', function( req, res ) {
	
	var options = {
		props: {"CustomerKey" : "SDK Folder", "Name" : "SDK Folder", "Description" : "SDK Example Folder", "ContentType": "EMAIL", "ParentFolder" : {"ID" : "1705"}, "AllowChildren" : "true", "IsEditable" : "true" }
	};			
	
	var folder = ET_Client.Folder(options);	
			
	folder.post(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
	
});

restRouter.get( '/test-folder-get', function( req, res ) {

	var options = {
		props: ["ParentFolder.ID", "ID", "Name"]  //required
		/*
		,filter: {						//remove filter for all.
        	leftOperand: 'ID',
        	operator: 'equals',
        	rightOperand: 'SDK Example'
   		}
   		*/
	};	
	var folder = ET_Client.Folder(options);
	
	folder.get(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});		
	
});

restRouter.get( '/test-folder-patch', function( req, res ) {
	var options = {
		props: {"ID": "56337", "Name" : "SDK Example, now Updated!"}
	};	
	var folder = ET_Client.Folder(options);
	
	folder.patch(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});

restRouter.get( '/test-folder-delete', function( req, res ) {
	var options = {
		props: {"ID": "56337"}  //required
	};	
	var folder = ET_Client.Folder(options);
	
	folder.delete(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});




// exporting the router
module.exports = restRouter;