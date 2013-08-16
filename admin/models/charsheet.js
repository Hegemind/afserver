var mongoose = require('mongoose');

exports.Charsheet = mongoose.model('Charsheet', new mongoose.Schema({
	owner: String,
	personalInfo: {
		name: String,
		age: Number,
		gender: String,
		race: String,
		language: String
	},
	stats: {	// Estilo GURPS
		ST: Number,
		DX: Number,
		IQ: Number,
		HT: Number
	}
}));