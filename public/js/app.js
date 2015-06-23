define( function( require ) {
	'use strict';


	/*
	var Backbone = require( 'backbone' );

	var controller = require( 'routing/controller' ); // fake controller
	var router = require( 'routing/router' ); // fake router

	var TestView = Backbone.View.extend({
		initialize: function() {
			// putting this here because I have to use them for jshint to pass, and this is a example thing
			// they serve no other purpose
			this.controller = controller;
			this.router = router;
		},
		render: function() {
			this.$el.html( 'Hello World.' );
		}
	});

	var displayView = new TestView({ 'el': '#index-entry' });
	displayView.render();
	*/

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require( 'backbone' );

	// Router
	var Router = require('js/routing/router');

	// Global libraries
	require('fuelux');	
	
	// Instantiate the router and kick things off
	var app = new Router();
	window.App.router = app;
	Backbone.history.start({ pushState: true });	
	
});