var crypto = require('crypto');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('../../test.db', function(err){
	if(err)
		console.error("Database could not be opened");
});

// FUNCIONES
exports.findUserByLogin = function(user, callback) {
// 	db.each("SELECT rowid AS id, info FROM lorem", callback);
	
	db.get("SELECT * FROM player WHERE name=$name", { $name : user }, function(err, row) {
		if(err)
			console.error(err);
		else if(row)
			console.log(row);
	});
}

exports.createNewUser = function(user, pass, callback) {
	
}

exports.listUsers = function(callback) {
	db.get("SELECT * FROM player WHERE name=$name", { $name : user }, function(err, row) {
		if(err)
			console.error(err);
		else if(row)
			console.log(row);
	});
}

exports.listCharacters = function(user, callback){
	
}

exports.getCharactersByName = function(name, callback) {
	
}

exports.getCharactersByGame = function(game, callback) {
	
}

exports.listCampaignsByUser = function(user, callback) {
	
}

exports.createGame = function(name, master, callback) {
	
}

exports.createCharacter = function(user, cs, callback) {
	
}

exports.joinGame = function(name, player, callback) {
	
}