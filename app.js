
var express = require('express')
	, users = require('./admin/users')
	, http = require('http')
	, charsheet = require('./game/charsheet')
	, game = require('./game/game')
	, path = require('path')
	, app = express()
	, mongoose = require('mongoose');
	
mongoose.connect('mongodb://localhost/afserverdb');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({ key: 'afcookie', secret: "el conan tambien", cookie: { maxAge: 60 * 60 * 1000 }}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// User operations
app.post('/login', users.login);
app.get('/logout', users.logout); 
app.post('/user', users.register);
app.get('/user/list', users.checkAuth, users.list);

// Charsheet operations
app.get('/charsheet/list', users.checkAuth, charsheet.list);
app.get('/charsheet', users.checkAuth, charsheet.current);
app.post('/charsheet', users.checkAuth, charsheet.new);

// Game
app.post('/game/start', users.checkAuth, game.start);
app.get('/game/join', users.checkAuth, game.join);
app.get('/game/leave', users.checkAuth, game.leave);
app.get('/game/end', users.checkAuth, game.end);
app.get('/game/list', users.checkAuth, game.list);


// Run the party
http.createServer(app).listen(app.get('port'), function(){
	console.log('AFServer listening on port ' + app.get('port'));
});

