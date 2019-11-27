angular.module('todo', [ 'ngSanitize','ui.bootstrap','ui.router','tooltips' , 'toastr'])

.config(function($stateProvider, $urlRouterProvider){
	
	$stateProvider
	
	.state('panel', {
		url: '/panel',
		controller: 'PanelCtrl',
		templateUrl: 'templates/panel.html'
	})
	
	.state('login', {
		url: '/login',
		controller: 'loginCtrl',
		templateUrl: 'templates/login.html'
	})

	.state('panel.inicio', {
		url: '/inicio',
		controller: 'PanelCtrl2',
		templateUrl: 'templates/inicio.html',

		
	})

	.state('panel.asisusuarios', {
		url: '/asistenciasUsuarios/:usu_id',
		controller: 'AsisusuariosCtrl',
		templateUrl: 'templates/Usuasistencias.html',

		
	})


	.state('panel.calendar', {
		url: '/calendar',
		controller: 'CalendarCtrl',
		templateUrl: 'templates/calendar.html'
	})

	.state('panel.table', {
		url: '/table',
		controller: 'tablaCtrl',
		templateUrl: 'templates/table.html'
	})

	

	.state('panel.form', {
		url: '/formulario',
		controller: 'formularioCtrl',
		templateUrl: 'templates/formulario.html'
	})

	.state('panel.inventario', {
		url: '/inventario',
		controller: 'inventarioCtrl',
		templateUrl: 'templates/inventario.html'
	})

	.state('panel.productos', {
		url: '/productos',
		controller: 'productosCtrl',
		templateUrl: 'templates/productos.html'
	})

	.state('panel.sincronizacion', {
		url: '/sincronizacion',
		controller: 'SincronizacionCtrl',
		templateUrl: 'templates/Sincronizacion.html'
		
	})
	
	.state('panel.asistencias', {
		url: '/asistencias',
		controller: 'asistenciasCtrl',
		templateUrl: 'templates/asistencias.html'
		
	})


	$urlRouterProvider.otherwise('/login')

})

