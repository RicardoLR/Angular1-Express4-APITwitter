'use strict';


angular.module('myApp').factory('UserService', ['$http', '$q', function($http, $q){

	var REST_SERVICE_URI = 'http://localhost:8000/tweets/all';
	
	var factory = {
		fetchAll: fetchAll,
		fetchAllParams: fetchAllParams
	};

	return factory;

	function fetchAll() {

		var mi_promesa = $q.defer();
		
		$http.get(REST_SERVICE_URI).then(
			
			function (response) {
				mi_promesa.resolve(response.data.data.statuses);
			},

			function(errResponse){
				console.error('Error while fetching Users');
				mi_promesa.reject(errResponse);
			}
		);
		return mi_promesa.promise;
	}


	function fetchAllParams(busqueda1, busqueda2, cuantos, lenguajebuscado){

		var mi_promesa = $q.defer();
		
		$http.post(REST_SERVICE_URI+'/params', {
			peticion: {
				busqueda1 : busqueda1, busqueda2 : busqueda2, cuantos : cuantos, lenguajebuscado : lenguajebuscado
			}
		}).then(
			
			function (response) {
				mi_promesa.resolve(response.data.data.statuses);
			},

			function(errResponse){
				console.error('Error while fetching Users');
				mi_promesa.reject(errResponse);
			}
		);
		return mi_promesa.promise;

	}

}]);
