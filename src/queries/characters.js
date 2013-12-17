exports.getCharactersById = function(db, id, callback) {
	db.get("SELECT * FROM character WHERE id=$id", { $id : id }, function(err, row) {
		if(err)
			console.error(err);
		else if(row)
			console.log(row);
		else
			console.warn('Character ', id, ' not found');
		callback(err, row);
	});
}

exports.createCharacter = function(db, char, callback) {
	// TODO obtener ultimo ID de la tabla
// 	var id=3
// 	
// 	db.run("INSERT INTO character VALUES()", {
// 		$id: 2,
// 		$name: "bar"
// 	});
// 	
// 	db.get("SELECT * FROM character WHERE id=$id", { $id : id }, function(err, row) {
// 		if(err)
// 			console.error(err);
// 		else if(row)
// 			console.log(row);
// 		else
// 			console.warn('Character ', id, ' not found');
// 		callback(err, row);
// 	});
}

exports.getAllCharactersByUserId = function(db, userid, callback) {
	db.all("SELECT * FROM character WHERE player_id=$userid", { $userid : userid },	function(err, row) {
		if(err)
			console.error(err);
		else if(row)
			console.log(row);
		else
			console.warn('Player with id ', userid, ' not found');
		callback(err, row);
	});
}