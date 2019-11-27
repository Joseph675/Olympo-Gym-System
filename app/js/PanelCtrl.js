angular.module('todo')

.controller('PrincipalCtrl', function($scope){
	$scope.aside_toggled 	= false;
	$scope.num_theme 		= localStorage.num_theme ? localStorage.num_theme : 1;
	$scope.themes_toggled 	= false;


	


	
})

.controller('PanelCtrl', function($scope, ConexionServ, $log, $state){
	ConexionServ.createTables();


	var iniciarHora = function(){

        var fecha = new Date();
        var horas = fecha.getHours();
        var minutos = fecha.getMinutes();
        var segundos = fecha.getSeconds();
    
       var mes = fecha.getMonth();
       var dia = fecha.getDay();
       var dia_mes = fecha.getDate();
       var amOpm;
    
       var meses = ["Enero", "Febrero",  "Marzo",  "Abril",  "Mayo",  "Junio",  "Julio",  "Agosto",  "Septiembe",  "Octubre",  "Noviembre",  "Diciembre" ];
       var esteMes = meses[mes];
    
       var diadelasemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
       var diahoy = diadelasemana[dia];
    
        amOpm = (horas >= 12) ? "p.m." : "a.m.";
        horas = (horas > 12) ? horas - 12 : horas;
        horas = (horas < 10) ? "0" + horas : horas;
        minutos = (minutos < 10) ? "0" + minutos : minutos;
        segundos = (segundos < 10) ? "0" + segundos : segundos;
    
    
        document.getElementById("Lafecha").innerHTML = diahoy + " " + dia_mes + " De " + esteMes 
        document.getElementById("hora").innerHTML = horas + " : ";
        document.getElementById("minuto").innerHTML = minutos + " : ";
        document.getElementById("segundo").innerHTML = segundos ;

    
    
    }
    
    iniciarHora();
	setInterval(iniciarHora);

	$scope.USER = JSON.parse(localStorage.USER);

	$scope.Usuasistencias = function(usuario){
		$state.go('panel.asisusuarios', {usu_id: usuario.rowid})
	}

	// Contamos usuarios
	consulta = "SELECT count(rowid) as cantidad FROM usuarios WHERE activo=1";
	ConexionServ.query(consulta, []).then(function(result){
		
		$scope.cantidad_usuarios = result[0].cantidad;
		
	}, function(tx){
		console.log('usuarios no mostrado', tx)
	});




	// RECORREMOS USUARIOS PARA CALCULAR DÍAS FALTANTES
	$scope.traer = function(plan){
		consulta = '';
		if (plan) {
			consulta = 'SELECT *, rowid FROM usuarios WHERE activo==1 and eliminado==0 and rowid!=1 and plan="' + plan + '"';
		}else{
			consulta = 'SELECT *, rowid FROM usuarios WHERE activo==1 and eliminado==0 and rowid!=1';
		}
		ConexionServ.query(consulta, []).then(function(result){
			
			var mili_dias 	= 1000*60*60*24;
			var fec_hoy 	= new Date();
			fec_hoy = window.fixDate(fec_hoy);
			fec_hoy = new Date(fec_hoy);
	
			var usus_alert 	= [];
	
			for (let i = 0; i < result.length; i++) {
				const usu = result[i];
				
				fecha_fin 		= new Date(usu.fecha_fin);
				dif 			= fecha_fin - fec_hoy;
	
				dias 			= dif / mili_dias;
				usu.dias 		= Math.round(dias);
				usu.dias_abs 	= Math.abs(usu.dias);
				
				if (dias < 6 ) {
					
					usus_alert.push(usu);
	
				}else if (usu.plan == "Dias Contados") {
	
					var usu_contados = [];
	
					consulta ='SELECT count(rowid) as cantidad FROM asistencias WHERE usuario_id=? and eliminado = "0" and antiguo = "0"';
					ConexionServ.query(consulta, [ usu.rowid ]).then(function(asistencias){
						usu.cantidad_asis = asistencias[0].cantidad;
	
	
						if (usu.cantidad_asis >= 25) {
							usus_alert.push(usu);
	
						 total = 30 - usu.cantidad_asis ;
	
						 usu.total = total;
							console.log(total);
						}
	
					})
				}
			}
	
			$scope.usus_alert = usus_alert;
	
		}, function(tx){
			console.log('usuarios no mostrado', tx)
		});
	}
	

	$scope.traer();




	// Contamos usuarios por plan
	consulta = "SELECT count(rowid) as cantidad FROM usuarios WHERE activo=1 and plan='30 Dias' ";
	ConexionServ.query(consulta, []).then(function(result){
		
		$scope.usuarios_mes = result[0].cantidad;

	}, function(tx){
		console.log('usuarios no mostrado', tx)
	});

	consulta = "SELECT count(rowid) as cantidad FROM usuarios WHERE activo=1 and plan='15 Dias' ";
	ConexionServ.query(consulta, []).then(function(result){
		
		$scope.usuarios_dias = result[0].cantidad;

	}, function(tx){
		console.log('usuarios no mostrado', tx)
	});


	consulta = "SELECT count(rowid) as cantidad FROM usuarios WHERE activo=1 and plan='Dias Contados' ";
	ConexionServ.query(consulta, []).then(function(result){
		
		$scope.usuarios_diascontados = result[0].cantidad;
		
	}, function(tx){
		console.log('usuarios no mostrado', tx)
	});



	$scope.mostrarusuarios = function(plan){
		 console.log("asd")
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



	

	$scope.mostrarMenu = function(){
		$scope.aside_toggled = true;
	}


	$scope.ocultarTemas_Menu = function(){
		$scope.aside_toggled = false;
	$scope.themes_toggled = false;
	}

	$scope.mostrarTemas = function(){
		$scope.themes_toggled = true;
	}

	$scope.setTheme = function(num){
		localStorage.num_theme= num;
		$scope.$parent.num_theme = num;
	}

	  // Traemos 
	
	  $scope.status = {
		isopen: false
	  };
	
	  $scope.toggled = function(open) {
		$log.log('Dropdown is now: ', open);
	  };
	
	  $scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	  };
	
	  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

// Traemos usuarios con plan de mes vencido
	  $scope.plan_mes_vencido=function(){
		consulta = '';
		//<
		 fecha = new Date();
		 mes = fecha.getMonth() + 1;
		 mes =  mes < 10 ? '0' + mes : '' + mes ;
		 fecha = window.fixDate(fecha);


		consulta = 'SELECT *, count(rowid) as cantidad FROM usuarios WHERE activo=1 and eliminado=0 and plan="30 Dias" and fecha_fin  <="'+ fecha +'" and fecha_fin like "%/' + mes + '/%" ';
		ConexionServ.query(consulta).then(function(usuarios){

		$scope.usuarios_30dias = usuarios[0].cantidad;
			
			
		})
	}
	
	$scope.plan_mes_vencido();

	// Traemos usuarios con plan de 15 dias vencido
	$scope.plan_15_dias_vencido=function(){
		consulta = '';
		//<
		 fecha = new Date();
		 mes = fecha.getMonth() + 1;
		 mes =  mes < 10 ? '0' + mes : '' + mes ;
		 fecha = window.fixDate(fecha);


		consulta = 'SELECT *, count(rowid) as cantidad FROM usuarios WHERE activo=1 and eliminado=0 and plan="15 Dias" and fecha_fin  <="'+ fecha +'" and fecha_fin like "%/' + mes + '/%" ';
		ConexionServ.query(consulta).then(function(usuarios){

		$scope.usuarios_15dias = usuarios[0].cantidad;
			
			
		})
	}
	
	$scope.plan_15_dias_vencido();

	// Traemos usuarios con plan de dias contados vencido
	$scope.plan_dias_contado_vencido=function(){
		consulta = '';
		//<
		var fecha = new Date();
		var mes = fecha.getMonth() + 1;
		var mes =  mes < 10 ? '0' + mes : '' + mes ;
		var fecha = window.fixDate(fecha);

		$scope.usuarios_dias_contados = 0;
		$scope.usuarios_dias_contados_vencidos = 0;

		consulta = 'SELECT *, rowid FROM usuarios WHERE activo=1 and eliminado=0 and plan="Dias Contados"  ';
		ConexionServ.query(consulta).then(function(usuarios){
			$scope.usuarios_dias_contados = usuarios.length;

			for (let i = 0; i < usuarios.length; i++) {
				const usu = usuarios[i];

				consulta = 'SELECT count(rowid) as cantidad FROM asistencias WHERE usuario_id=? and eliminado = "0" and antiguo="0"  	' 
				ConexionServ.query(consulta, [usu.rowid]).then(function(asistencias){
					cant = asistencias[0].cantidad;


					if (cant >= 30) {
						
						$scope.usuarios_dias_contados_vencidos = $scope.usuarios_dias_contados_vencidos + 1;

					}
					
				}, function(tx){
					console.log('nooo')
				})
			}
			
		})
	}
	
	$scope.plan_dias_contado_vencido();





});






