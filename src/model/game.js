var mongoose = require('mongoose');

var states = 'open started closed deleted'.split(' ')

exports.Game = mongoose.model('Game', new mongoose.Schema({
	name: String,
	master: String,
	players: [String],
	gameSystem: String,
	settings: {
		state: { type: String, enum: states, default: "open" },
		public: { type: Boolean, default: "true" },
		customRules: {
			skills: [String],
			objects: [String],
			States: [String]
		}
	}
}));