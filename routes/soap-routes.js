'use strict';

var express     = require( 'express' );
var soapRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );




// setting up routes
soapRouter.get( '/test-soap', function( req, res ) {
	
	var options = {
		filter: {
			leftOperand: 'Name',
			operator: 'equals',
			rightOperand: 'test'
		}
	};

	ET_Client.SoapClient.retrieve(
		'Email',   //Object types: http://help.exacttarget.com/en/technical_library/web_service_guide/objects/
		["ID", "Name", "Subject", "CategoryID", "EmailType"],
		options,
		function( err, response ) {
			if (err) {
				res.status(500).send( err )
			} else {
				var statusCode =  response && response.res && response.res.statusCode ? response.res.statusCode : 200;
				var result = response && response.body ? response.body : response;
				response && res.status(statusCode).send( result );
			}
		}
	);	
	
	
	
	
});


// exporting the router
module.exports = soapRouter;