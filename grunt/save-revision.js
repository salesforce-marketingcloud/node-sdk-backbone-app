module.exports = function( grunt ) {
	'use strict';

	grunt.registerTask( 'saveRevision', function() {

		grunt.event.once( 'git-describe', function( rev ) {

			grunt.log.writeln( 'Git Revision: ' + rev );
			grunt.option( 'gitRevision', rev );
			grunt.event.emit( 'saveRevision' );

		});

		grunt.task.run( 'git-describe:prod' );
	});
};
