var usersDBAccess = require("./users");

exports.login = function(req, res) {
// 	if (!comprobarCamposHTTP(req)) {
		// Solicitamos la autenticacion al adaptador
// 		if(req.get('HashType')==='MD5')
// 			usersDBAccess.authenticate(req.get('User-Agent'), req.get('apiKey'), req.get('Date'), accion);
// 		else
// 			usersDBAccess.authenticateSHA(req.get('User-Agent'), req.get('apiKey'), req.get('Date'), accion);
		
		function accion(cookie) {

			//PARA PRUEBAS CON RESTCLIENT usersDBAccess.authenticate(req.get('User'), digest, req.get('Dates'), function(cookie) {

			// Se devuelve una respuesta en funcion del resultado de la peticion
			if (cookie.length) {
				res.writeHead(200, {
					"Content-Type": "text/html",
					"Cookie": cookie
				});
				// PARA PRUEBAS CON RESTCLIENT res.write("Bienvenido de nuevo " + req.get('User'));
				res.write("Bienvenido " + req.get('User-Agent'));

				res.end();
			} else {
				res.json(402, {
					status: 'Authentication error. Usuario o contraseña incorrectos'
				});
				res.end();
			}
		}
// 	} else {
		res.json(402, {
			statusCode: '404',
			statusMessage : 'Not found'
		});
		res.end();
// 	}
}

// Comprueba que no falta ningun campo necesario para la autenticacion

function comprobarCamposHTTP(req) {
	return (typeof req.get('Date') === 'undefined') || (typeof req.get('apiKey') === 'undefined') || (typeof req.get('User-Agent') === 'undefined');
}

