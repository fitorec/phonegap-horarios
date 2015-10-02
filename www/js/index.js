var app = {
	// Constructor de la aplicacion
	initialize: function() {
		$('#dia-a-mostrar').change(function() {
			$('.tabla_horario').hide();
			$('#dia_' + $(this).val()).fadeIn('slow');
		});
		//Evento al desplazar una tabla.
		// ver ejemplo en:
		//   http://demos.jquerymobile.com/1.3.2/examples/panels/panel-swipe-open.html#&ui-state=dialog&ui-state=dialog
		$(document).on( "swipeleft swiperight", "table", function(e) {
			var diaAnterior = parseInt($('#dia-a-mostrar').val());
			var diaAMostrar = diaAnterior;
			var fecha = new Date($('#dia-a-mostrar').data('fecha'));
			if(e.type == 'swipeleft') {
				diaAMostrar = (diaAMostrar==5)? 1: diaAMostrar + 1;
			}
			if(e.type == 'swiperight') {
				diaAMostrar = (diaAMostrar==1)? 5: diaAMostrar - 1;
			}
			var fechaNueva = new Date(fecha);
			fechaNueva.setDate(fecha.getDate() + (diaAMostrar - diaAnterior));
			/////////////
			navigator.notification.beep(5);
			navigator.notification.vibrate(25000);
			$('#dia-a-mostrar').val(diaAMostrar).change();
		});
		//Obtenemos el día a mostrar inicialmente(valor entre 1 y 5)
		var d = new Date();
		var dia = d.getDay();
		if(dia<1 || dia>5) {
			dia = 1;
		}
		$('#dia-a-mostrar').val(dia).data('fecha', d.toDateString());
		$('#dia_' + dia).fadeIn('slow');
		//Mostrando la fecha actual
		var meses = new Array(
				"Ene","Feb","Mar","Abr","May","Jun","Jul",
				"Ago","Sept","Oct","Nov","Dic"
			);
		var fechaStr = d.getDate() + " de " + meses[d.getMonth()];
		$('#fecha').text(fechaStr);
		//
		this.actualizarVista();
	},
	/**
	 * Este metodo se encarga de actualizar la vista cada 30segundos
	 * 
	 *  - Activa la fila con clase Actual
	 *  - Actualiza el reloj
	 */
	actualizarVista: function() {
		//Obtenemos la fecha de hoy(today) y la horaActual
		var today=new Date();
		var horaActual = parseInt(today.getHours());
		//A todas las filas de la tabla(tr) le quitamos la clase CSS activa
		$('tr.activa').removeClass('activa');
		// Para cada th que este en el cuerpo de las tablas
		// Nota: Cada th contiene la horas en formato: horaInicial - horaFinal
		$('tbody tr th').each(function() {
			var horarios = $(this).text().split('-');
			var horaInicial = parseInt($.trim(horarios[0]));
			var horaFinal = parseInt($.trim(horarios[1]));
			//Aqui comparar horaActual con horaInicial y horaFinal
			if (horaActual >= horaInicial && horaActual < horaFinal ) {
				$(this).closest('tr').addClass('activa');
			}
			/**
			 * Va a vibrar cuando faltan 10 minutos para la hora inicial de la siguiente clase
			 * http://docs.phonegap.com/es/1.0.0/phonegap_notification_notification.md.html
			 * 
			 */
			if ((horaActual + 1) == horaInicial && parseInt(today.getMinutes()) == 45) {
				navigator.notification.beep(5);
				navigator.notification.vibrate(25000);
			}
		});
		//Aqui se debe de actualizar el elemento con id hora
		// .........................................
		var horaStr = dosDigitos(today.getHours()) + ':' + dosDigitos(today.getMinutes());
		$('#hora').text(horaStr);
		//Mandamos a llamar a la función actualizarVista en 30 segundos (30 segundos)
		setTimeout("app.actualizarVista()", 30000);
	}
};

function dosDigitos(num) {
	if (num<10) {
		return '0' + num;
	}
	return num;
}
