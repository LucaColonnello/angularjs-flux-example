import CartConstants from '../constants/CartConstants';

export function SelectProduct( Dispatcher, product ) {
	Dispatcher.dispatch({
		type: CartConstants.SELECT_PRODUCT,
		data: product
	});
};

export function UpdateDeliveries( Dispatcher, deliveries ) {
	Dispatcher.dispatch({
		type: CartConstants.UPDATE_DELIVERIES,
		data: deliveries
	});
};