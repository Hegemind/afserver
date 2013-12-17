var crypto = require('crypto');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Cargar modelos
var User = require('../model/user').User;
var Character = require('../model/Character').Character;
var Game = require("../model/game").Game;

// FUNCIONES
exports.findUserByLogin = function(user, callback) {
	User.findOne({ 'login': user }, callback);
}

exports.createNewUser = function(user, pass, callback) {
	// Calcula resumen SHA1 del password
	var sha = crypto.createHash('sha1');
	sha.update(pass, 'utf8');
	var password = sha.digest('hex');
	
	
	new User({
		login: user,
		password: password
	}).save(callback);
}

exports.listUsers = function(callback) {
	User.find({}, null, callback);
}

exports.listCharacters = function(user, callback){
	Character.find({propietario : user}, callback);
}

exports.getCharactersByName = function(name, callback) {
	Character.findOne({'informacion.nombre': name}, callback);
}

exports.getCharactersByGame = function(game, callback) {
	// TODO devuelve todas las partidas de la base de datos
	Character.find({game: game}, {}, callback);
}

exports.listCampaignsByUser = function(user, callback) {
	// Encuentra partidas en las que el usuario participe como 
	// jugador o master
	Game.find({ $or: [{players: {$all: [user]}}, {master: user}]}, {}, callback);
}

exports.createGame = function(name, master, callback) {
	var newGame = new Game({
		name: name,
		master: master,
	});
	newGame.save(callback);
}

exports.createCharacter = function(user, cs, callback) {
	Character.find({propietario: user, 'informacion.nombre': cs.informacion.nombre}, function(err, data){
		if(data) {
			var msg = "Tried to create a character that already exists";
			console.warn(msg);
			callback(msg, null);
		}
		else
			new Character(cs).save(callback);
		
	});
}

exports.joinGame = function(name, player, callback) {
	
	Game.findOne({name: name}, {}, function(err, game){
		if(err) {
			callback(err, game);
		}
		
		if(game) {
			game.players.push(player);
			game.save();
		}
		
		callback(err, game);
	});
}