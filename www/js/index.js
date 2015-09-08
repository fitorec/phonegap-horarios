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
		this.revisarHorarios();
	},
	revisarHorarios: function() {
		console.log("corriendo la funcion de prueba");
		var today=new Date();
		var horas=today.getHours();
		var diaSeleccionado = $('#dia-a-mostrar').val();
		
		$('tr.activa').removeClass('activa');
		$('#dia_' + diaSeleccionado + ' tbody tr th').each(function(key, value) {
			console.log($(this).text());
		});
		//setTimeout("app.revisarHorarios()", 30000);
		setTimeout("this.revisarHorarios()", 1000);
	}
};
