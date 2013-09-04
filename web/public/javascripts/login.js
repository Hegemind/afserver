$(document).ready(function() {
	
	$('.alert').hide();
	
	function sendLogin() {
		$('.alert').hide();
		
		$.ajax({
			url: "/api/login/",
			type: "POST",
// 			data: $('#loginForm').serialize()
			data: {user: "leandro", password: "123n"}
			//contentType: 'application/x-www-form-urlencoded'
		}).done(function(data) {
			var statusCode = data.statusCode;
			var msg = data.statusMessage
			
		}).fail(function(data) {
			$('#errorAlert').show();
			//alert("Couldn't log in :(\n"+JSON.stringify(data));
		});
		return false;
	}
	
	$('#loginButton').click(sendLogin); 
	
	
	
// 	$("#loginForm").submit( function () {    
// 		$.ajax({
// 			url: '/api/login',
// 			type: 'post',
// 			dataType: 'json'
// 		}).done(function(data) {
// 				var json = JSON.parse(data)
// 				//JSON.stringify()
// 				alert("hola");
// 				
// 		});
// 		
// 	});  
});


