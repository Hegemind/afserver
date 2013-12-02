var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../test.db', function(err){
	if(err)
		console.error("Database could not be opened");
});


db.serialize(function() {
	
	destruirTablas();
	construirTablas();
	
	var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
	for (var i = 0; i < 10; i++) {
		stmt.run("Ipsum " + i);
	}
	stmt.finalize();

	db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
		console.log(row.id + ": " + row.info);
	});
});

db.close();




function destruirTablas() {
	// Todos los DROP
	db.run("DROP SCHEMA IF EXISTS system;", function (err){
		if(err)
			console.error("No pude borrar el esquema system: "+err);
		else
			console.log("Borrada el esquema system");
	});
	
	db.run("DROP TABLE IF EXISTS `system`.`game_system`", function (err){
		if(err)
			console.error("No pude borrar la tabla: "+err);
		else
			console.log("Borrada la tabla");
	});

	
}

function construirTablas() {
	db.run("CREATE SCHEMA IF NOT EXISTS `system` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;", function (err){
		if(err)
			console.error("No pude crear el esquema system");
		else
			console.log("Creado el c system");
	});
	db.run("CREATE TABLE IF NOT EXISTS `system`.`game_system` (\
	`id` INT NOT NULL ,\
	`name` VARCHAR(32) NOT NULL ,\
	PRIMARY KEY (`id`) );", function(err){
		if(err)
			console.error("No pude crear la tabla: "+err);
		else 
			console.log("Creada la tabla");
	});
}