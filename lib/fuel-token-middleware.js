"use strict";

var jwtSimple = require( 'jwt-simple' );
var request   = require( 'request' );
var express   = require( 'express' );
var session   = require('express-session');
var bodyParser = require('body-parser');
//var config    = require( 'config' );

var save = session.Session.prototype.save;

/* override the Session implementation used by express
 * the override prevents writing an expired fuel over a new
 * fuel during save.
 */
session.Session.prototype.save = function( fn ) {
	var session = this;

	if ( session.fuel && isSessionExpired( session ) ) {
		console.log( 'fuelMiddleware: did not store session because it contains an expired fuelMiddleware object', session );
		// skip saving the session and call the callback directly
		if ( fn ) {
			fn();
		}
	} else {
		save.call( session, fn );
	}
};

var isSessionExpired = function( session ) {
	var expires = 0;

	// If we don't have a session, none of the following will work
	if ( session && session.fuel && session.fuel.expires ) {
		expires = session.fuel.expires;
	}

	return Boolean( Date.now() >= expires );
};

var fuelMiddleware = function( stackConfigs, options ) {

	options = options || {};
	options.tokenReloadAttempts = options.tokenReloadAttempts || 5;
	options.tokenReloadWait = options.tokenReloadWait || 1000;
	options.refreshBuffer = options.refreshBuffer || 1000;

	var requestNum = 0;
	var formParser = bodyParser.urlencoded({ extended: true });

	/* reload the session from the session store to look for an updated session
	 * poll for updates based on the tokenReloadAttempts and tokenReloadWait
	 * options
	 */
	var getNewTokenFromSession = function( req, next, attempt ) {
		attempt = attempt || 0;

		req.sessionStore.get( req.sessionID, function( error, savedSession ) {
			if (
				savedSession
				&& savedSession.fuel
				&& savedSession.fuel.expires > req.session.fuel.expires
			) {
				// if the saved fuel is newer than the current fuel
				// update the current fuel and continue
				req.session.fuel = savedSession.fuel;
				return next();
			} else if ( attempt > options.tokenReloadAttempts ) {
				console.log( req.requestNum, 'fuel: refresh reload hit max attempts, token could not be refreshed' );
				return next();
			}

			setTimeout( this.getNewTokenFromSession.bind( this, req, next, attempt+1 ), options.tokenReloadWait );
		}.bind( this ) );
	};
 
	/* refresh the fuel session
	 */ 
	var refresh = function( req, res, next ) {
		var config = stackConfigs[ req.session.fuel.stackKey ];

		request({
			url: config.authUrl
			, method: 'POST'
			, json: true
			, body: {
				clientId: config.clientId
				, clientSecret: config.clientSecret
				, refreshToken: req.session.fuel.refreshToken
				, accessType: 'offline'
			}
		}, function( error, response, body ) {
			if ( error ) {
				res.status( 400 ).send( error );
			} else if ( body.refreshToken ) {
				//console.log( req.requestNum, 'fuelMiddleware: refresh successful', JSON.stringify( body ) );
				req.session.fuel.token = body.accessToken;
				req.session.fuel.legacyToken = body.legacyToken;
				req.session.fuel.refreshToken = body.refreshToken;
				req.session.fuel.expires = Date.now() + body.expiresIn * 1000 - options.refreshBuffer;
				req.fuelConfig = config;
				req.session.save(function() {
					next();
				});
			} else {
				getNewTokenFromSession( req, next );
			}
		}.bind( this ) );
	};
 
	/* Initialize the session from a JWT provided by the platform SSO flow
	 */ 
	var initFromJWT = function( req, res, next ) {
		var jwt = null;

		// Find the stackConfig which can decode the JWT 
		for ( var stack in stackConfigs ) {
			try {
				jwt = jwtSimple.decode( req.body.jwt, stackConfigs[ stack ].appSignature );
				console.log('jwt',jwt);
				break;
			} catch (e) {
				jwt = null;
			}
		}
		
		//console.log( JSON.stringify( jwt ) );

		if ( jwt === null ) {
			throw {
				name: 'fuelMiddleware Error'
				, message: 'Unable to determine stack from jwt'
				, toString: function() { return this.name + ': ' + this.message; }
			};
		}
		
		//console.log( 'init from jwt', JSON.stringify( jwt ) );

		req.session.fuel = req.session.fuel || {};
		req.session.fuel.user = jwt.request.user;
		req.session.fuel.token = jwt.request.user.oauthToken;
		req.session.fuel.legacyToken = jwt.request.user.internalOauthToken;
		req.session.fuel.refreshToken = jwt.request.user.refreshToken;
		req.session.fuel.culture = jwt.request.user.culture;
		req.session.fuel.stackKey = jwt.request.organization.stackKey;
		req.session.fuel.expires = Date.now() + jwt.request.user.expiresIn * 1000 - options.refreshBuffer;
		req.fuelConfig = stackConfigs[ req.session.fuel.stackKey ];
		console.log('fuel',req.session.fuel);
		next();
	};

	var initFromCAS = function( req, res, next ) {
		var cas = req.session.cas;
		var stackKey = null;

		for ( var stack in stackConfigs ) {
			if ( stackConfigs[ stack ].baseUrl === cas.BaseUrl ) {
				stackKey = stack;
				break;
			}
		}

		if ( stackKey === null ) {
			throw {
				name: 'fuelMiddleware Error'
				, message: 'Unable to determine stack from CAS'
				, toString: function() { return this.name + ': ' + this.message; }
			};
		}

		var config = stackConfigs[ stackKey ];

		request({
			url: config.authUrl,
			method: 'POST',
			json: true,
			body: {
				clientId: config.clientId,
				clientSecret: config.clientSecret,
				scope: 'cas:' + cas.Token,
				accessType: 'offline'
			}
		}, function( error, response, body ) {
			if ( error ) {
				res.status( 400 ).send( error );
			} else if ( body.accessToken && body.legacyToken && body.refreshToken ) {
				req.session.fuel = req.session.fuel || {};
				req.session.fuel.token = body.accessToken;
				req.session.fuel.legacyToken = body.legacyToken;
				req.session.fuel.refreshToken = body.refreshToken;
				req.session.fuel.stackKey = stackKey;
				req.session.fuel.expires = Date.now() + body.expiresIn * 1000 - options.refreshBuffer;
				req.fuelConfig = config;

				req.session.save(function() {
					next();
				});
			} else {
				res.status( 401 ).send( 'Invalid CAS Session' );
			}
		});
	};


	/* The actual middleware which initializes or refreshes the fuel session
	 * if necessary. If a session cannot be established a 401 response is sent.
	 */
	return function( req, res, next ) {
		console.log('fuelMiddleware main fn - body', req.body);
		
		var session = req.session;

		// increment the request number
		req.requestNum = ++requestNum;

		if ( session === undefined ) {
			throw {
				name: 'fuelMiddleware Error'
				, message: 'An express session must be in place before using the fuelMiddleware tokenManagerMiddleware. Do not store sessions in cookies. You have been warned!'
				, toString: function() { return this.name + ': ' + this.message; }
			};
		}

		// allow anonymous access for test harness
		if(req.url === '/harness') {
			next();
			return;
		}

		// use the form parser middleware incase the body
		// isn't parsed. This has no impact if the body is parsed
		// upstream from this middlware.
		console.log('req',req);
		formParser( req, res, function() {
			if ( req.body && req.body.jwt ) {
				console.log( req.requestNum, 'fuelMiddleware: initialize session from jwt' );
				initFromJWT( req, res, next );
			} else if ( session.fuel && isSessionExpired( session ) ) {
				console.log( req.requestNum, 'fuelMiddleware: refreshing session' );
				refresh( req, res, next );
			} else if ( session.fuel ) {
				req.fuelConfig = stackConfigs[ session.fuel.stackKey ];
				next();
			} else if ( session.cas ) {
				console.log( req.requestNum, 'fuelMiddleware: initialize session from cas' );
				initFromCAS( req, res, next );
			} else {
				res.status( 401 ).send( 'Unauthorized' );
			}
		});
	};
};


module.exports = fuelMiddleware;
