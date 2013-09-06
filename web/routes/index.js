exports.start = function(req, res){
	res.render('start');
};

exports.index = function(req, res){
	var username = req.session.user_id;
	res.render('index', { username: username });
};

exports.login = function(req, res){
	res.render('login');
};

exports.logout = function(req, res){
	res.render('logout');
};

