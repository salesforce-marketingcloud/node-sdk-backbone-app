'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );




// setting up routes
restRouter.get( '/test-de-post', function( req, res ) {
	
	var options = {
		props: {"Name" : "SDKDataExtension", "Description": "SDK Created Data Extension"}
		,columns: [	{"Name" : "Key", "FieldType" : "Text", "IsPrimaryKey" : "true", "MaxLength" : "100", "IsRequired" : "true"}
					,{"Name" : "Value", "FieldType" : "Text"}
				]
	};			
	
	var de = ET_Client.DataExtension(options);	
			
	de.post(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
	
});

restRouter.get( '/test-de-get', function( req, res ) {

	var options = {
		props: ['Name', 'CustomerKey']  //required
		,filter: {						//remove filter for all.
        	leftOperand: 'Name',
        	operator: 'equals',
        	rightOperand: 'SDKDataExtension'
   		}
	};	
	var de = ET_Client.DataExtension(options);
	
	de.retrieve(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});		
	
});

restRouter.get( '/test-de-patch', function( req, res ) {
	var options = {
		props: {'CustomerKey' : '7DEC95AA-562D-4915-92D9-509F37F27E4C', Name: 'SDKDataExtensionUpdated'}  //required
	};	
	var de = ET_Client.DataExtension(options);
	
	de.update(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});

restRouter.get( '/test-de-delete', function( req, res ) {
	var options = {
		props: {'CustomerKey' : '7DEC95AA-562D-4915-92D9-509F37F27E4C'}  //required
	};	
	var de = ET_Client.DataExtension(options);
	
	de.delete(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});



// exporting the router
module.exports = restRouter;