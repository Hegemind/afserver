exports.findUserByLogin = function(db, user, callback) {
// 	db.each("SELECT rowid AS id, info FROM lorem", callback);
	
	db.get("SELECT * FROM player WHERE name=$name", { $name : user }, function(err, row) {
		if(err)
			console.error(err);
		else if(row)
			console.log(row);
		else
			console.warn('Player ', user, ' not found');
		callback(err, row);
	});
}

exports.listUsers = function(db, callback) {
	db.get("SELECT * FROM player WHERE name=$name", { $name : user }, function(err, row) {
		if(err)
			console.error(err);
		else if(row)
			console.log(row);
	});
}

exports.createNewUser = function(db, user, pass, callback) {
	// TODO
}