import ProductsConstants from '../constants/ProductsConstants';
import request from 'superagent';
import jsonp from 'superagent-jsonp';

// apply jsonp to request
jsonp( request );

// BEST PRACTICE: Download code must be placed into an API like Object
// It's here only for sample purpose
export function DownloadProducts( Dispatcher ) {
	Dispatcher.dispatch({
		type: ProductsConstants.LOADING
	});

	request
		.get('http://www.mocky.io/v2/55c8c2ae66d16f900ef63bca')
		.jsonp( )
		.end( function downloadProductsCallback( err, res ) {
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
		} )
	;
};