var crypto = require('crypto');
// var mongoose = require('mongoose');
var db = require('./db');

// ******************************************************************************
// *********************************************************** FUNCIONES PUBLICAS

exports.registerUser = function (req, res) {
	var user = req.body.user;
	var pass = req.body.password;
	
// 	console.log(req.body);
	
	// Comprueba que el user y el pass no son vacios
	if(user == null || pass == null) {
		res.json(200, {
			statusCode: '401',
			statusMessage : 'User and password may not be empty'
		});
	}
	
	// Si esta logueado no puede registrarse
	else if(req.session.user_id) {
		res.json(200, {
			statusCode: '401',
			statusMessage : 'Please log out first'
		});
	}
	
	// Busca el usuario en la base de datos
	else {
		db.findUserByLogin(user, function (err, thisUser) {
			if(err) {
				console.log(err);
				res.json(200, {
					statusCode: '500',
					statusMessage : 'Error accessing DB information'
				});
			}
			
			// Comprueba si el usuario existe
			if (thisUser != null /*&& thisUser.password == digest*/) {
				
				res.json(200, {
					statusCode: '401',
					statusMessage : 'The user already exists'
				});
					
			} else {
				// El usuario no existe, se puede crear
				db.createNewUser(user, pass);
				
				req.session.user_id = thisUser.login;
				
				res.json(200, {
					statusCode: '200',
					statusMessage : 'User created successfully'
				});
			}
		});
	}
}

exports.login = function(req, res) {
	var user = req.body.user;
	var pass = req.body.password;
	
	// Busca el usuario en la base de datos
	db.findUserByLogin(user, function (err, thisUser) {
		
		if(err) {
			console.log(err);
			res.json(200, {
				statusCode: '500',
				statusMessage : 'Error accessing login information'
			});
		}
		
		// Calcula resumen SHA1 del password
		var digest = crypto.createHash('sha1').update(pass, 'utf8').digest('hex');
		
		// Comprueba que el usuario existe y que el password es correcto
		if (thisUser != null && thisUser.password == digest) {
			
			// TODO obtener user_id
			req.session.user_id = thisUser.login;

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
			statusMessage : 'You have been logged out correctly'
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

exports.checkAuth = function(req, res, next) {
	// TODO No solo hay que comprobar que existe un user_id, sino que es el correcto
	if (!req.session.user_id) {
		res.json(200, {
			statusCode: '401',
			statusMessage : 'You are not allowed to do that'
		});
	} else {
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		next();
	}
}

exports.listUsers = function(req, res) {
	
	db.listUsers(function(err, data){
		if (err){
			console.log('Error reading User collection');
			res.json(200, {
				statusCode: '500',
				statusMessage : 'Error accessing user database'
			});
		}
		else {
			res.json(200, data);
			res.end();
		}
	});
}