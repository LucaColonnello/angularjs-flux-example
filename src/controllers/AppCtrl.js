export default class AppCtrl {
	
  constructor(
  	ProductsActionCreators
,	$scope
,	Dispatcher) {
    // set vars
    this.Dispatcher = Dispatcher;
    this.$scope = $scope;

    // app bootstrap
	angular.element(document).ready( function ( ) {
    	ProductsActionCreators.DownloadProducts( );
	} );
  }

}