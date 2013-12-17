var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db', function(err){
        if(err)
                console.error("Database could not be opened");
});


db.serialize(function() {
	db.each("SELECT * FROM character", function(err, row) {
			if(err)
					console.error(err);
			else
					console.log(row);
	});

});

db.close();