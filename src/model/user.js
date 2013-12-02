var mongoose = require('mongoose');

exports.User = mongoose.model('User', new mongoose.Schema({
	login: String,
	password: String
}));