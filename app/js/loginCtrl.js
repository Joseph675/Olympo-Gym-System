angular.module('todo')

.controller('loginCtrl', function($scope, ConexionServ, $state, toastr){
	ConexionServ.createTables();

	ConexionServ.query('SELECT *, rowid FROM usuarios WHERE  username="admin" and password="123" ').then(function(result){
		if(result.length == 0){
			
			consulta = "INSERT INTO usuarios(nombres, apellidos, email, sexo, celular, activo, username, password) VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Olympo', 'Gym', 'olympogym@gmail.com', 'M', 3203602610, 1, 'admin', '123']).then(function(){
				console.log('Admin creado');
			});

			consulta = "INSERT INTO usuarios(nombres, apellidos,  sexo, fecha, fecha_fin, activo ) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Lorena', 'Gonzales', 'F', '2019/11/1', '2019/12/1',  1 ]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Maria Jose', 'Guitierres',  'F', '2019/11/2', '2019/12/2', 1]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Sarita', 'Torres',  'F', '2019/11/2', '2019/12/2', 1]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Luis Alfredo', 'Pinzon',  'M', '2019/11/4', '2019/12/4', 1]).then(function(){
				console.log('usu creado');
			
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Marleny', 'Sierrra',  'F', '2019/11/4', '2019/12/4', 1]).then(function(){
				console.log('usu creado');
			})
			
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Andres', 'Benitez',  'M', '2019/11/4', '2019/12/4', 1]).then(function(){
				console.log('usu creado');
			})
			
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['David', 'Uribe',  'M', '2019/11/4', '2019/12/4', 1]).then(function(){
				console.log('usu creado');
			})
			
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Soraida', 'Conde',  'F', '2019/11/5', '2019/12/5', 1]).then(function(){
				console.log('usu creado');
			})
			
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Andres', 'Dias',  'M', '2019/11/5', '2019/12/5', 1]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, plan, activo ) VALUES(?, ?, ?, ?, ?, ? , ?)"
			ConexionServ.query(consulta, ['Orlando', 'Cely',  'M', '2019/11/5', '2019/11/19', '15 Dias', 1]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, observaciones, activo) VALUES(?, ?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Dayana', 'Duarte',  'F', '2019/11/5', '2019/12/5', 'Debe 40000', 1]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Kaherine', 'Lopez',  'F', '2019/11/5', '2019/12/5', 1]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Willian', 'Morales',  'M', '2019/11/5', '2019/12/5', 1]).then(function(){
				console.log('usu creado');
			})

			
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Nati', 'Farjardo',  'F', '2019/11/5', '2019/12/5', 1]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin,  observaciones, activo) VALUES(?, ?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Diana', 'Baron',  'F', '2019/11/5', '2019/12/5', 'Debe 35000', 1]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Alberto', 'Caro',  'M', '2019/11/6', '2019/12/6', 1]).then(function(){
				console.log('usu creado');
			})


			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Juliana', 'Reyes',  'F', '2019/11/6', '2019/12/6', 1]).then(function(){
				console.log('usu creado');
			})
			

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Edith', 'Albino',  'F', '2019/11/6', '2019/12/6', 1]).then(function(){
				console.log('usu creado');
			})
			

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Jefrey Arley', 'Jaimes',  'M', '2019/11/6', '2019/12/6', 1]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Nidia Yaneth', 'Parra',  'F', '2019/11/6', '2019/12/6', 1]).then(function(){
				console.log('usu creado');
			})
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Esteba', 'García',  'M', '2019/11/6', '2019/12/6', 1]).then(function(){
				console.log('usu creado');
			})
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Jair', 'Guzman',  'M', '2019/11/6', '2019/12/6', 1]).then(function(){
				console.log('usu creado');
			})

			
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Jan Carlos', 'Pinto',  'M', '2019/11/6', '2019/12/6', 1]).then(function(){
				console.log('usu creado');
			})
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Dania', 'Cepeda',  'F', '2019/11/7', '2019/12/7', 1]).then(function(){
				console.log('usu creado');
			})
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Noris', 'Perez',  'F', '2019/11/7', '2019/12/7', 1]).then(function(){
				console.log('usu creado');
			})
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Yeison', 'Beltran',  'M', '2019/11/9', '2019/12/9', 1]).then(function(){
				console.log('usu creado');
			})
			
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, observaciones, activo) VALUES(?, ?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Jesus', 'Botia',  'M', '2019/11/9', '2019/12/9',  'Debe 20000', 1]).then(function(){
				console.log('usu creado');
			})
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Christer', 'Vigota',  'M', '2019/11/12', '2019/12/12', 1]).then(function(){
				console.log('usu creado');
			})
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Pedro', 'Sarmiento',  'M', '2019/11/12', '2019/12/12', 1]).then(function(){
				console.log('usu creado');
			})

			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, observaciones, activo) VALUES(?, ?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Karen', 'Lopez',  'F', '2019/11/15', '2019/12/15', 'Debe 3000', 1]).then(function(){
				console.log('usu creado');
			})
			
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Elian', 'Rojas',  'M', '2019/11/18', '2019/12/18', 1]).then(function(){
				console.log('usu creado');
			})
			
			consulta = "INSERT INTO usuarios(nombres, apellidos, sexo, fecha, fecha_fin, activo) VALUES(?, ?, ?, ?, ?, ?)"
			ConexionServ.query(consulta, ['Viviana', 'Quirife',  'F', '2019/11/21', '2019/12/21', 1]).then(function(){
				console.log('usu creado');
			})
		}
			
	})

	
	
	

	$scope.mostrarusuarios = function Login( username, password, nombres){


		var usuario=$scope.username; 
		var password=$scope.password; 

		var correo = document.getElementById("usuario");
		var contraseña = document.getElementById("password");



		if (usuario=="USUARIO1" && password=="CONTRASEÑA1") { 
			window.location="http://192.168.100.31/feryz_server/public/taxis/"; 
		} 
		if (usuario=="USUARIO2" && password=="CONTRASEÑA2") { 
			window.location="http://192.168.100.31/feryz_server/public/taxis/"; 
		} 
		if (usuario=="" && password=="") { 
			window.location="errorpopup.html"; 
		}

		if ( correo.value=="" |  contraseña.value=="") {
			toastr.warning("Ingresa tus datos")
			
		}else{
			ConexionServ.query('SELECT *, rowid FROM usuarios WHERE   username=? and password=? and eliminado==0 ', [username, password]).then(function(result){

				if(result.length > 0){
					u = result[0];
					localStorage.USER = JSON.stringify(result[0]);
					$state.go("panel.inicio");
					toastr.success('Bienvenido ' +  u.nombres  );
	
				}else{
					toastr.error('Usuario incorrecto');
	
				}
			})
				
				
		}
		}

		


	
})

