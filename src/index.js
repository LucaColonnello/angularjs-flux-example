import { Dispatcher } from 'flux';
import angular from './vendor/angular';
import * as Controllers from './controllers';
import * as ActionCreators from './actions';
import * as Stores from './stores';


const app =
	angular.module('app', [ ])
	.service('Dispatcher', Dispatcher )
;

// loop controllers and add to app module
for( var i in Controllers ) {
	app.controller( i, Controllers[ i ] );
}

// loop actions and add to app module
for( var i in ActionCreators ) {
	let index = i;
	app.factory( index, function( Dispatcher ) {
		// inject dispatcher into every action creators as first param
		var actionCreatorsObject = { };
		for( var j in ActionCreators[ index ] )
			actionCreatorsObject[ j ] = ActionCreators[ index ][ j ].bind( null, Dispatcher );

		return actionCreatorsObject;
	} );
}

// loop stores and add to app module
for( var i in Stores ) {
	let index = i;
	app.factory( i, function( Dispatcher ) {
		return new Stores[ index ]( Dispatcher );
	} );
}

export default app;