import { EventEmitter } from 'events';
import ProductsConstants from '../constants/ProductsConstants';
import Immutable from 'immutable';

const CHANGE_EVENT = 'change';


export default class ProductsStore extends EventEmitter {

	constructor( Dispatcher ) {
		// call super class
		super( );

		// register dispatch token
		this.dispatchToken = Dispatcher.register( this.listenToDispatcher.bind( this ) );

		// data
		this.downloadError = false;
		this.dataParsingError = false;
		this.isLoading = false;
		this.collection = null;
	}

	listenToDispatcher( action ) {
		switch(action.type) {
			case ProductsConstants.LOADING:
				this.isLoading = true;
				this.downloadError = false;
				this.dataParsingError = false;

				this.emitChange( );
			break;

			case ProductsConstants.SET_DATA:
				this.isLoading = false;
				this.downloadError = false;
				this.dataParsingError = false;
				this.collection = Immutable.fromJS( action.data );

				this.emitChange( );
			break;

			case ProductsConstants.DOWNLOAD_ERR:
				this.isLoading = false;
				this.collection = null;
				this.downloadError = true;
				this.dataParsingError = false;

				this.emitChange( );
			break;

			case ProductsConstants.DATA_PARSING_ERR:
				this.isLoading = false;
				this.collection = null;
				this.dataParsingError = true;
				this.downloadError = false;

				this.emitChange( );
			break;
    	}
	}

	emitChange( ) {
		this.emit( CHANGE_EVENT );
	}

	addChangeListener ( callback ) {
		this.on( CHANGE_EVENT, callback );
	}

	removeChangeListener ( callback ) {
		this.removeListener( CHANGE_EVENT, callback );
	}

}