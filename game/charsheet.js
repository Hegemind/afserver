var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// ******************************************************************************
// ******************************************************* DEFINICION DE ESQUEMAS

var charsheetSchema = new mongoose.Schema({
	name: String,
	age: Number,
	gender: String,
	race: String,
	language: String,
	str: Number,
	con: Number,
	agi: Number,
	pow: Number,
	dex: Number,
	cha: Number,
	int: Number,
});

// Creacion de los modelos
var Charsheet = mongoose.model('Charsheet', charsheetSchema);

// Exportarlos para que esten disponibles en las aplicaciones
exports.Charsheet = Charsheet;

// ******************************************************************************
// ****************************************************************** OPERACIONES

exports.getMyCharsheets = function(req, res){
	// TODO Check user credentials
	
	// TODO Obtain charsheets for current user
	
	// Return data
	Charsheet.find({}, null, function(err, data){
		if (err) console.log('Error reading Charsheet collection');
		else {
			res.json(200, data);
			res.end();
		}
	});
};

exports.getCurrentCharsheet = function(req, res){
	// TODO Check user credentials
	
	// TODO Obtain charsheets for current user
	
	// Return data
	Charsheet.findOne({}, {}, { sort: { 'fecha' : -1 } }, function(err, data){
		if (err) console.log('Error reading Charsheet collection');
		else {
			res.json(200, data);
			res.end();
		}
	});
};


// Devuelve el ultimo tiempo almacenado
// function getUltimoTiempo(callback) {
// 	Tiempo.findOne({}, {}, { sort: { 'fecha' : -1 } }, callback);
// }
