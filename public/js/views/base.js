define(function(require) {

	'use strict';

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	return Backbone.View.extend({
		hasRendered: false,
		template: undefined,
		initialize: function () {
			this.bindAllMethodsToThisClass();

			this.collections = {};
			this.models = {};
			this.views = {};
			this.dataSources = {};
			this.templates = {};

			this.helpers = window.App.helpers;
		},
		render: function (trigger) {
			trigger = _.isUndefined(trigger) ? true : !!trigger;
			this.hasRendered = true;

			this.empty();
			this.$el.html(this.templates.primary());

			if (trigger) {
				this.trigger('render');
			}

			return this;
		},
		hide: function (trigger) {
			trigger = _.isUndefined(trigger) ? true : !!trigger;
			this.$el.hide();

			if (trigger) {
				this.trigger('hide');
			}

			return this;
		},
		show: function (trigger) {
			trigger = _.isUndefined(trigger) ? true : !!trigger;

			if (this.hasRendered === false) {
				this.render();
			}

			this.$el.show();

			if (trigger) {
				this.trigger('show');
			}

			return this;
		},
		empty: function (trigger) {
			trigger = _.isUndefined(trigger) ? true : !!trigger;
			this.$el.empty();

			if (trigger) {
				this.trigger('empty');
			}

			return this;
		},
		bindAllMethodsToThisClass: function () {
			/*jshint forin:false*/

			// get all methods on this
			var property, methods = [];
			for (property in this) {
				if (!_.isFunction(this[property])) {
					continue;
				}

				methods.push(property);
			}

			// don't continue if nothing to bind
			// shouldn't happen because there's at
			// least two methods on Backbone.View
			if (!methods.length) { return; }

			// prepend this to payload
			methods.unshift(this);

			// bind all!
			_.bindAll.apply(_, methods);
		}
	});

});
