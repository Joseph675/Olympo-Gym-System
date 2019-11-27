angular.module('todo')

.controller('tablaCtrl', function($scope, ConexionServ, $uibModal, toastr, $state){
	ConexionServ.createTables();


	
	$scope.activo = '1';
	$scope.datos_plan = 'Todos';

		
	$scope.editarusuarios = function(usuario){
		$scope.mostrarTablaInsertar=false;
		$scope.editar=true;
		$scope.modificando = true ;
		$scope.usuarios_edit = usuario;
		
		console.log('vamos a editar');
	}


	$scope.traeractivos=function(activo){
		consulta = "SELECT *, rowid FROM usuarios WHERE activo=? and eliminado==0"
		ConexionServ.query(consulta, [activo]).then(function(result){
			
			$scope.usuarios = result;
			console.log('activo mostrado')
	
		}, function(tx){
			console.log('activo no mostrado', tx)
		});
	}
	$scope.traeractivos();

	$scope.imprimir = function(){
		window.print();
	}
	
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
				toastr.info('Usuario eliminado');

				$scope.mostrarusuarios();
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

	$scope.insertarusuarios = function(){
		consulta = "INSERT INTO usuarios('nombres', 'apellidos', 'email', 'sexo', 'fecha',  'celular', 'activo', 'username', 'password') VALUES(?, ?, ?, ?, ?, ?, ?,  ?, ?, ?)"
		ConexionServ.query(consulta, [$scope.nombres, $scope.apellidos, $scope.email, $scope.sexo, $scope.fecha, $scope.celular, $scope.activo, $scope.username, $scope.password]).then(function(result){
			$scope.mostrarusuarios();
			console.log('usuarios insertado')
		}, function(tx){
			console.log('usuarios no se pudo insertar', tx)
		});
	}

	$scope.Actualizactivo = function(usuario){

			
		consulta = 'UPDATE usuarios SET activo=?  WHERE rowid=?'
		ConexionServ.query(consulta, [ usuario.activo, usuario.rowid]).then(function(result){
			console.log('activo actualizado ', result);
			$scope.activo = "1";
			$scope.mostrarusuarios()
		}, function(tx){
			console.log('activo no se pudo actualizar', tx);
		});

}

	$scope.Usuasistencias = function(usuario){
		$state.go('panel.asisusuarios', {usu_id: usuario.rowid})
	}


	$scope.mostrarusuarios = function(plan){
		consulta = '';
		if (plan) {
			consulta = 'SELECT *, rowid FROM usuarios WHERE activo==1 and eliminado==0 and rowid!=1 and plan="' + plan + '"';
		}else{
			consulta = 'SELECT *, rowid FROM usuarios WHERE activo==1 and rowid!=1 and  eliminado==0';
		}
		ConexionServ.query(consulta, []).then(function(result){
			$scope.usuarios = result;
			console.log('usuario mostrado')

		}, function(tx){
			console.log('usuarios no mostrado', tx)
		});
	}


	$scope.mostrarusuarios();

	


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

