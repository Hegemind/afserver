var mongoose = require('mongoose');

exports.Game = mongoose.model('Game', new mongoose.Schema({
	name: String,
	master: String,
	players: [String]
}));