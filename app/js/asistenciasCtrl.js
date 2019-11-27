
angular.module('todo')


.controller('asistenciasCtrl', function($scope, ConexionServ, $uibModal, $state, toastr ){
	ConexionServ.createTables();

    usu_id = $state.params.usu_id;
    $scope.plan_actual = null;

	
	
    mes = new Date().getMonth() + 1;

    if (mes < 9) {
        mes = '0' + mes;
    }else{
        mes = '' + mes;
    }



    $scope.dato = { select_year: '' + (new Date().getFullYear()), select_month: mes }

    $scope.traerdatos=function(dato){
        cuadro = dato.select_year + '/' + dato.select_month; 
        
        consulta = ' SELECT *, rowid FROM asistencias WHERE usuario_id=? and eliminado = "0" and  cita like "' + cuadro + '%" '
        ConexionServ.query(consulta, [usu_id]).then(function(asis){
			$scope.asis=usu
			console.log(asis)        
    })
}


$scope.Usuasistencias = function(usuario){
	$state.go('panel.asisusuarios', {usu_id: usuario.rowid})
}
	

	
	
	$scope.status = {
		isCustomHeaderOpen: false,
		isFirstOpen: true,
		isFirstDisabled: false
	  }

	$scope.modificando = false ;
	$scope.mostrar = false ;

	$scope.editarusuarios = function(usuario){
		
		$scope.modificando = true ;
		$scope.usuarios_edit = usuario;
		console.log('vamos a editar');
	}

	$scope.editarasistencias = function(asis){
		$scope.mostrar = true ;
		$scope.asistencias_edit = asis;
		console.log('vamossss a editar')
	},function(tx){
		console.log('no vamossss a editar')
	}


	
	
	$scope.insertarasistencia = function(usu){
		
		
		$scope.cita = new Date()
		cita=window.fixDate($scope.cita)

		consulta = "INSERT INTO asistencias('cita', 'usuario_id') VALUES(?,?)"
		ConexionServ.query(consulta, [cita, usu.rowid ]).then(function(result){
			
			$scope.traerusuarios(usu.plan);
			console.log('asistencias insertado')
			toastr.success('Asistencias insertada');

		}, function(tx){
			console.log('asistencias no se pudo insertar', tx)
			toastr.error('Asistencias no se pudo insertar');

		});
	}

	

	$scope.traerusuarios=function(plan){
		
		

		consulta = '';
		if (plan) {
			consulta = 'SELECT *, rowid FROM usuarios WHERE activo==1 and eliminado==0 and rowid!=1 and plan="' + plan + '"';
		}else{
			consulta = 'SELECT *, rowid FROM usuarios WHERE activo==1 and eliminado==0 and rowid!=1';
		}
		ConexionServ.query(consulta).then(function(usuarios){
			for (let i = 0; i < usuarios.length; i++) {
				const usu = usuarios[i];

				cuadro = $scope.dato.select_year + '/' + $scope.dato.select_month; 
				consulta = 'SELECT *,rowid FROM asistencias WHERE usuario_id=? and eliminado = "0" and antiguo = "0" and cita like "' + cuadro + '%" ' 
				ConexionServ.query(consulta, [usuarios[i].rowid]).then(function(asistencias){
					usuarios[i].asistencias=asistencias;

					for (let j = 0; j < usuarios[i].asistencias.length; j++) {
						const u = usuarios[i].asistencias[j];
						u.cita = new Date(u.cita);
					}
					
					/*
					if (usuarios[i].plan == "30 Dias") {
						if (asistencias.length  >= 30) {
							usuarios[i].terminado = true;
						}else{
							faltan = 30 - asistencias.length;
							for (let j = 0; j < faltan; j++) {
								usuarios[i].asistencias.push({});
							}
						}
					}

					if (usuarios[i].plan == "15 Dias") {
						if (asistencias.length  >= 15) {
							usuarios[i].terminado = true;
						}else{
							faltan = 15 - asistencias.length;
							for (let j = 0; j < faltan; j++) {
								usuarios[i].asistencias.push({});
							}
						}
					}*/

					if (usuarios[i].plan == "Dias Contados") {
						
						if (asistencias.length  >= 30) {
							usuarios[i].terminado = true;
						}else{
							faltan = 30 - asistencias.length;
							for (let j = 0; j < faltan; j++) {
								usuarios[i].asistencias.push({});
								
							}
						}
					
					}
					
				}, function(tx){
					console.log('nooo')
				})
			}
			
			$scope.usuarios=usuarios;
			
		})
	}
	
	$scope.traerusuarios();
	


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
		$scope.traerusuarios();
	  }, function () {
		console.log('Modal dismissed at: ' + new Date());
	  });
}



})





.controller('EditarAsistenciaCtrl', function (ConexionServ,$scope, $uibModalInstance, asis, toastr) {
	$scope.asis = asis;


	asis.cita = new Date(asis.cita)

	$scope.dato = {};

	$scope.dateOptions = {
		formatYear: 'yy',
		maxDate: new Date(2025, 12, 31),
		minDate: new Date(2019, 01, 01)
	};


	$scope.open1 = function () {
		$scope.dato.opened = !$scope.dato.opened;
	}
	
	
	$scope.eliminarasistencias = function(asis ){
		consulta = 'DELETE FROM asistencias WHERE rowid=?'
		ConexionServ.query(consulta, [asis.rowid]).then(function(result){
			toastr.success('Asistencia eliminada');
	
		}, function(tx){
			console.log('asistencias no se pudo eliminar', tx)
		});
		 $uibModalInstance.close();
	}

	
	
	

	$scope.ok = function (asis) {
		$scope.cita = asis.cita

		cita=window.fixDate($scope.cita)

		consulta = 'UPDATE asistencias SET cita=? WHERE rowid=?'

		console.log(asis)

		ConexionServ.query(consulta, [cita, asis.rowid]).then(function(result){
			console.log('asistencias actualizado ', result);
			toastr.success('Asistencia actualizada');

		}, function(tx){
			console.log('asistencias no se pudo actualizar', tx);
			toastr.error('Asistencia no se  actualizada');

		});
	  $uibModalInstance.close();

	};


	$scope.antigua = function (asis) {
		$scope.antiguo = asis.antiguo


		consulta = 'UPDATE asistencias SET antiguo= 0 WHERE rowid=?'

		console.log(asis)

		ConexionServ.query(consulta, [ asis.rowid]).then(function(result){
			console.log('asistencias actualizado ', result);
			toastr.success('Asistencia actualizada');

		}, function(tx){
			console.log('asistencias no se pudo actualizar', tx);
			toastr.error('Asistencia no se  actualizada');

		});
	  $uibModalInstance.close();

	};
  
	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};
});

