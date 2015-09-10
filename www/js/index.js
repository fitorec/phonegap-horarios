var app = {
	// Application Constructor
	$selectorDia: null, 
	initialize: function() {
		this.$selectorDia = $('#dia-a-mostrar');
		this.$selectorDia.change(function() {
			$('.tabla_horario').hide();
			$('#dia_' + $(this).val()).fadeIn('slow');
		});
		//Codigo al iniciar phonegap
		var d = new Date();
		var dia = d.getDay();
		if(dia<1 || dia>5) {
			dia = 1;
		}
		this.$selectorDia.val(dia);
		$('#dia_' + dia).fadeIn('slow');
		//Mostrando la fecha actual
		var meses = new Array(
				"Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
				"Agosto","Septiembre","Octubre","Noviembre","Diciembre"
			);
		var fechaStr = d.getDate() + " de " + meses[d.getMonth()];
		$('#fecha').text(fechaStr);
		//
		this.actualizarVista();
	},
	actualizarVista: function() {
		console.log("Corriendo la funcion que detecta los horarios");
		var today=new Date();
		var horaActual = parseInt(today.getHours());
		var diaSeleccionado = $('#dia-a-mostrar').val();
		
		$('tr.activa').removeClass('activa');
		$('#dia_' + diaSeleccionado + ' tbody tr th').each(function() {
			var horarios = $(this).text().split('-');
			var horaInicial = parseInt($.trim(horarios[0]));
			var horaFinal = parseInt($.trim(horarios[1]));
			//Aqui comparar horaActual con horaInicial y horaFinal
			// Y agregar la clase "activa"
		});
		//Aqui se debe de actualizar el elemento con id hora
		// .........................................
		//Mandamos a llamar a la función actualizarVista
		setTimeout("app.actualizarVista()", 300000);
	}
};
