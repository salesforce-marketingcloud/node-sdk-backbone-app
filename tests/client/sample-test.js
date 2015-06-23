define( function( require ) {

	"use strict";
	var addSubObj = require( 'js/test-object' )();

	describe('just checking for stuff', function() {
		it( 'passes addition', function() {
			expect( addSubObj.add( 1, 2 ) ).to.equal( 3 );
		});

		it( 'fails addition if two args are not present', function() {
			expect( addSubObj.add( 1 ) ).to.equal( false );
		});

		it( 'passes subtraction', function() {
			expect( addSubObj.subtract( 4, 2 ) ).to.equal( 2 );
		});

		it( 'fails subtraction if two args are not present', function() {
			expect( addSubObj.subtract( 1 ) ).to.equal( false );
		});


	});

});