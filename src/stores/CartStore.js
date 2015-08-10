import { EventEmitter } from 'events';
import CartConstants from '../constants/CartConstants';
import Immutable from 'immutable';

const CHANGE_EVENT = 'change';


export default class CartStore extends EventEmitter {

	constructor( Dispatcher ) {
		// call super class
		super( );

		// register dispatch token
		this.dispatchToken = Dispatcher.register( this.listenToDispatcher.bind( this ) );

		// data
		this.selectedProduct = false;
		this.total = 0;
		this.deliveries = 0;
	}

	calcTotal( ) {
		this.total = parseFloat( this.selectedProduct.get( 'price' ) ) * this.deliveries;
	}

	listenToDispatcher( action ) {
		switch(action.type) {
			case CartConstants.SELECT_PRODUCT:
				this.selectedProduct = Immutable.fromJS( action.data );
				this.deliveries = 1;
				this.calcTotal( );
			break;

			case CartConstants.UPDATE_DELIVERIES:
				this.deliveries = parseInt( action.data );
				this.calcTotal( );
			break;
		}

		this.emitChange( );
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