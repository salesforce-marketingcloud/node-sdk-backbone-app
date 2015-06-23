module.exports = function( grunt ) {

	'use strict';

	require('matchdep').filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// custom tasks
	require( './grunt/release' )( grunt );
	require( './grunt/save-revision' )( grunt );

	// Project configuration.
	grunt.initConfig({
		// Task configuration.
		pkg: grunt.file.readJSON( './package.json' ),
		paths: {
			node: './',
			client: './public/',
			dist: './public-optimized/'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			files: [
				'<%= paths.node %>config/**/*.js',
				'<%= paths.node %>routes/**/*.js',
				'<%= paths.node %>lib/**/*.js',
				'<%= paths.node %>index.js',
				'<%= paths.node %>server.js',
				'<%= paths.node %>karma.conf.js',
				'<%= paths.client %>js/**/*.js'
			]
		},
		karma: {
			main: {
				configFile: '<%= paths.node %>karma.conf.js',
				browsers: ['PhantomJS','Chrome'],
				singleRun: true
			}
		},
		complexity: {
			client: {
				src: [
					'<%= paths.client %>js/**/*.js',
					'!<%= paths.client %>js/main.js', // EXCLUDED: JSON AMD module
					'!<%= paths.client %>js/lib/*.js' // EXCLUDED
				],
				options: {
					// Recommendations taken from http://jscomplexity.org/complexity
					// Defaults taken from https://github.com/vigetlabs/grunt-complexity/blob/master/tasks/complexity.js
					errorsOnly: false, // show pretty file list
					cyclomatic: 10, // Represents the number of logical paths through the source code, is a maximum threshold, recommendation 10, default 3, bounds [1,INF)
					halstead: 20, // Represents balance of unique operators and operands, is a maximum threshold, no recommendation, default 8, bounds [0,INF)
					maintainability: 100 // Represents combination of above with lines of functional code, is a minimum threshold, recommendation 65, default 100, bounds (-INF,171]
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					appDir: '<%= paths.client %>',
					mainConfigFile: "<%= paths.client %>/js/main.js",
					optimize: 'uglify2',
					optimizeCss: 'none',
					dir: '<%= paths.dist %>',
					preserveLicenseComments: false,
					generateSourceMaps: false,
					modules: [
						{
							name: 'js/main',
							exclude: [
								'backbone',
								'underscore',
								'jquery',
								'json2'
							]
						}
					]
				}
			}
		},
		less: {
			dist: {
				files: {
					'<%= paths.dist %>css/styles.css': [ '<%= paths.client %>css/styles.less' ],
					'<%= paths.dist %>css/errors.css': [ '<%= paths.client %>css/errors.less' ]
				},
				options: {
					compress: true
				}
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,						// Enable dynamic expansion
					cwd: '<%= paths.dist %>img',		// Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],			// Actual patterns to match
					dest: '<%= paths.dist %>img'		// Destination path prefix
				}]
			}
		},
		clean: {
			dist: {
				src: [ "<%= paths.dist %>" ]
			},
			distLess: {
				src: [ "<%= paths.dist %>css/**/*.less" ]
			}
		},
		replace: {
			stackato: {
				src: ['stackato-template.yml'],
				dest: ['stackato.yml'],
				replacements: [
					{ from: /%%PACKAGE_VERSION%%/g, to: '<%= pkg.version.replace(/[.]/g, "-") %>' }
				]
			}
		},
		"git-describe": {
			"options": {
			},
			"prod": {
			}
		},
		bump: {
			options: {
				bumpVersion: true,
				files: ['package.json', 'bower.json'],
				updateConfigs: ['pkg'],
				commit: true,
				commitMessage: 'Release <%= pkg.version.replace(/[.]/g, "-") %>',
				commitFiles: ['package.json', 'stackato.yml', 'bower.json'], // '-a' for all files
				createTag: true,
				tagName: '<%= pkg.version.replace(/[.]/g, "-") %>',
				tagMessage: 'Version <%= pkg.version.replace(/[.]/g, "-") %>',
				push: true,
				pushTo: 'upstream',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
			}
		}
	});

	// Default task.
	grunt.registerTask( 'default', [ 'tests', 'optimizeJS', 'optimizeCSS', 'imagemin:dist'] );
	grunt.registerTask( 'tests', [  'karma', 'complexity:client' ] );//'jshint'
	grunt.registerTask( 'optimizeJS', [ 'clean:dist', 'requirejs' ] );
	grunt.registerTask( 'optimizeCSS' , [ 'less:dist', 'clean:distLess' ] );
};