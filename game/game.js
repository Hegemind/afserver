var db = require('../admin/db');

exports.start = function(req, res){
	// TODO Comprobar que usuario logueado es el DJ de la partida actual
	var master = req.session.user_id;
	var name = req.body.name;
	
	if(name) {
		db.createGame(name, master, function(err, game) {
			if(err || !game) {
				res.json(200, {
					statusCode: '401',
					statusMessage : 'Error reading games'
				});
			}
			
			res.json(200, {
				statusCode: '200',
				statusMessage : 'Game "'+name+'" created succesfully'
			});
		});
	} else {
		res.json(200, {
			statusCode: '401',
			statusMessage : 'Game name may not be empty'
		});
	}
};

exports.join = function(req, res){
	var user = req.session.user_id;
	// TODO recuperar informacion de partida para ver cual es la ficha actual
	
	db.getCharsheetsByOwner(user, function(err, data){
		if (err) console.log('Error reading Charsheet collection');
		else {
			res.json(200, data);
			res.end();
		}
	});
};

exports.leave = function(req, res){
	var user = req.session.user_id;
	
	
	// TODO
	res.json(200, {
		statusCode: '404',
		statusMessage : 'Not implemented'
	});
}

exports.end = function(req, res){
	var user = req.session.user_id;
	
	
	// TODO
	res.json(200, {
		statusCode: '404',
		statusMessage : 'Not implemented'
	});
}

exports.list = function(req, res){
	// TODO Comprobar que usuario logueado es ADMIN
	var user = req.session.user_id;
	
	db.listCampaignsByUser(user, function(err, data){
		if (err) {
			res.json(200, {
				statusCode: '401',
				statusMessage : 'Error reading charsheets'
			});
		}
		else {
			res.json(200, data);
			res.end();
		}
	});
}