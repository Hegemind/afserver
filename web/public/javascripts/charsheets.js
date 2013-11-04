$(document).ready(function() {
	
	$('#myTab a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});
	
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
			var nombre = data[key].informacion.nombre
			r[++j] ='<tr id="'+nombre+'" class="charsheet-row"><td><a href="#">';
			r[++j] = nombre;
			r[++j] = '</a></td><td>';
			r[++j] = data[key].tipo;
			r[++j] = '</td><td>';
			r[++j] = data[key].descripcion;
			r[++j] = '</td><td>';
			r[++j] = data[key].game;
			r[++j] = '</td><td>';
			r[++j] = data[key].since;
			r[++j] = '</td><td>';
			r[++j] = data[key].partida;
			
			// Add option buttons at the end of the row
			r[++j] = '</td><td><div class="row-buttons">';
			r[++j] = '<button type="button" class="btn btn-primary btn-xs">';
			r[++j] = '	<span class="glyphicon glyphicon-edit"></span>';
			r[++j] = '</button>';
			r[++j] = '<button type="button" class="btn btn-danger btn-xs">';
			r[++j] = '	<span onclick="deleteCharacter(this)" class="glyphicon glyphicon-minus-sign"></span>';
			r[++j] = '</button>';
			r[++j] = '</div></td></tr>';
		}
		var infoNumberCharsheets = "You have "+data.length+" charsheets.";
		$('#infoNumberCharsheets')[0].innerHTML = infoNumberCharsheets;
		
		
		$('#table_data')[0].innerHTML = r.join(''); 
	}
});

function deleteCharacter(id) {
	$.ajax({
		url: "/api/charsheet/",
		type: "DELETE",
		data: '{name: '+id.parentNode.parentNode.parentNode.parentNode.id+'}'
	})
	.done(function(data) {
		if(data.statusCode !== "200"){
			alert(data.statusMessage);
		}
	})
	.fail(function(data) {
		window.location.replace("/error");
	});
}

function editCharacter(id) {
	alert("editando: "+id);
}

