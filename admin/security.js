var users = require("./users");
var User = users.User;

var crypto = require('crypto');

exports.checkAuth = function(req, res, next) {
	if (!req.session.user_id) {
		res.json(200, {
			statusCode: '401',
			statusMessage : 'You are not authorized to access this operation'
		});
	} else {
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		next();
	}
}

exports.login = function(req, res) {
	var user = req.body.user;
	var pass = req.body.password;
	
	// Busca el usuario en la base de datos
	User.findOne({ 'login': user }, function (err, thisUser) {
		
		if(err) {
			console.log(err);
			
			res.json(200, {
				statusCode: '500',
				statusMessage : 'Error accessing login information'
			});
		}
		
		// Calcula resumen SHA1 del password
		var digest = crypto.createHash('sha1').update(pass, 'utf8').digest('hex')
		
		// Comprueba que el usuario existe y que el password es correcto
		if (thisUser != null && thisUser.password == digest) {
			
			// TODO obtener user_id
			req.session.user_id = 123456;

			res.json(200, {
				statusCode: '200',
				statusMessage : 'You have been logged in correctly'
			});
		} else {
			// El usuario no existe o el password no es correcto
			// TODO discriminar errores?
			res.json(200, {
				statusCode: '401',
				statusMessage : 'You are not authorized to log in'
			});
		}
	});
	
	
}

exports.logout = function (req, res) {
	// Si el usuario esta logueado lo desloguea
	if(req.session.user_id) {
		delete req.session.user_id;
		res.json(200, {
			statusCode: '200',
			statusMessage : 'You have been logged in correctly'
		});
	} 
	// Si no esta logueado muestra error
	else {
		res.json(200, {
			statusCode: '401',
			statusMessage : 'You were not logged in'
		});
	}
}