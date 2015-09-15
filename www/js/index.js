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
		$(document).on( "swipeleft swipedown swiperight swipeup", "table", function(e){
			var diaAMostrar = parseInt($('#dia-a-mostrar').val());
			if(e.type == 'swipeleft' || e.type == 'swipedown') {
				diaAMostrar = (diaAMostrar==5)? 1: diaAMostrar + 1;
			}
			if(e.type == 'swiperight' || e.type == 'swipeup') {
				diaAMostrar = (diaAMostrar==1)? 5: diaAMostrar - 1;
			}
			$('#dia-a-mostrar').val(diaAMostrar).change();
		});
		//Obtenemos el día a mostrar inicialmente(valor entre 1 y 5)
		var d = new Date();
		var dia = d.getDay();
		if(dia<1 || dia>5) {
			dia = 1;
		}
		$('#dia-a-mostrar').val(dia);
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
			// Y agregar la clase "activa" sobre el padre del th es decir el tr
			// $(this).closest('tr').addClass('activa');
		});
		//Aqui se debe de actualizar el elemento con id hora
		// .........................................
		// $('#hora').text('HH:MM');
		//Mandamos a llamar a la función actualizarVista en 30 segundos (30mil milisegundos)
		setTimeout("app.actualizarVista()", 30000);
	}
};
