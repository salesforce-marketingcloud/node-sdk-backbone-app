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
        	'click #bTestRest': 'onBtnTestRestClick'
        	,'click #bTestSoap': 'onBtnTestSoapClick'
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

            // Show the element for this view
            this.$el.show();

            // Communicate the show
            this.trigger('show');

            return this;
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
        onBtnTestRestClick: function() {
        	$('#dataResults').val('');
        	this.testGet('test-rest');
        },
        onBtnTestSoapClick: function() {
        	$('#dataResults').val('');
        	this.testGet('test-soap');
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
        	var objName = $('#objectTypeGroup input:radio:checked').val();        	
        	if (objName === 'triggeredsend') {
        		this.enableOperation('send',true);
        	} else if (objName === 'sms') {        		
        		this.enableOperation('post',false);
        		this.enableOperation('get',false);
        		this.enableOperation('patch',false);
        		this.enableOperation('delete',false);
        		this.enableOperation('send',true);
        	} else {
        		this.enableOperation('post',true);
        		this.enableOperation('get',true);
        		this.enableOperation('patch',true);
        		this.enableOperation('delete',true);        	
        		this.enableOperation('send',false);
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

