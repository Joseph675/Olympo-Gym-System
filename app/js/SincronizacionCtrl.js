angular.module('todo')

.controller('SincronizacionCtrl', function($scope, ConexionServ, $http, DescargarTodoServ, $q){

	console.log($scope);
	$scope.datos_eliminados 	= false;
	$scope.cambios_sin_subir 	= 0;


	$scope.mostrarusuarios = function(result){
		consulta = "SELECT *, rowid FROM usuarios WHERE id is NULL or eliminado=1 or modificado=1"
		ConexionServ.query(consulta, []).then(function(result){
			console.log('usuario mostrado')
			console.log(result)
			$scope.usuarios = result;
			$scope.cambios_sin_subir 	= result.length;

			consulta = "SELECT *, rowid FROM asistencias WHERE id is NULL or eliminado=1 or modificado=1"
			ConexionServ.query(consulta, []).then(function(result){
				$scope.asistencias = result;
				$scope.cambios_sin_subir 	+= result.length;
	
				
			}, function(tx){
				console.log('usuarios no mostrado', tx)
			});

		}, function(tx){
			console.log('usuarios no mostrado', tx)
		});
	}

	$scope.mostrarusuarios();

	
	$scope.eliminar_tablas_promise = function () {
		var defered = $q.defer();

		promesas = [];
			
		prom = ConexionServ.query('DROP TABLE usuarios').then(function(result){
			console.log('Eliminado usuarios');
		});
		promesas.push(prom);
		prom = ConexionServ.query('DROP TABLE asistencias').then(function(result){
			console.log('Eliminado asistencias');
		});
		promesas.push(prom);
		
		Promise.all(promesas).then(function(result){
			$scope.datos_eliminados = true;
			toastr.success('Tablas borradas.');
			defered.resolve('Eliminadas');
		})

		return defered.promise;
	}
	
	


	$scope.descargar_datos = function(elemento){
		console.log('sdfrgvsd');
		
		if (!$scope.datos_eliminados && $scope.cambios_sin_subir > 0) {
			console.log('ey');
			toastr.info('Primero debes eliminar los datos locales');
			return;
		}
		function descargar() {
			console.log("auqi");
			$scope.estado_descarga = 'Descargando';
			rutaServidor = "http://192.168.100.31/feryz_server/public/taxis/";
			
			$http.get(rutaServidor + 'all', {params: {username: 'admin', password: 'memo'} }).then (function(result){
				$scope.estado_descarga = 'insertando';
				console.log("auqi2")
				
				$scope.valor_insertado 	= function(){
					return DescargarTodoServ._valor_insertado;
				};
				$scope.valor_maximo 	= function(){
					return DescargarTodoServ._valor_maximo;
				};
				
				ConexionServ.createTables().then(function(){
					toastr.info('Datos descargados.', 'Tablas creadas.');
					console.log("descargados")
					DescargarTodoServ.insertar_datos_descargados(result.data).then(function(result){
						$scope.estado_descarga = 'Insertados. Actualice la página.';
						console.log('Todas los datos Insertados', result);
					})
				})
				
				console.log("asdasd")
				

			}), function(){
				console.log('error db')
			}
		}

		if ($scope.cambios_sin_subir == 0) {

			$scope.eliminar_tablas_promise().then(function(){
				descargar();
			})

		}else{
			descargar();
		}

	}








})