angular.module('todo')

.controller('inventarioCtrl', function($scope, ConexionServ, toastr){
	ConexionServ.createTables();

	




$scope.insertarproducto = function(codigo_producto){

	var codigo = document.getElementById("codigo");


	ConexionServ.query('SELECT *, rowid FROM inventario WHERE codigo_producto=?', [codigo_producto]).then(function(result){
		console.log(result)
			if(result.length > 0){
				
				toastr.info('Producto Existente')
		}else{
			if  (nombres.value =="" ) {
				toastr.warning('Ingresa el nombre del producto')
			} else {
				consulta = "INSERT INTO inventario('nombre', 'descripcion', 'estado', 'precio', 'cantidad', 'codigo_producto') VALUES( ?, ?, ?, ?, ?, ?)"
				ConexionServ.query(consulta, [$scope.nombre, $scope.descripcion, $scope.estado, $scope.precio, $scope.cantidad, $scope.codigo_producto]
			
				
				).then(function(){
			
			toastr.success('Producto insertado')
			console.log('Producto insertado')

					$scope.nombre= "";
					$scope.descripcion= "";
					$scope.estado= "";
					$scope.precio= "";
					$scope.cantidad= "";
					$scope.codigo_producto= "";

		}, function(tx){
			toastr.error('Producto no se pudo insertar')
			console.log('Producto no se pudo insertar', tx)
		});
			}
			
			}
	})

	
		
}


	$scope.mostrarusuarios = function(result){
		consulta = "SELECT *, rowid FROM usuarios"
		ConexionServ.query(consulta, []).then(function(result){
			$scope.usuarios = result;
			console.log('usuario mostrado')

		}, function(tx){
			console.log('usuarios no mostrado', tx)
		});
	}


	$scope.mostrarusuarios();

	$scope.Actualizarusuarios = function(usu){

			
		consulta = 'UPDATE usuarios SET modificado=1, nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, activo=?, username=?, password=?, cita=? WHERE rowid=?'
		ConexionServ.query(consulta, [usu.nombres, usu.apellidos, usu.email, usu.sexo, usu.fecha, , usu.celular, usu.activo,  usu.username, usu.password, usu.cita, usu.rowid]).then(function(result){
			console.log('usuarios actualizado ', result);
		}, function(tx){
			console.log('usuarios no se pudo actualizar', tx);
		});

}

	$scope.eliminarusuarios = function(usuario){
		consulta = 'UPDATE usuarios SET eliminado=1 WHERE rowid=?'
		ConexionServ.query(consulta, [usuario.rowid.$index]).then(function(result){
			$scope.usuario = result;
			console.log('usuario eliminada')

		}, function(tx){
			console.log('usuario no se pudo eliminar', tx)
		});
}


})

