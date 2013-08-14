var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('./users').User;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// ******************************************************************************
// ******************************************************* DEFINICION DE ESQUEMAS

var userSchema = new mongoose.Schema({
	login: String,
	password: String
});

// Creacion de los modelos
var User = mongoose.model('User', userSchema);

// Exportarlos para que esten disponibles en las aplicaciones
exports.User = User;

// ******************************************************************************
// ******************************************************* FUNCIONES

exports.findUserByLogin = function(user, callback) {
	User.findOne({ 'login': user }, callback);
}

exports.createNewUser = function(user, pass) {
	// Calcula resumen SHA1 del password
	var sha = crypto.createHash('sha1');
	sha.update(pass, 'utf8');
	var password = sha.digest('hex');
	
	
	new User({
		login: user,
		password: password
	}).save();
}

exports.listUsers = function(callback) {
	User.find({}, null, callback);
}