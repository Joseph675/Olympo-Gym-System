angular.module('todo')

.controller('tabla_mesCtrl', function($scope, ConexionServ, $uibModal, toastr, $state){
	ConexionServ.createTables();

	$scope.datousus = function(usuario){
		$state.go('panel.datosusuarios', {usu_id: usuario.rowid})
	}
	
	$scope.activo = '1'
		

	$scope.Usuasistencias = function(usuario){
		$state.go('panel.asisusuarios', {usu_id: usuario.rowid})
	}

	$scope.editarusuarios = function(usuario){
		$scope.mostrarTablaInsertar=false;
		$scope.editar=true;
		$scope.modificando = true ;
		$scope.usuarios_edit = usuario;
		
		console.log('vamos a editar');
	}


	$scope.traeractivos=function(activo){
		consulta = 'SELECT *, rowid FROM usuarios WHERE activo=? and eliminado==0 and plan="30 Dias" and fecha_fin  <="'+ fecha +'" and fecha_fin like "%/' + mes + '/%" '
		ConexionServ.query(consulta, [activo]).then(function(result){
			
			$scope.usuarios = result;
			console.log('activo mostrado')
	
		}, function(tx){
			console.log('activo no mostrado', tx)
		});
	}
	$scope.traeractivos();

	$scope.Swal = function(usuario){

		
		Swal.fire({
			background: '#000',
			title: '¿Estás seguro?',
			text: "No te será permitido revertir esto",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#17a2b8',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Confirmar'
		  }).then((result) => {
			if (result.value) {
				consulta = 'UPDATE usuarios SET eliminado=1 WHERE rowid=?'
				ConexionServ.query(consulta, [usuario.rowid]).then(function(result){
				$scope.usuario = result;
				console.log('usuario eliminada')
				toastr.info('Usuario eliminada');

				$scope.mostrarusuarios('30 Dias');

			}, function(tx){
				console.log('usuario no se pudo eliminar', tx)
				toastr.error('Usuario no se  eliminada');

			});
				
			  Swal.fire({
				background: '#000',
				title: 'Eliminado',
				type: 'success',
			  })
			}
		  })
	}

	

	$scope.Actualizactivo = function(usuario){

	$scope.mostrarusuarios('30 Dias');
			
		consulta = 'UPDATE usuarios SET activo=?  WHERE rowid=?'
		ConexionServ.query(consulta, [ usuario.activo, usuario.rowid]).then(function(result){
			console.log('activo actualizado ', result);
			$scope.activo = "1";
			$scope.mostrarusuarios('30 Dias');

		}, function(tx){
			console.log('activo no se pudo actualizar', tx);
		});

}



	$scope.mostrarusuarios = function(plan){
		consulta = '';
		if (plan) {
			consulta = 'SELECT *, rowid FROM usuarios WHERE activo==1 and eliminado==0 and plan="30 Dias" and fecha_fin  <="'+ fecha +'" and fecha_fin like "%/' + mes + '/%" ';
		}else{
			consulta = 'SELECT *, rowid FROM usuarios WHERE activo==1 and eliminado==0';
		}
		ConexionServ.query(consulta, []).then(function(result){
			$scope.usuarios = result;
			console.log('usuario mostrado')

		}, function(tx){
			console.log('usuarios no mostrado', tx)
		});
	}


	$scope.mostrarusuarios('30 Dias');

	


$scope.Actualizarusuarios = function (usuario) {
	console.log("rapido")
	var modalInstance = $uibModal.open({
		templateUrl: 'templates/editarusuario.html',
		controller: 'EditarUsuraioCtrl',
		size: 'lg',
		resolve: {
			usuario: function () {
				return usuario;

			}

		}
	  });
	  $scope.mostrarusuarios('30 Dias');
  
	  modalInstance.result.then(function () {
		console.log('Cerrado');
	  }, function () {
		console.log('Modal dismissed at: ' + new Date());
	  });
}


})


.controller('EditarUsuraioCtrl', function (ConexionServ,$scope, $uibModalInstance, usuario, toastr) {
	usuario.fecha = new Date(usuario.fecha);
	usuario.fecha_fin = new Date(usuario.fecha_fin);

	$scope.mostrarusuarios = function(plan){
		consulta = '';
		if (plan) {
			consulta = 'SELECT *, rowid FROM usuarios WHERE activo==1 and eliminado==0 and plan="' + plan + '"';
		}else{
			consulta = 'SELECT *, rowid FROM usuarios WHERE activo==1 and eliminado==0';
		}
		ConexionServ.query(consulta, []).then(function(result){
			$scope.usuarios = result;
			console.log('usuario mostrado')

		}, function(tx){
			console.log('usuarios no mostrado', tx)
		});
	}


	$scope.mostrarusuarios('30 Dias');


	$scope.usuarios_edit = usuario;
	console.log(usuario)

	$scope.Actualizarusuario  = function(){
		$scope.fecha = usuario.fecha
		$scope.fecha_fin = usuario.fecha_fin

				fecha		= window.fixDate($scope.fecha);
				fecha_fin	= window.fixDate($scope.fecha_fin);
			
		consulta = 'UPDATE usuarios SET modificado=1, nombres=?, apellidos=?, email=?, sexo=?, plan=?, fecha=? , fecha_fin=?, celular=?, activo=?, username=?, password=? WHERE rowid=?'
		ConexionServ.query(consulta, [usuario.nombres, usuario.apellidos, usuario.email, usuario.sexo, usuario.plan,  fecha , fecha_fin, usuario.celular, usuario.activo,  usuario.username, usuario.password, usuario.rowid]).then(function(result){
			console.log('usuarios actualizado ', result);
			toastr.success('Usuario actualizado');
			$scope.mostrarusuarios('30 Dias');

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

