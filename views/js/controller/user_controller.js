'use strict';

angular.module('myApp').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {

	$scope.mis_tweets = [];

	$scope.busqueda1;
	$scope.busqueda2;
	$scope.cuantos;
	$scope.lenguajebuscado;
	
	fetchAllUsers();

	function fetchAllUsers(){
		console.log("Cargando fetchAllUsers...");

		UserService.fetchAll().then(
			function(mi_objeto_devuelto) {
				$scope.mis_tweets = mi_objeto_devuelto;
				console.log("mis_tweets:", $scope.mis_tweets);
				console.log($scope.mis_tweets);
			},
			function(errResponse){
				console.error('Error while fetching Users');
			}
		);
	}

	$scope.submit = function() {

		$scope.mis_tweets = [];

		
		UserService.fetchAllParams(
			$scope.busqueda1,
			$scope.busqueda2,
			$scope.cuantos,
			$scope.lenguajebuscado
		).then(
			function(mi_objeto_devuelto) {
				$scope.mis_tweets = mi_objeto_devuelto;
				console.log("mis_tweets:", $scope.mis_tweets);
				console.log($scope.mis_tweets);
			},
			function(errResponse){
				console.error('Error while fetching Users');
			}
		);

				
		reset();
	}


	/** Resetea mi myform en mi vista
	*/
	function reset(){
		console.log('user_controller, 	function reset()... ');

		$scope.busqueda1 = $scope.busqueda2 = $scope.cuantos = $scope.lenguajebuscado = "";
	}

}]);

