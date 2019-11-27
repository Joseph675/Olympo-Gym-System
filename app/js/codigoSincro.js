
	

    $scope.subir_datos = function (elemento){
    	
    	datos = {};

    	if (elemento) {
				datos = elemento;
    	}else{
    		datos = {
    			usuarios: 				$scope.usuarios,
    			recomendaciones: 		$scope.recomendaciones
    		};
    	}

			$http.put("http://192.168.100.31/feryz_server/public/taxis/all", datos).then (function(r){

				r = r.data;
				SincronizarServ.usuarios(r.usuarios);
				SincronizarServ.recomendaciones(r.recomendaciones);

				toastr.success('Datos subidos');
			}, function(){
				toastr.error('No se pudo subir datos');
			})
		}

	

    $scope.eliminar_datos_locales = function (elemento){
		
		res = confirm('¿Seguro que desea eliminar los datos locales? (no afecta la nube)');
		
		if(res){
			$scope.datos_eliminados = false;
			$scope.eliminar_tablas_promise();
		}
		
	}

	$scope.eliminar_tablas_promise = function () {
		var defered = $q.defer();

		promesas = [];
			
		prom = ConexionServ.query('DROP TABLE usuarios').then(function(result){
			console.log('Eliminado usuarios');
		});
		promesas.push(prom);
		prom = ConexionServ.query('DROP TABLE lib_mensuales').then(function(result){
			console.log('Eliminado lib_mensuales');
		});
		promesas.push(prom);
		
		Promise.all(promesas).then(function(result){
			$scope.datos_eliminados = true;
			toastr.success('Tablas borradas.');
			defered.resolve(usu);
		})

		return defered.promise;
	}
	
	

    $scope.descargar_datos = function (elemento){
		
		if (!$scope.datos_eliminados && $scope.cambios_sin_subir > 0) {
			toastr.info('Primero debes eliminar los datos locales');
			return;
		}

		function descargar() {
			
			$scope.estado_descarga = 'Descargando';
			
			$http.get(rutaServidor.ruta + '/all', {params: {username: $scope.USER.username, password: $scope.USER.password}}).then (function(result){
				$scope.estado_descarga = 'insertando';
				
				$scope.valor_insertado 	= function(){
					return DescargarTodoServ._valor_insertado;
				};
				$scope.valor_maximo 	= function(){
					return DescargarTodoServ._valor_maximo;
				};
				
				ConexionServ.createTables().then(function(){
					toastr.info('Datos descargados.', 'Tablas creadas.');
					
					DescargarTodoServ.insertar_datos_descargados(result.data).then(function(result){
						AuthServ.update_user_storage($scope.USER);
						$scope.estado_descarga = 'Insertados. Actualice la página.';
						console.log('Todas los datos Insertados', result);
					})
				})
				
				

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
