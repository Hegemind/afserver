exports.start = function(req, res){
	res.render('start');
};

exports.index = function(req, res){
	var username = req.session.user_id;
	res.render('index', {
		username: username,
		section : [
			{
				name: "Seccion 1",
				link: "/section1",
				image: "images/placeholder.png"
			},
			{
				name: "Seccion 2",
				link: "/section2",
				image: "images/placeholder.png"
				
			},
			{
				name: "Seccion 3",
				link: "/section3",
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

