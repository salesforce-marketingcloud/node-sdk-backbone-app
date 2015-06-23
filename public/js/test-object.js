define(function() {
	'use strict';

	return function() {

		function add( a1, a2 ) {
			if( !!a1 && !!a2 ) {
				return a1 + a2;
			} else {
				return false;
			}
		}

		function subtract( a1, a2 ) {
			if( !!a1 && !!a2 ) {
				return a1 - a2;
			} else {
				return false;
			}
		}

		return {
			add: add,
			subtract: subtract
		};
	};
});