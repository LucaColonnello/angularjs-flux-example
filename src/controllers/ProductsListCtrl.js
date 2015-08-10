export default class ProductsListCtrl {

	constructor(
		ProductsStore
,		CartStore
,		ProductsActionCreators
,		CartActionCreators
,		$scope
,		Dispatcher
	) {
		// set vars
		this.Dispatcher = Dispatcher;
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

		this.$scope.$apply( );
	}

	productsChangeListener ( ) {
		if( this.ProductsStore.isLoading ) {
			this.$scope.isLoading = true;
		} else {
			this.$scope.isLoading = false;
			this.$scope.products = this.ProductsStore.collection.toJS( );
		}

		this.$scope.$apply( );
	}

	selectProduct ( product ) {
		console.log( "selected", product );

		// mock
		this.$scope.selectedProduct = product;
	}

}