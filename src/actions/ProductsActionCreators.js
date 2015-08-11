import ProductsConstants from '../constants/ProductsConstants';
import request from 'superagent';

var jsonp;

// apply jsonp to request if we are in browser
if( typeof window !== "undefined" ) {
	jsonp = require( 'superagent-jsonp' );
	jsonp( request );
}

// BEST PRACTICE: Download code must be placed into an API like Object
// It's here only for sample purpose
export function DownloadProducts( Dispatcher ) {
	Dispatcher.dispatch({
		type: ProductsConstants.LOADING
	});

	// create request
	var r = request.get('http://www.mocky.io/v2/55ca5d2dce3e737a14c75a7e');

	// check we have to apply jsonp
	if( typeof window !== "undefined" )
		r.jsonp( );
	
	// make the request
	r.end( function downloadProductsCallback( err, res ) {
		// check err
		if( err ) {
			console.log( "Service Download Error", err );
			Dispatcher.dispatch( {
				type: ProductsConstants.DOWNLOAD_ERR
			} );
			return;
		}

		let data;
		try {
			data = res.body;
		} catch (e) {
			console.log( "Data Parsing Error", e );
			Dispatcher.dispatch( {
				type: ProductsConstants.DATA_PARSING_ERR
			} );
			return;
		}

		Dispatcher.dispatch( {
			type: ProductsConstants.SET_DATA,
			data
		} );
	} );
};