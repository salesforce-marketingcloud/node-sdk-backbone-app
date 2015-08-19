define(function(require) {

    'use strict';

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');

    // Views
    var BaseView = require('views/base');

    // DataSource:


    // Collections


    // Models


    // Templates
    var mainTemplate = require('text!templates/index.html');

    return BaseView.extend({
        isReady: false,
        events: {
        	'click #bTestSoapRest': 'onBtnTestSoapRestClick'
        	,'click #bTest': 'onBtnTestClick'
        	,'click #objectTypeGroup input': 'onObjectTypeGroupClick'
        },
        initialize: function() {
        	console.log('initialize');
            BaseView.prototype.initialize.call(this);

            // Set up our tempaltes
            this.templates.primary = mainTemplate;

            this.setupCollections();
            
            this.on('error', function (msg) {
            	this.onShowError(msg);
            }, this);                        

            // When ready, render:
            this.on('ready', function () {
                this.render();
            }, this);           	
        	
        	this.trigger('ready'); //place in fetch callback                                   
        },
        render: function () {
        	console.log('render');
            this.hasRendered = true;

            this.empty();
            this.$el.html(this.templates.primary);

            this.trigger('render');

            this.createControls();

            return this;
        },
        show: function () {
        	console.log('show');
            if (this.hasRendered === false) {
                this.fetchCollections();
            }
            window.onresize = this.onResize;
			this.onResize();
            // Show the element for this view
            this.$el.show();

            // Communicate the show
            this.trigger('show');

            return this;
        },
		onResize: function(e) {
			var workAreaHeight = this.getWorkAreaHeight();
			//console.log('onResize',workAreaHeight);
			$('#resultArea').height( workAreaHeight );
		},
		getWorkAreaHeight: function() {
			var outerHeight = 0;
			$('.api').each(function() {
				outerHeight += $(this).outerHeight();
			});
			return outerHeight;
		},		
        setupCollections: function () {
                       
        },
        fetchCollections: function () {
                    
                    
        },
        createControls: function () {
          
			 
            this.bindControls();
		},
        bindControls: function() {
			console.log('bindControls');
        },         
        onShowError: function (msg) {
			$('#alertMsg').text(msg);
			$('#alertModal').fadeIn('slow');      
        },
        testGet: function(url) {
        	var self = this;
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				
			})
			.done(function(data) {
				console.log('done');
				$('#dataResults').val(JSON.stringify(data, null, '\t'));
				//$('#dataResults').val(data.responseText);
				
				//$('#dataResults').html(data);
			}).fail(function(data) {
				console.log('fail');
				//$('#dataResults').val(JSON.stringify(data, null, '\t'));
				$('#dataResults').val(data.responseText);
			});        
        },       
        onBtnTestSoapRestClick: function() {
        	$('#dataResults').val('');
        	var selection = $('#soaprestGroup input:radio:checked').val();
        	this.testGet('test-' + selection);
        },
        onBtnTestClick: function() {
        	$('#dataResults').val('');
        	var datatype = $('#dataTypeGroup input:radio:checked').val();        	
        	var objtype = $('#objectTypeGroup input:radio:checked').val();
        	if (!datatype) alert('Please select a method (ie. Create, Retrieve...)');
        	if (!objtype) alert('Please select an object.');
        	this.testGet('test-'+objtype+'-'+datatype);
        },
        onObjectTypeGroupClick: function() {
        	var $rdo = $('#objectTypeGroup input:radio:checked');
        	var access = $rdo.data('method');
        	var map = {
        		c: 'post'
        		,r: 'get'
        		,u: 'patch'
        		,d: 'delete'
        		,s: 'send'
        	};
        	for (var key in map) {
        		this.enableOperation(map[key],($.inArray(key,access) !== -1));
        	}
        },
        enableOperation: function(name,val) {
        	var $rdo = $('#dataTypeGroup :input:radio[value="'+name+'"]');
        	$rdo.attr('disabled',!val);
        	var color = !val ? '#ccc' : '#000';
        	$rdo.parent().css("color", color);
        	//$rdo.prop('checked', false);
        }
	});
});

