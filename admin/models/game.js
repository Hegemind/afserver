var mongoose = require('mongoose');

var states = 'created running stopped deleted'.split(' ')

exports.Game = mongoose.model('Game', new mongoose.Schema({
	name: String,
	master: String,
	players: [String],
	settings: {
		state: { type: String, enum: states, default: "created" },
		public: { type: Boolean, default: "true" }
	}
	
}));