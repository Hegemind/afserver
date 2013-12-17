var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');


db.serialize(function() {

// 	var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
// 	for (var i = 0; i < 10; i++) {
// 		stmt.run("Ipsum " + i);
// 	}
// 	stmt.finalize();
// 
// 	db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
// 		console.log(row.id + ": " + row.info);
// 	});
	
// 	db.each("select * from player", function(err, row) {
// 		if(err)
// 			console.error(err);
// 		else
// 			console.log(row);
// 	});
	
	
	user="kkk";
	db.get("SELECT * FROM player WHERE name=$name", { $name : user }, 	function(err, row) {
		if(err)
			console.error(err);
		else if(row)
			console.log(row);
		else
			console.warn('Player ', user, ' not found');
	});

// 	db.each("select * from character", function(err, row) {
// 		if(err)
// 			console.error(err);
// 		else
// 			console.log(row);
// 	});

// 	db.each("select * from attribute_type", function(err, row) {
// 		if(err)
// 			console.error(err);
// 		else
// 			console.log(row);
// 	});
});


db.close();