exports.sections = require('./sections');

exports.start = function(req, res){
	res.render('start');
};

exports.index = function(req, res){
	var username = req.session.user_id;
	res.render('index', {
		username: username,
		section : [
			{
				name: "Usuarios",
				link: "/users",
				image: "images/placeholder.png"
			},
			{
				name: "Fichas",
				link: "/charsheets",
				image: "images/placeholder.png"
				
			},
			{
				name: "Juegos",
				link: "/games",
				image: "images/placeholder.png"
			}
			
		]
	});
};

exports.login = function(req, res){
	res.render('login');
};

exports.logout = function(req, res){
	res.render('logout');
};
