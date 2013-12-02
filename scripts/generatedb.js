var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../test.db', function(err){
	if(err)
		console.error("Database could not be opened");
});


db.serialize(function() {
	db.each("SELECT * FROM user", function(err, row) {
		if(err)
			console.error(err);
		else
			console.log(row);
	});
	
	
// 	var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
// 	for (var i = 0; i < 10; i++) {
// 		stmt.run("Ipsum " + i);
// 	}
// 	stmt.finalize();
// 
// 	db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
// 		console.log(row.id + ": " + row.info);
// 	});
});

db.close();