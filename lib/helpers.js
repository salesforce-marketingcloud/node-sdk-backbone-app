var util = require('util');
var ET_Client = require( '../lib/IET_Client' );

var Helpers = {
	
	sendCodeOrData: function (func, req, res) {
		if (ET_Client) {
			func( req, res );
		} else {
			res.status(200).send( func.toString() );
		}
	}	
	
};

module.exports = Helpers;	