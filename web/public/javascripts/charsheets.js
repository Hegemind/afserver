$(document).ready(function() {
	
	$.ajax("/api/charsheet/list/")
	.done(function(data) {
		// Renderizar pagina con los datos
		fillTable(data);
	})
	.fail(function(data) {
		window.location.replace("/error");
	});
	return false;
	
	function fillTable(data) {
		var r = new Array(), j = -1;
		for (var key = 0, size = data.length; key < size; key++){
			r[++j] ='<tr><td>';
			r[++j] = data[key].informacion.nombre;
			r[++j] = '</td><td>';
			r[++j] = data[key].descripcion;
			r[++j] = '</td><td>';
			r[++j] = data[key].game;
			r[++j] = '</td><td>';
			r[++j] = data[key].since;
			r[++j] = '</td><td>';
			r[++j] = data[key].partida;
			
			// Add option button at the end of the row
			r[++j] = '</td><td><div class="btn-group"><a href="#" class="btn dropdown-toggle" data-toggle="dropdown"><i class="icon-chevron-down"></i></a><ul class="dropdown-menu"> <li><a href="#">Copiar</a> </li><li><a href="#">Borrar</a> </li><li><a href="#">Imprimir</a> </li></ul></div>';
			r[++j] = '</td></tr>';
		}
		var infoNumberCharsheets = "You have "+data.length+" charsheets.";
		$('#infoNumberCharsheets')[0].innerHTML = infoNumberCharsheets;
		
		
		$('#table_data')[0].innerHTML = r.join(''); 
	}
});


