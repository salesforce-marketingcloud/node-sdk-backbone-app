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
	
	de.get(function(response) {
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
	
	de.patch(function(response) {
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


//****************************************************************************************
//								Column
//****************************************************************************************

restRouter.get( '/test-de-column-post', function( req, res ) {
	
	res.status(500).send( {error: 'Create is not available for this object.'} );
	
});

restRouter.get( '/test-de-column-get', function( req, res ) {

	var options = {
		props: ['ObjectID','PartnerKey','Name','DefaultValue','MaxLength','IsRequired','Ordinal','IsPrimaryKey','FieldType','CreatedDate','ModifiedDate','Scale','Client.ID','CustomerKey']  //required	
		,filter: {						//remove filter for all.
        	leftOperand: 'Name',
        	operator: 'equals',
        	rightOperand: 'SDKDataExtension'
   		}		
	};	
	var deColumn = ET_Client.DataExtensionColumn(options);
	
	deColumn.get(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});		
	
});

restRouter.get( '/test-de-column-patch', function( req, res ) {
	res.status(500).send( {error: 'Update is not available for this object.'} );
});

restRouter.get( '/test-de-column-delete', function( req, res ) {
	res.status(500).send( {error: 'Delete is not available for this object.'} );
});


//****************************************************************************************
//								Row
//****************************************************************************************

restRouter.get( '/test-de-row-post', function( req, res ) {
	
	var options = {
		Name: "SDKDataExtension"
		,props: {"Key" : "ThisIsTheKey", "Value" : "Some random text for the value field"}	
	};			
	
	var deRow = ET_Client.DataExtensionRow(options);	
			
	deRow.post(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
	
});

restRouter.get( '/test-de-row-get', function( req, res ) {

	var options = {
		Name: "SDKDataExtension"	//required
		,props: ['Key', 'Value'] 	//required
		,filter: {						//remove filter for all.
        	leftOperand: 'Value',
        	operator: 'equals',
        	rightOperand: 'Some random text for the value field'
   		}
	};	
	var deRow = ET_Client.DataExtensionRow(options)
	
	deRow.get(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});		
	
});

restRouter.get( '/test-de-row-patch', function( req, res ) {

	var options = {
		Name: "SDKDataExtension"
		,props: {"Key" : "ThisIsTheKey", "Value" : "NewValue"}	
	};	
	var deRow = ET_Client.DataExtensionRow(options)
	
	deRow.patch(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});

restRouter.get( '/test-de-row-delete', function( req, res ) {

	var options = {
		Name: "SDKDataExtension"
		,props: {"Key" : "ThisIsTheKey"}	
	};	
	var deRow = ET_Client.DataExtensionRow(options)
	
	deRow.delete(function(response) {
		var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
		var result = response && response.body ? response.body : response;
		response && res.status(statusCode).send( result );
	});
});



// exporting the router
module.exports = restRouter;