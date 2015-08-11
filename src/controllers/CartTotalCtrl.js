export default class CartTotalCtrl {

	constructor(
		CartStore
,		CartActionCreators
,		$rootScope
,		$scope
,		Dispatcher
	) {
		// set vars
		this.Dispatcher = Dispatcher;
		this.$root = $rootScope;
		this.$scope = $scope;
		this.CartStore = CartStore;
		this.CartActionCreators = CartActionCreators;

		// set scope data
		this.$scope.total = CartStore.total;


		// overwrite to apply binding
		// if we call twice bind in add and remove
		// we can't be able to remove the listener, because it's a new one
		this.cartChangeListener = ::this.cartChangeListener;
		
		// add listeners to stores
		CartStore.addChangeListener( this.cartChangeListener );

		// listen destroy and remove listerner to stores
		$scope.$on( "$destroy", function( ) {
			CartStore.removeChangeListener( this.cartChangeListener );
		} );
	}

	cartChangeListener ( ) {
		this.$scope.total = Math.round( this.CartStore.total * 100 ) / 100;

		// use safe apply here
		// this code gives an '$apply is already in progress' error
		// we have to call apply because changes could not be triggered only by an angular call such as UI event,
		// they could be triggered by an action
		// https://coderwall.com/p/ngisma/safe-apply-in-angular-js
		var phase = this.$root.$$phase;
		if( phase != '$apply' && phase != '$digest' )
			this.$scope.$apply( );
	}

}