var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/afserverdb');

var Charsheet = require("./charsheet").Charsheet;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	resetDB(); // Elimina bbdd
});

function resetDB(){
	// Vaciar colecciones
	Charsheet.remove({}, function(err){
		console.log('Collection erased from DB.');
		
		createSomeCharsheets(); // Para insertar documentos
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


