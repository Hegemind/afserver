var db = require('../admin/db');

/**
 * Devuelve todos las fichas del sistema
 */
exports.list = function(req, res){
	// TODO Comprobar que usuario logueado es ADMIN
	var user = req.param.userid;
	
	db.listCharsheets(user, function(err, data){
		if (err) {
			res.json(200, {
				statusCode: '401',
				statusMessage : 'Error reading charsheets' + user
			});
		}
		else {
			res.json(200, data);
			res.end();
		}
	});
};

/**
 * Devuelve las fichas asociadas a una partida
 */
exports.listByGame = function(req, res){
	// TODO Comprobar que usuario logueado es el DJ de la partida actual
	var user = req.session.user_id;
	var game = req.session.game_id;
	
	Charsheet.find({}, {}, function(err, data){
		if (err){
			res.json(200, {
				statusCode: '401',
				statusMessage : 'Error reading charsheets'
			});
		}
		else {
			res.json(200, data);
			res.end();
		}
	});
};

/**
 * Devuelve la ficha del usuario actual en la partida actual
 */
exports.get = function(req, res){
	var name = req.params.id;
	console.log("name: "+name);
// 	db.getCharsheetsByOwner(user, function(err, data){
	db.getCharsheetsByName(name, function(err, data){
		console.log("\ndata: " + data);
		if (!data || err) {
			res.json(200, {
				statusCode: '401',
				statusMessage : 'Error reading charsheet ' + name,
				data : data
			});
		}
		else {
			res.json(200, data);
			res.end();
		}
	});
};

/**
 * Crea una nueva ficha
 */
exports.create = function(req, res){
	var user = req.session.user_id;
	var charsheet = req.body;
	
	db.createCharsheet(user, charsheet);
}