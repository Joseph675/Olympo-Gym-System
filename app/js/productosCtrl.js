angular.module('todo')

.controller('productosCtrl', function($scope, ConexionServ, $uibModal, toastr){
	ConexionServ.createTables();

	$scope.editarproducto= function(producto){
		$scope.mostrarTablaInsertar=false;
		$scope.editar=true;
		$scope.modificando = true ;
		$scope.producto_edit = producto;
		
		console.log('vamos a editar');
	}

	$scope.eliminarproducto = function(producto){
		
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
			console.log(producto)

				consulta = 'DELETE FROM inventario WHERE rowid=?'
				ConexionServ.query(consulta, [producto.rowid]).then(function(result){
					$scope.producto = result;
					toastr.info('Producto eliminado')

					$scope.mostrarproductos();
				}, function(tx){
					console.log('Producto no se pudo eliminar', tx)
				});
				
			  Swal.fire({
				background: '#000',
				title: 'Eliminado',
				type: 'success',
			  })
			}
		  })
	}

	


	$scope.mostrarproductos = function(result){
		consulta = "SELECT *, rowid FROM inventario "
		ConexionServ.query(consulta, []).then(function(result){
			$scope.inventario = result;
			console.log('Producto mostrado')

		}, function(tx){
			console.log('Producto no mostrado', tx)
		});
	}


	$scope.mostrarproductos();

	


$scope.Actualizarproducto = function (producto) {
	var modalInstance = $uibModal.open({
		templateUrl: 'templates/editarproductos.html',
		controller: 'EditarProductoCtrl',
		size: 'lg',
		resolve: {
			producto: function () {
				return producto;
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


.controller('EditarProductoCtrl', function (ConexionServ,$scope, $uibModalInstance, producto, toastr) {
	

	$scope.inventario_edit = producto;

	
	console.log(producto)

	$scope.Actualizarproductos = function(){

			
		consulta = 'UPDATE inventario SET  nombre=?, descripcion=?, estado=?, precio=?, cantidad=?, codigo_producto=? WHERE rowid=?'
		ConexionServ.query(consulta, [producto.nombre, producto.descripcion, producto.estado, producto.precio, producto.cantidad, producto.codigo_producto, producto.rowid]).then(function(result){
			toastr.success('producto Actualizado')
			console.log('produ actualizado ', result);
		}, function(tx){
			console.log('producto no se pudo actualizar', tx);
		});


	  $uibModalInstance.close();

	};
  
	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};
});

