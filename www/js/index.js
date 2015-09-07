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
	}
};
