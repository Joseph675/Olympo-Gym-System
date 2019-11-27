angular.module('todo')

.controller('AsisusuariosCtrl', function ($scope, $state, ConexionServ,  toastr, $uibModal, $window) {
	
	  
    console.log($state.params.usu_id)

    usu_id=$state.params.usu_id;

    $scope.antiguas = 0;  
    $scope.activo = 1;


    mes = new Date().getMonth() + 1;

    if (mes < 9) {
        mes = '0' + mes;
    }else{
        mes = '' + mes;
    }



    $scope.dato = { select_year: '' + (new Date().getFullYear()), select_month: mes }

   
   

	$scope.traerAntiguas=function(){
        $scope.antiguas = 1;
        $scope.traerUsuarios();
    }


	$scope.traerNuevas=function(){
        $scope.antiguas = 0;
        $scope.traerUsuarios();
    }

    $scope.traerUsuarios=function(){

        ConexionServ.query('SELECT *,rowid FROM usuarios WHERE rowid=?', [usu_id]).then(function(usuarios){
    
            if (usuarios.length>0){
    
                $scope.usu=usuarios[0]

                cuadro = $scope.dato.select_year + '/' + $scope.dato.select_month; 
                consulta = 'SELECT *,rowid FROM asistencias WHERE usuario_id=? and eliminado = "0" and antiguo = "' + $scope.antiguas + '" and cita like "' + cuadro + '%" '
                ConexionServ.query(consulta, [$state.params.usu_id]).then(function(asistencias){

                   
                    $scope.usu.asistencias=asistencias;

                   
    
                },function(tx){
                    console.log('noo')
                })
            
            }
        })
    
        }
    
    
        $scope.traerUsuarios();


		$scope.volver = function(){
			$window.history.back();
		}


        $scope.Actualizactivo = function(usu){

			
            consulta = 'UPDATE usuarios SET activo=?  WHERE rowid=?'
            ConexionServ.query(consulta, [ usu.activo, usu.rowid]).then(function(result){
                console.log('activo actualizado ', result);
                $scope.activo = "1";
            }, function(tx){
                console.log('activo no se pudo actualizar', tx);
            });
    
    }
        
        
$scope.editarAsistencia = function (asis) {
	var modalInstance = $uibModal.open({
		templateUrl: 'templates/editarAsistenciaModal.html',
		controller: 'EditarAsistenciaCtrl',
		size: 'lg',
		resolve: {
			asis: function () {
				return asis;
			}
		}
	  });
  
	  modalInstance.result.then(function () {
		console.log('Cerrado');
	  }, function () {
		console.log('Modal dismissed at: ' + new Date());
	  });
}

$scope.editarantiguo = function (asis) {
	var modalInstance = $uibModal.open({
		templateUrl: 'templates/editarAsistencia_antiguaModal.html',
		controller: 'EditarAsistenciaCtrl',
		size: 'lg',
		resolve: {
			asis: function () {
				return asis;
			}
		}
	  });
  
	  modalInstance.result.then(function () {
		console.log('Cerrado');
	  }, function () {
		console.log('Modal dismissed at: ' + new Date());
	  });
}
    



	$scope.Actualizarusuario  = function(usu){
		
		consulta = 'UPDATE usuarios SET modificado=1, observaciones=? WHERE rowid=?'
		ConexionServ.query(consulta, [usu.observaciones, usu.rowid]).then(function(result){
			console.log('usuarios actualizado ', result);
			toastr.success('Observacion actualizada');

		}, function(tx){
			console.log('usuarios no se pudo actualizar', tx);
			toastr.error('Observacion no se  Actualizado')

		});



	};



	$scope.Actualizarantiguo  = function(usu){
		
		consulta = 'UPDATE asistencias SET modificado=1, antiguo=1 WHERE usuario_id=?'
		ConexionServ.query(consulta, [usu.rowid]).then(function(result){
			console.log('Asistencias actualizado ', result);
			toastr.success('Asistencias actualizada');

		}, function(tx){
			console.log('Asistencias no se pudo actualizar', tx);
			toastr.error('Asistencias no se  Actualizado')

		});



	};


    $scope.actualizausuarios = function (usuario) {
        console.log("rapido")
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/editarusuario.html',
            controller: 'editaUsuraioCtrl',
            size: 'lg',
            resolve: {
                usuario: function () {
                    return usuario;
                }
            }
          });
      
          modalInstance.result.then(function () {
            console.log('Cerrado');
          }, function () {
            console.log('Modal dismissed at: ' + new Date());
          });
    }
	

})


.controller('editaUsuraioCtrl', function (ConexionServ,$scope, $uibModalInstance, usuario, toastr) {
	usuario.fecha = new Date(usuario.fecha);
	usuario.fecha_fin = new Date(usuario.fecha_fin);

	
	$scope.usuarios_edit = usuario;

	console.log(usuario)

	$scope.Actualizarusuario  = function(){
		$scope.fecha = usuario.fecha
		$scope.fecha_fin = usuario.fecha_fin

				fecha		= window.fixDate($scope.fecha);
				fecha_fin	= window.fixDate($scope.fecha_fin);
			
		consulta = 'UPDATE usuarios SET modificado=1, nombres=?, apellidos=?, email=?, sexo=?, plan=?, tipo_documento=?,numero_documento=?, fecha=? , fecha_fin=?, celular=?, activo=?, username=? , password=?, peso=?, pecho=?, brazo=?, cintura=?, pierna=?, cola=? WHERE rowid=?'
		ConexionServ.query(consulta, [usuario.nombres, usuario.apellidos, usuario.email, usuario.sexo, usuario.plan, usuario.tipo_documento,usuario.numero_documento, fecha , fecha_fin, usuario.celular, usuario.activo,  usuario.username, usuario.password, usuario.peso, usuario.pecho,usuario.brazo,usuario.cintura,usuario.pierna,usuario.cola, usuario.rowid]).then(function(result){

			console.log('usuarios actualizado ', result);
			toastr.success('Usuario actualizado');

		}, function(tx){
			console.log('usuarios no se pudo actualizar', tx);
			toastr.error('Usuario no se  Actualizado')

		});


	  $uibModalInstance.close();

	};
  
	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};
});

