var mongoose = require('mongoose');

exports.Charsheet = mongoose.model('Charsheet', new mongoose.Schema({
	propietario: String,
	descripcion: String,
	tipo: String,
	partida: String,
	informacion: {
		nombre: String,
		alineamiento: String,
		nivel: Number,
		edad: Number,
		raza: String,
		clase: String,
		deidad: String,
		altura: Number,
		peso: Number,
		sexo: String,
		idioma: String
	},
	atributos: {
		fuerza: Number,
		constitucion: Number,
		inteligencia: Number,
		carisma: Number,
		sabiduria: Number
	}
}));

