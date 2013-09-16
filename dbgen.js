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
		propietario: "leandro",
		descripcion: "Humano barbaro de poco nivel",
		tipo: "PJ",
		informacion:{
			nombre: "Oreganal",
			alineamiento: "chachi",
			nivel: 1,
			edad: 20,
			raza: "Human",
			clase: "barbaro",
			deidad: "ninguna",
			altura: 205,
			peso: 120,
			sexo: "Male",
			idioma: "Klingon"
		},
		atributos: {
			fuerza: 5,
			constitucion: 6,
			inteligencia: 1,
			carisma: 4,
			sabiduria: 4
		}
	}).save();
	
	new Charsheet({
		propietario: "esteban",
		descripcion: "Elfa anciana arquera",
		tipo: "PJ",
		informacion:{
			nombre: "Baby Yoyo",
			alineamiento: "no chachi",
			nivel: 2,
			edad: 3400,
			raza: "Elfo",
			clase: "Ranger",
			deidad: "ninguna",
			altura: 195,
			peso: 95,
			sexo: "Female",
			idioma: "Elfico"
		},
		atributos: {
			fuerza: 5,
			constitucion: 6,
			inteligencia: 1,
			carisma: 4,
			sabiduria: 4
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
