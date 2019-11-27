angular.module('todo')

.controller('PanelCtrl2', function(){

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
    
        amOpm = (horas > 12) ? "p.m." : "a.m.";
        horas = (horas > 12) ? horas - 12 : horas;
        horas = (horas < 10) ? "0" + horas : horas;
        minutos = (minutos < 10) ? "0" + minutos : minutos;
        segundos = (segundos < 10) ? "0" + segundos : segundos;
    
    
        document.getElementById("Lafecha").innerHTML = diahoy + " " + dia_mes + " De " + esteMes 
        document.getElementById("hora").innerHTML = horas + " : ";
        document.getElementById("minuto").innerHTML = minutos + " : ";
        document.getElementById("segundo").innerHTML = segundos ;
        document.getElementById("amOpm").innerHTML = amOpm;

    
    
    }
    
    iniciarHora();
    setInterval(iniciarHora);

});



