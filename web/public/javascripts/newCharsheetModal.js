
function newCharsheetModal_disableOwnerSelection(){
	$('#ownerSelection').prop({disabled: true});
}

function newCharsheetModal_enableOwnerSelection(){
	$('#ownerSelection').prop({disabled: false});
}

function newCharsheetModal_dismiss() {
	// Borrar todos los campos
	$('#inputName').val('');
	$('#inputAge').val('');
	$('#inputRace').val('Human');
	$('#inputDescription').val('');
	$('#inputOwner').val('');
	$('#inputName').val('');
	
	$('#newCharsheetModal').modal('hide');
}

function newCharsheetModal_save() {
	// Validar y enviar a base de datos
	if(validate() === "") {
		persist();
	}
	
	function validate(){
		// Limpiar warnings y errores
		$('#inputName').removeClass("has-error");
		
		// Requisitos: nombre y raza
		var name = $('#inputName').val();
		
		if(name === ""){
			$('#inputName').addClass("has-error");
			return "Name must be set";
		}
		
		return "";
	}
	
	function persist(){
		$.ajax({
			url: "/api/charsheet/",
			type: "POST",
			data: $('#characterForm').serialize()
		})
		.done(function(data) {
			if(data.statusCode !== "200"){
				alert(data.statusCode);
			} else {
				newCharsheetModal_dismiss();
			}
		})
		.fail(function(data) {
			window.location.replace("/error");
		});
	}
}

function populatePlayerList(){
	$.ajax("/api/user/list/")
	.done(function(data) {
		fillSelect(data);
	})
	.fail(function(data) {
		window.location.replace("/error");
	});
	return false;
	
	function fillSelect(data) {
		var r = new Array(), j = -1;
		for (var key = 0, size = data.length; key < size; key++){
			var name = data[key].login;
			r[++j] ='<option value=\''+name+'\'>'+name+'</option>';
		}
		
		// Rellenar el 
		$('#inputOwner')[0].innerHTML = r.join(''); 
	}
	
	$('#tab1').tabs('select', 0);
}