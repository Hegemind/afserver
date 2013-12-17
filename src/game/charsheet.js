var db = require('../queries/db');

/**
 * Devuelve todos las fichas del sistema
 */
exports.list = function(req, res){
	// TODO Comprobar que usuario logueado es ADMIN
	var user = req.params.userid;
	db.listCharacters(user, function(err, data){
		if (!data || err) {
			res.json(200, {
				statusCode: '401',
				statusMessage : 'No Characters for user ' + user
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
	
	db.getCharactersByName(name, function(err, data){
		if (!data) {
			res.json(200, {
				statusCode: '401',
				statusMessage : 'Error reading Character ' + name
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
	
	Character.find({}, {}, function(err, data){
		if (err){
			res.json(200, {
				statusCode: '401',
				statusMessage : 'Error reading Characters'
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
	var user = req.params.userid;
	var Character = req.body;
	
	db.createCharacter(user, Character, function(err){
		if (err){
			res.json(200, {
				statusCode: '401',
				statusMessage : 'Error saving a Character'
			});
		}
		else {
			res.json(200, {
				statusCode: '200',
				statusMessage : 'Character saved correctly'
			});
		}
	});
}