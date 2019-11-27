angular.module('todo')

.controller('formularioCtrl', function($scope, ConexionServ, toastr){
	ConexionServ.createTables();

	$scope.editar 		= false ;	
	$scope.modificando 	= false ;	
	$scope.sexo			= "M";
	$scope.plan			= "30 Dias";
	$scope.tipo_documento	= "C.C";


	$scope.nombres= "";
	$scope.apellidos= "";
	$scope.observaciones= "";
	$scope.email= "";
	$scope.fecha= new Date;
	$scope.fecha_fin= new Date;
	$scope.celular= "";
	$scope.username= "";
	$scope.password= "";
	$scope.numero_documento= "";
	$scope.peso= "";
	$scope.pecho= "";
	$scope.brazo= "";
	$scope.cintura= "";
	$scope.pierna= "";
	$scope.cola= "";


	
	

	$scope.editarusuarios = function(usuario){
		$scope.modificando = true ;
		$scope.usuarios_edit = usuario;
		console.log('vamos a editar');
	}



$scope.mostrarpassword = function(){
	console.log("contraseña")
	var tipo = document.getElementById("contraseña");

	if (tipo.type == 'password') {
		tipo.type = 'text'
	

	}else{
		tipo.type = 'password'
		
	}

};


$scope.insertarusuarios = function(numero_documento){

	var usuario = document.getElementById("usuario");

	ConexionServ.query('SELECT *, rowid FROM usuarios WHERE numero_documento=? ', [numero_documento]).then(function(result){
		
		if(result.length > 0){
				
			toastr.warning('Usuario existente');

		}else{
			if ( nombres.value =="" ) {
				toastr.warning('Ingresa tu nombre');

			} else {
				fecha		= window.fixDate($scope.fecha);
				fecha_fin	= window.fixDate($scope.fecha_fin);

				consulta = "INSERT INTO usuarios('nombres', 'apellidos', 'observaciones', 'email', 'sexo', 'plan', 'fecha', 'fecha_fin', 'celular',  'imagen_id', 'username', 'password' , 'tipo_documento', 'numero_documento' , 'peso', 'pecho', 'brazo', 'cintura', 'pierna', 'cola') VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
				ConexionServ.query(consulta, [$scope.nombres, $scope.apellidos, $scope.observaciones, $scope.email, $scope.sexo, $scope.plan, fecha, fecha_fin, $scope.celular,  $scope.imagen_id, $scope.username, $scope.password , $scope.tipo_documento , $scope.numero_documento, $scope.peso, $scope.pecho, $scope.brazo, $scope.cintura, $scope.pierna, $scope.cola]
			
				
				).then(function(){
					toastr.success('Usuario insertado');
					$scope.nombres= "";
					$scope.apellidos= "";
					$scope.observaciones= "";
					$scope.email= "";
					$scope.fecha= new Date;
					$scope.fecha_fin= new Date;
					$scope.celular= "";
					$scope.username= "";
					$scope.password= "";
					$scope.numero_documento= "";
					$scope.peso= "";
					$scope.pecho= "";
					$scope.brazo= "";
					$scope.cintura= "";
					$scope.pierna= "";
					$scope.cola= "";

			console.log('USUARIO insertado')
		}, function(tx){
			toastr.error('usuario no se pudo insertar');

			console.log('usuario no se pudo insertar', tx)
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

	


})

