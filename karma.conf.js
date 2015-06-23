// Karma configuration
// Generated on Thu Dec 19 2013 15:27:19 GMT-0500 (EST)

module.exports = function(config) {
	'use strict';

	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: './',


		// frameworks to use
		// you can use whatever you want
		// we chose mocha, chai, and sinon
		frameworks: ['mocha', 'requirejs', 'chai', 'sinon'],


		// list of files / patterns to load in the browser
		files: [
			'tests/test-main.js',
			{pattern: 'public/js/**/*.js', included: false},
			{pattern: 'bower_components/**/*.js', included: false},
			{pattern: 'tests/client/*-test.js', included: false}
		],


		// list of files to exclude
		exclude: [
			// excluding main config file that app will use with requirejs. need to duplicate this requirejs.config to test/text-main.js
			'public/js/main.js'
		],


		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress', 'coverage'],

		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'public/js/**/*.js': [ 'coverage' ]
		},


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
		browsers: ['PhantomJS', 'Chrome'], // be careful with these launchers, bit9 will block a few


		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};
