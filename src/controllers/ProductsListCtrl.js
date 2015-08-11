export default class ProductsListCtrl {

	constructor(
		ProductsStore
,		CartStore
,		ProductsActionCreators
,		CartActionCreators
,		$rootScope
,		$scope
,		Dispatcher
	) {
		// set vars
		this.Dispatcher = Dispatcher;
		this.$root = $rootScope;
		this.$scope = $scope;
		this.ProductsStore = ProductsStore;
		this.CartStore = CartStore;
		this.ProductsActionCreators = ProductsActionCreators;
		this.CartActionCreators = CartActionCreators;

		// set scope data
		this.$scope.isLoading = false;
		this.$scope.products = [ ];
		this.$scope.selectedProduct = false;

		// set handlers
		this.$scope.selectProduct = ::this.selectProduct;


		// overwrite to apply binding
		// if we call twice bind in add and remove
		// we can't be able to remove the listener, because it's a new one
		this.productsChangeListener = ::this.productsChangeListener;
		this.cartChangeListener = ::this.cartChangeListener;
		
		// add listeners to stores
		ProductsStore.addChangeListener( this.productsChangeListener );
		CartStore.addChangeListener( this.cartChangeListener );

		// listen destroy and remove listerner to stores
		$scope.$on( "$destroy", function( ) {
			ProductsStore.removeChangeListener( this.productsChangeListener );
			CartStore.removeChangeListener( this.cartChangeListener );
		} );
	}

	cartChangeListener ( ) {
		if( this.CartStore.selectedProduct ) {
			this.$scope.selectedProduct = this.CartStore.selectedProduct.toJS( );
		} else {
			this.$scope.selectedProduct = false;
		}
		
		// use safe apply here
		// this code gives an '$apply is already in progress' error
		// we have to call apply because changes could not be triggered only by an angular call such as UI event,
		// they could be triggered by an action
		// https://coderwall.com/p/ngisma/safe-apply-in-angular-js
		var phase = this.$root.$$phase;
		if( phase != '$apply' && phase != '$digest' )
			this.$scope.$apply( );
	}

	productsChangeListener ( ) {
		if( this.ProductsStore.isLoading ) {
			this.$scope.isLoading = true;
		} else {
			this.$scope.isLoading = false;
			this.$scope.products = this.ProductsStore.collection.toJS( );
		}
		
		// use safe apply here
		// this code gives an '$apply is already in progress' error
		// we have to call apply because changes could not be triggered only by an angular call such as UI event,
		// they could be triggered by an action
		// https://coderwall.com/p/ngisma/safe-apply-in-angular-js
		var phase = this.$root.$$phase;
		if( phase != '$apply' && phase != '$digest' )
			this.$scope.$apply( );
	}

	selectProduct ( product ) {
		// call action
		this.CartActionCreators.SelectProduct( product );
	}

}