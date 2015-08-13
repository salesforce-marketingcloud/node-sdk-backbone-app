'use strict';

var express     = require( 'express' );
var restRouter = express.Router();
var ET_Client = require( '../lib/IET_Client' );
var helpers = require( '../lib/helpers' );


function SMSSend ( req, res ) {
	var msg = {
		"mobileNumbers" : [ "15558880306" ],
		"shortCode" : "86288",
		"messageText" : "CODETEST"
	};	
	
	ET_Client.RestClient
		.post({
			uri:'/sms/v1/queueMO'
			,body: JSON.stringify(msg)
		})
		.then(function(response) {
			response && res.status(response.res.statusCode).send( response.body );
		}.bind(this))
		.catch(function(err) {
			res.status(500).send( err ); //this is only hit if the error is thrown somewhere in a promise chain. Other errors will naturally return a 500 and the error message.
		}.bind(this));
};

restRouter.get( '/test-sms-send', function( req, res ) {
	helpers.sendCodeOrData(SMSSend, req, res);
});



// exporting the router
module.exports = restRouter;