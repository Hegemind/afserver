
/*
 * GET home page.
 */

exports.start = function(req, res){
  res.render('index', { title: 'Welcome!' });
};

exports.index = function(req, res){
  res.render('index', { title: 'Logged in' });
};

exports.login = function(req, res){
  res.render('login', { title: 'Express' });
};

