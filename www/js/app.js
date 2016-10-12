app = {
	dia: 'lunes', // Dia actual en palabra
	dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
	changePage: function (dia) {
		app.dia = dia;
		$(':mobile-pagecontainer')
		.pagecontainer('change', app.dia + '.html');
	},
	// Si recibe un numero devuelve una palabra:
	// 1 "lunes", 2 "martes",..., 5 "viernes"
	// Si recibe una palabra devuele el número:
	// "lunes" 1, .... "viernes" 5
	_dia: function (d) {
		if (typeof d == "number") {
			return app.dias[d-1];
		}
		for(i in app.dias) {
			if(app.dias[i] == d) {
				return parseInt(i)+1;
			}
		}
	},
	// Devuelve el nombre del siguiete dia.
	// lunes -> martes.
	//  viernes -> lunes
	siguiente: function(d) {
		console.log("dia actual"+app.dia);
		var diaNumero = app._dia(app.dia);
		console.log("dia actualNumero"+diaNumero);
		console.log("dia siguiente:"+app.dias[diaNumero%5]);
		return app.dias[diaNumero%5];
	},
	// Devuelve el nombre del siguiete previo
	// lunes -> viernes
	//  martes -> lunes
	//  viernes -> jueves
	previo: function(d) {
		var diaNumero = app._dia(app.dia) - 2;
		if(diaNumero == -1) { // lunes
			diaNumero = 4;
		}
		return app.dias[diaNumero];
	},
	actualizarVista: function() {
		var d = new Date();
		var tActual = tiempo2int(d.getHours() + ':' + d.getMinutes());
		$('.tiempo').each(function () {
			txt = $(this).text().split('-');
			tInicio = tiempo2int(txt[0]);
			tFinal  = tiempo2int(txt[1]);
			// Revisamos que la hora actual este entre el rango
			if ( tInicio <= tActual && tFinal>= tActual) {
				$('.tiempo').parent().removeClass('clase_actual');
				$(this).parent().addClass('clase_actual');
			}
		});
		setTimeout('app.actualizarVista()', 30000);
	}
}
// convierte una tiempo en formato HH:MM a un entero que
// indica los minutos.
//
// Ejemplos: 16:00 => 960, 18:00 => 1,080
// 16:40 => 16*60 + 40 = 960 + 40 = 1,000
function tiempo2int(tiempo) {
	tiempo = $.trim(tiempo);
	tiempo = tiempo.split(':');
	return parseInt(tiempo[0])*60 + parseInt(tiempo[1]);
}

$(function() {
	// Muestra el dia actual
	var d = new Date();
	var numDiaSemana = d.getDay();
	var dia = 'lunes';
	if (numDiaSemana>1 && numDiaSemana<6) {
		dia = app._dia(numDiaSemana);
	}
	app.changePage(dia);
	// desplazamiento izquierdo (siguiente)
	$(document).on(
		'swipeleft',
		'div[data-role="page"]',
		function() {
			var sig = app.siguiente();
			app.changePage(sig);
	});
	// desplazamiento derecho (previo)
	$(document).on(
		'swiperight',
		'div[data-role="page"]',
		function() {
			var sig = app.previo();
			app.changePage(sig);
	});
	//Agregando evento cuando el usuario selecciona un día
	// en especifico
	$(document).on('change', '#diaMostrado', function() {
		app.changePage($(this).val());
	});
	// Mandamos a actualizar la vista cada 30s
	app.actualizarVista();
});
