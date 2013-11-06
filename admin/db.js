var crypto = require('crypto');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Cargar modelos
var User = require('./models/user').User;
var Charsheet = require('./models/charsheet').Charsheet;
var Game = require("./models/game").Game;

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

exports.listCharsheets = function(user, callback){
	Charsheet.find({}, {}, callback);
}

exports.getCharsheetsByOwner = function(user, callback) {
	Charsheet.find({owner: user}, {},/* { sort: { 'fecha' : -1 } },*/ callback);
}

exports.getCharsheetsByName = function(name, callback) {
	Charsheet.find({ 'informacion.nombre' : name}, {}, callback);
}

exports.createCharsheet = function(user, cs) {
	new Charsheet({
		owner: user,
		personalInfo: cs.personalInfo,
		stats: cs.stats
	}).save();
}

exports.getCharsheetsByGame = function(game, callback) {
	// TODO devuelve todas las partidas de la base de datos
	Charsheet.find({game: game}, {}, callback);
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