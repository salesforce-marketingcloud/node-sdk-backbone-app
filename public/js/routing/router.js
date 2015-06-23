define(function(require) {

	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	// Views
	var IndexView = require('views/index');

	return Backbone.Router.extend({
		routes: {
			'': 'index'
		},
		initialize: function () {
			// Set up a global object for use throughout the app
			window.App = {
				views: {},
				models: {},
				collections: {},
				helpers: {},
				custom: {}
			};

			// Create a reference to the global object's views property for easy access in this router
			this.views = window.App.views;
		},
		hideAllParentViews: function () {
			// Iterate over our views, calling hide on each
			_.each(this.views, function (view) {
				view.hide();
			}, this);
		},
		index: function() {
			// Hide any other views that might be displayed
			this.hideAllParentViews();

			// If the view wasn't already created, do so
			if (!this.views.hasOwnProperty('index')) {
				this.views.index = new IndexView({ el: $('#index-entry') });
			}

			// Then show it
			this.views.index.show();
		}
	});

});
