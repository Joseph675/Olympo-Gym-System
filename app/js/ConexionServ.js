angular.module('todo')

.factory('ConexionServ', function($q, $http, $timeout) {

    var db;


    db = window.openDatabase("Proyecto", '1', 'Proyecto', 1024 * 1024 * 49);


    sqlusuarios = "CREATE TABLE IF NOT EXISTS usuarios (id integer," +
                "nombres varchar(100)  NOT NULL collate nocase," +
                "apellidos varchar(100)  DEFAULT NULL collate nocase," +
                "observaciones varchar(255)  DEFAULT NULL collate nocase," +
                "email varchar(200)  DEFAULT NULL collate nocase," +
                "sexo varchar(1)  NOT NULL," +
                "plan varchar(1)  DEFAULT NULL," +
                "fecha varchar(100)  DEFAULT NULL collate nocase," +
                "fecha_fin varchar(100)  DEFAULT NULL collate nocase," + // fecha en que termina el mes/15 dias
                "celular real DEFAULT  NULL collate nocase," +
                "activo integer  DEFAULT  '1' NOT NULL," +
                "imagen_id integer  DEFAULT NULL,"+
                "modificado integer DEFAULT '0' NOT NULL ," +
                "eliminado integer DEFAULT '0' NOT NULL ," +
                "username varchar(100)  DEFAULT NULL , " +
                "password varchar(100)  DEFAULT NULL ," +
                "tipo_documento varchar(100)  DEFAULT NULL ," +
                "numero_documento real  DEFAULT NULL ," +
                "peso varchar(100)  DEFAULT NULL , "+
                "pecho varchar(100)  DEFAULT NULL , "+
                "brazo varchar(100)  DEFAULT NULL , "+
                "cintura varchar(100)  DEFAULT NULL , "+
                "pierna varchar(100)  DEFAULT NULL , "+
                "cola varchar(100)  DEFAULT NULL)" ;

     sqlasistencias = "CREATE TABLE IF NOT EXISTS asistencias (id integer," +
                "cita varchar(100)  DEFAULT NULL collate nocase, " +
                "usuario_id integer  NOT NULL ," +
                "modificado integer DEFAULT '0' NOT NULL ," +
                "eliminado integer DEFAULT '0' NOT NULL, " +
                "antiguo integer DEFAULT '0' NOT NULL) " ;

     sqlinventario = "CREATE TABLE IF NOT EXISTS inventario (id integer," +
                "nombre varchar(100)  NOT NULL collate nocase," +
                "descripcion varchar(100) DEFAULT NULL," +
                "estado varchar(100)  DEFAULT NULL collate nocase," +
                "precio real  DEFAULT NULL ," +
                "cantidad real  DEFAULT NULL ," +
                "codigo_producto varchar(100)  DEFAULT NULL collate nocase)" ;

   

    
                
    result = {
          
        createTables: function(){
            var defered = $q.defer();
            
            promesas = [];
            
            
            prom = this.query(sqlusuarios).then(function(){
                console.log('Usuarios Tabla creada');
            })
            promesas.push(prom);

            prom = this.query(sqlasistencias).then(function(){
              console.log('asistencias Tabla creada');
            })
            promesas.push(prom);

            prom = this.query(sqlinventario).then(function(){
              console.log('inventarios Tabla creada');
            })
            promesas.push(prom);

            Promise.all(promesas).then(function () {
              defered.resolve(result);
            })

          return defered.promise;
        
        },
        
        query: function(sql, datos, datos_callback){ // datos_callback para los alumnos en for, porque el i cambia
            var defered = $q.defer();
      
            if(typeof datos === "undefined") {
              datos = [];
            }
      
            db.transaction(function (tx) {
              tx.executeSql(sql, datos, function (tx, result) {

                if (sql.substring(0,6).toLowerCase() == 'insert' || sql.substring(0,6).toLowerCase() == 'update') {
                    defered.resolve(result);
                };
 

                var items = [];
                for (i = 0, l = result.rows.length; i < l; i++) {
                  items.push(result.rows.item(i));
                }
                if (datos_callback) {
                  defered.resolve({items: items, callback: datos_callback});
                }else{
                  defered.resolve(items);
                }
      
                
      
              }, function(tx,error){
                console.log(error.message, sql, datos);
                defered.reject(error.message, datos_callback)
              }) // db.executeSql
            }); // db.transaction
            return defered.promise;
          },
    }
    
    
    return result;

});