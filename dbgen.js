var mongoose = require('mongoose');
var crypto = require('crypto');
var sha1 = crypto.createHash('sha1');

// Importar modelos
var Charsheet = require("./admin/models/charsheet").Charsheet;
var User = require("./admin/models/user").User;
var Game = require("./admin/models/game").Game;

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
	User.remove({}, function(err){
		console.log('Users erased');
		createUsers();
	});
	
	Charsheet.remove({}, function(err){
		console.log('Charsheets erased');
		createSomeCharsheets();
	});
	
	Game.remove({}, function(err){
		console.log('Games erased');
		createGames();
	});
}

function createSomeCharsheets(){
	
	new Charsheet({
		owner: "leandro",
		personalInfo:{
			name: "My Full Name",
			age: 20,
			gender: "Male",
			race: "Human",
			language: "Klingon"
		},
		stats: {
			ST: 5,
			DX: 6,
			IQ: 1,
			HT: 4
		}
	}).save();
	
	new Charsheet({
		owner: "esteban",
		personalInfo:{
			name: "Mi nombre completo",
			age: 40,
			gender: "Female",
			race: "Elf",
			language: "Elfish"
		},
		stats: {
			ST: 4,
			DX: 3,
			IQ: 4,
			HT: 5
		}
	}).save();
	
	console.log("Charsheets created");
};

function createUsers() {
	
	newUser("marijose", "123");
	newUser("leandro", "123");
	newUser("esteban", "abc");
	newUser("natalia", "123");
	
	function newUser(login, pass) {
		var password = crypto.createHash('sha1').update(pass, 'utf8').digest('hex');
		new User({
			login: login,
			password: password
		}).save();
	}
	
	console.log("Users created");
}

function createGames() {
	var f = new Game({
		name: "Mi primer juego",
		master: "esteban",
	});
	f.players.push("leandro");
	f.players.push("marjiose");
	f.players.push("natalia");
	f.save();
	
	var g = new Game({
		name: "Aventuras SL",
		master: "leandro",
	});
	g.players.push("esteban");
	g.players.push("marjiose");
	g.players.push("natalia");
	g.save();
	
	console.log("Games created");
}
