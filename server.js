'use strict';

// node core modules
var fs    = require( 'graceful-fs' ); // fs is core, but graceful isn't
var http  = require( 'http' );
var https = require( 'https' );

// express specific
var express        = require( 'express' );
var methodOverride = require( 'method-override' );
var bodyParser     = require( 'body-parser' );
var compression    = require( 'compression' );
var errorHandler   = require( 'errorhandler' );
var session        = require( 'express-session' );

// my files
var config         = require( 'config' );
var lessCompiler   = require( 'express-less-middleware' );
var pkg            = require( './package.json' );
var routes         = require( './routes/main' );

// app setup
var app = express();

// express handlebars setup
var expressHandlebars = require( 'express3-handlebars' ); // will work with express 4, don't worry
var hbsConfig         = require( './lib/hbs-config' );
var hbs               = expressHandlebars.create( hbsConfig );

// fuel token management configured from config file
// more robust option for HX apps needing to hit any of the available stacks.
//var fuelTokenMiddleware = require( './lib/fuel-token-middleware' )( config.fuelConfigs );

// session config
var sessionConfig = {
	name: 'testingApp-test' // formerly key
	, secret: 'someSecretForTestingmyApp4$'
	, store: new session.MemoryStore()
	, cookie: {}
	, saveUninitialized: false
	, resave: false
};

app.use( compression() );

app.engine( '.html', hbs.engine );
app.set( 'view engine', '.html' );

// setting port
app.set( 'port',  process.env.PORT || ( config.sslOptions && config.sslOptions.port ) || config.port );

// removing powered-by header making it harder for people to see what we're using
app.disable( 'X-Powered-By' );

// setting the powered by header
app.use( function ( req, res, next ) {
	res.setHeader( "X-Powered-By", "ExactTarget" );
	next();
});

// setting up dev specific things
if( process.env.NODE_ENV === 'dev' ) {

	// using less compiler
	app.use( lessCompiler() );

	// error handling dump, only in dev
	app.use( errorHandler( { dumpException: true, showStack: true } ) );
}

if( process.env.NODE_ENV === 'production' ) {
	// enabling secure cookies
	app.set( 'trust proxy', 1 ); // trust first proxy (stackato)
	sessionConfig.cookie.secure = true; // serve secure cookies

	// when using redis with connect-redis, resave will need to be set to true if using ttl (which you probably are)
	// setting up redis for store can be seen here --> https://github.exacttarget.com/MarketingCloudDev/marketing-cloud/blob/master/server.js#L50
}

// Webfonts need mime types, too!
express.static.mime.define( { 'application/x-font-woff': [ 'woff' ] } );
express.static.mime.define( { 'application/x-font-ttf': [ 'ttf' ] } );
express.static.mime.define( { 'application/vnd.ms-fontobject': [ 'eot' ] } );
express.static.mime.define( { 'font/opentype': [ 'otf' ] } );
express.static.mime.define( { 'image/svg+xml': [ 'svg' ] } );

// setting up static endpoints for serving bower and front-end files
app.use( config.ui.bowerBase, express.static( __dirname + config.ui.bowerBase ) ); // bower_components
app.use( express.static( __dirname + config.ui.publicDir ) ); // everything else

// using the session
app.use( session( sessionConfig ) );

// allowing express to behave like a RESTful app
app.use( methodOverride() );

// allowing use of body parser for json and url encoded routes
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

//app.use( fuelTokenMiddleware );

// setting up routes
app.use( '/', routes.index );
app.use( '/', routes.rest );
app.use( '/', routes.soap );
app.use( '/', routes.de );

function start() {
	// creating server on SSL port based on config options (should only be in dev.js)
	if ( Boolean( config.sslOptions ) ) {
		https.createServer({
			key: fs.readFileSync( config.sslOptions.key_file ),
			cert: fs.readFileSync( config.sslOptions.cert_file )
		}, app ).listen( app.get( 'port' ) );

	} else {
		// otherwise starting the server up without SSL
		http.createServer( app ).listen( app.get( 'port' ) );
	}

	console.log('Express server for ' + pkg.name + ' started on port %d in %s mode', app.get('port'), process.env.NODE_ENV || 'local' );
}


exports.start = start;
exports.app   = app;
