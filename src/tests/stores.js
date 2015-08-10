import { Dispatcher } from 'flux';
import * as ActionCreators from '../actions';
import * as StoresClasses from '../stores';
import assert from 'assert';

// bootstrapping
console.log( "create dispatcher" );
const dispatcher = new Dispatcher( );

const Stores = { };

for( var i in ActionCreators ) {
	// inject dispatcher into every action creators as first param
	console.log( "create actions " + i );
	for( var j in ActionCreators[ i ] )
		ActionCreators[ i ][ j ] = ActionCreators[ i ][ j ].bind( null, dispatcher );
}

// loop stores and add to stores obj
for( var i in StoresClasses ) {
	console.log( "create store " + i );
	Stores[ i ] = new StoresClasses[ i ]( dispatcher );
}

// test products store
describe( 'ProductsStore', function( ) {

	it( 'should download products data', function( done ) {
		Stores.ProductsStore.addChangeListener( function changeListener( ) {
			if( Stores.ProductsStore.isLoading ) {
				assert.equal( Stores.ProductsStore.isLoading, true );
			} else {
				assert.notEqual( Stores.ProductsStore.collection, null );
				assert.deepEqual( Stores.ProductsStore.isLoading, false );
				assert.equal( ( typeof Stores.ProductsStore.collection == "object" && typeof Stores.ProductsStore.collection.length != "undefined" ), true );
				Stores.ProductsStore.removeChangeListener( changeListener );
				done( );
			}
		} );

		ActionCreators.ProductsActionCreators.DownloadProducts( );
	} );

} );

// test cart store
describe( 'CartStore', function( ) {

	it( 'should select one product', function( done ) {
		Stores.CartStore.addChangeListener( function changeListener( ) {
			assert.equal( typeof Stores.CartStore.selectedProduct == "object", true );
			assert.deepEqual( Stores.CartStore.deliveries, 1 );
			assert.deepEqual( Stores.CartStore.total, 10.50 );
			Stores.CartStore.removeChangeListener( changeListener );
			done( );
		} );

		ActionCreators.CartActionCreators.SelectProduct( {
			name: 'Example',
			price: 10.50
		} );
	} );

	it( 'should update deliveries', function( done ) {
		Stores.CartStore.addChangeListener( function changeListener( ) {
			assert.deepEqual( Stores.CartStore.deliveries, 5 );
			assert.deepEqual( Stores.CartStore.total, 52.5 );
			Stores.CartStore.removeChangeListener( changeListener );
			done( );
		} );

		ActionCreators.CartActionCreators.UpdateDeliveries( 5 );
	} );

	it( 'should select another product and reset total and deliveries', function( done ) {
		Stores.CartStore.addChangeListener( function changeListener( ) {
			assert.equal( typeof Stores.CartStore.selectedProduct == "object", true );
			assert.deepEqual( Stores.CartStore.deliveries, 1 );
			assert.deepEqual( Stores.CartStore.total, 12.50 );
			Stores.CartStore.removeChangeListener( changeListener );
			done( );
		} );

		ActionCreators.CartActionCreators.SelectProduct( {
			name: 'Example 2',
			price: 12.50
		} );
	} );

} );