window.fixDate = function(fec, con_hora){
	
	try {
		dia   = fec.getDate();
		mes   = (fec.getMonth() + 1 );
		year  = fec.getFullYear();
	
		if (dia < 10) {
			dia = '0' + dia;
		}
	
		if (mes < 10) {
			mes = '0' + mes;
		}
		var fecha   = '' + year + '/' + mes  + '/' + dia;
		
		if (con_hora){
			if (con_hora.getHours) {
				hora 	= con_hora.getHours();
				if (hora<10) { hora = '0' + hora; };
				min 	= con_hora.getMinutes();
				if (min<10) { min = '0' + min; };
				sec 	= con_hora.getSeconds();
				if (sec<10) { sec = '0' + sec; };
				fecha 	= fecha + ' ' + hora + ':' + min + ':' + sec
			}else{
				hora 	= fec.getHours();
				if (hora<10) { hora = '0' + hora; };
				min 	= fec.getMinutes();
				if (min<10) { min = '0' + min; };
				sec 	= fec.getSeconds();
				if (sec<10) { sec = '0' + sec; };
				fecha 	= fecha + ' ' + hora + ':' + min + ':' + sec
			}
			
		}
		//console.log(fecha);

		return fecha;
	} catch (error) {
		console.log(error);
		return fec;
	}
}