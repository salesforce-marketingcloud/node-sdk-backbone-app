module.exports = function( grunt ) {
	'use strict';

	grunt.registerTask('release', function( releaseType ) {
		// check if the person put a release type in the command
		if ( !releaseType ) {

			grunt.fail.fatal( 'No release type specified.' );

		} else if( releaseType === 'major' || releaseType === 'minor' || releaseType === 'patch' ) {
			// only do this if release is one of the three types above
			grunt.event.once( 'saveRevision', function() {

				// fail if the git dir is dirty
				if( grunt.option( 'gitRevision' ).dirty ) {
					grunt.fail.fatal( 'Can\'t create a release with uncommitted changes.' );
				}

				// run other tasks
				grunt.task.run( 'bump-only:' + releaseType );
				grunt.task.run( 'replace:stackato' );
				grunt.task.run( 'bump-commit' );
			});

			// run saveRevision task
			grunt.task.run( 'saveRevision' );

		} else {
			// fail if you did something wrong
			grunt.fail.fatal( 'You must provide a valid release type. Options: [major, minor, patch]' );
		}
	});
};
