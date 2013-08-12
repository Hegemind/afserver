var mongoose = require('mongoose');
var crypto = require('crypto');
var sha1 = crypto.createHash('sha1');

// Importar modelos
var Charsheet = require("./game/charsheet").Charsheet;
var User = require("./admin/users").User;


// Conectar a la base de datos
mongoose.connect('mongodb://localhost/afserverdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	// Resetear base de datos
	resetDB();
});

function resetDB(){
	// Vaciar colecciones
	Charsheet.remove({}, function(err){
		console.log('Collection "Charsheet" erased from DB.');
		
		createSomeCharsheets();
	});
	
	User.remove({}, function(err){
		console.log('Collection "Users" erased from DB.');
		
		createUsers();
	});
}

function createSomeCharsheets(){
	
	new Charsheet({
		name: "My Full Name",
		age: 20,
		gender: "Male",
		race: "Human",
		language: "Klingon",
		str: 5,
		con: 6,
		agi: 1,
		pow: 4,
		dex: 2,
		cha: 3,
		int: 5,
	}).save();
	
	new Charsheet({
		name: "Mi nombre completo",
		age: 40,
		gender: "Female",
		race: "Elf",
		language: "Elfish",
		str: 4,
		con: 3,
		agi: 4,
		pow: 5,
		dex: 1,
		cha: 7,
		int: 3,
	}).save();
	
	console.log("Charsheets created");
};

function createUsers() {
	
	newUser("leandro", "123");
	newUser("esteban", "abc");
	
	function newUser(login, pass) {
		var password = crypto.createHash('sha1').update(pass, 'utf8').digest('hex');
		new User({
			login: login,
			password: password
		}).save();
	}
	
	console.log("Users created");
}

