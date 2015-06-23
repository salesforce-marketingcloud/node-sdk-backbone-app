var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/-test\.js$/.test(file)) {
			tests.push(file);
		}
	}
}

requirejs.config({
	// Karma serves files from '/base'
	baseUrl: '/base/public/',
	paths: {
		// APP PATHS
		js: 'js',
		routing: 'js/routing',
		// VENDOR PATHS (just to show you exactly what we have set up)
		backbone: '../bower_components/backbone/backbone',
		underscore: '../bower_components/underscore/underscore',
		jquery: '../bower_components/jquery/jquery',
		json2: '../bower_components/json2/json2'
	},
	shim: {
		'backbone': {
			deps: [ 'underscore', 'jquery', 'json2' ],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'jquery': {
			exports: '$'
		}
	},

	// ask Require.js to load these files (all our tests)
	deps: tests,

	// start test run, once Require.js is done
	callback: window.__karma__.start
});
