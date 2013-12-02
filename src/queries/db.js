var db = require("./sqlite/db.js");

// INTERFAZ de PERSISTENCIA

exports.findUserByLogin = function(user, callback) {
	db.findUserByLogin("leandro", callback);
}

exports.createNewUser = function(user, pass, callback) {
	db.createNewUser(user, pass, callback);
}

exports.listUsers = function(callback) {
	db.listUsers(callback);
}

exports.listCharsheets = function(user, callback){
	db.listCharsheets(user, callback);
}

exports.getCharsheetsByName = function(name, callback) {
	db.getCharsheetsByName(name, callback);
}

exports.getCharsheetsByGame = function(game, callback) {
	db.getCharsheetsByGame(game, callback);
}

exports.listCampaignsByUser = function(user, callback) {
	db.listCampaignsByUser(user, callback);
}

exports.createGame = function(name, master, callback) {
	db.createGame(name, master, callback);
}

exports.createCharsheet = function(user, cs, callback) {
	db.createCharsheet(user, cs, callback);
}

exports.joinGame = function(name, player, callback) {
	db.joinGame(name, player, callback);
}