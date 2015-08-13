var ET_Client = require( 'fuelsdk-node' );
var config = require( 'config' );



/************************************************************
//  
// The default mode of this app returns code examples to the UI
// if no credentials are supplied.
//
// If you run this app with credentials, do not deploy it to a public
// URL unless the app is password protected.
//
************************************************************/
var clientId = process.env.CID ? process.env.CID : config.auth.clientId; 
var clientSecret = process.env.CSEC ? process.env.CSEC : config.auth.clientSecret;
var stack = process.env.STK ? process.env.STK : config.auth.stack;

if (clientId) {
	var IET_Client = new ET_Client(clientId,clientSecret,stack);
	//load up the first token.
	IET_Client.FuelAuthClient.getAccessToken(IET_Client.FuelAuthClient); //second param here can be a callback. or you change this to use promises like fuel-rest.
}
module.exports = IET_Client;