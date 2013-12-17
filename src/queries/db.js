var crypto = require('crypto');
var sqlite3 = require('sqlite3').verbose();
var players = require('./players');
var characters = require('./characters');

var db = new sqlite3.Database('test.db', function(err){
	if(err)
		console.error("Database could not be opened");
});

exports.findUserByLogin = function(req, res) {
	var user = req.params.userid;
	players.findUserByLogin(db, user, function(err, row){
		if (!row) {
			res.json(200, {
				statusCode: '401',
				statusMessage : 'Error reading character ' + name
			});
		}
		else {
			res.json(200, row);
			res.end();
		}
	});
}

exports.listUsers = function(callback) {
	players.listUsers(db, callback);
}

exports.createNewUser = function(user, pass, callback) {
	players.createNewUser(db, user, pass, callback);
}

exports.listCharacters = function(user, callback){
	
}

exports.getCharactersById = function(req, res) {
	var id = req.params.id;
	
	characters.getCharactersById(db, id, function(err, data){
		if (!data) {
			res.json(200, {
				statusCode: '401',
				statusMessage : 'Error reading character ' + id
			});
		}
		else {
			res.json(200, data);
			res.end();
		}
	});
}

exports.createCharacter = function(user, cs, callback) {
	
}

exports.getCharactersByGame = function(game, callback) {
	
}

exports.listCampaignsByUser = function(user, callback) {
	
}

exports.createGame = function(name, master, callback) {
	
}

exports.joinGame = function(name, player, callback) {
	
}