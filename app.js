var express = require('express');
var users = require('./admin/users');
var routes = require('./web/routes');
var http = require('http');
var charsheet = require('./game/charsheet');
var game = require('./game/game');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
	
mongoose.connect('mongodb://localhost/afserverdb');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/web/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({ key: 'afcookie', secret: "el conan tambien", cookie: { maxAge: 60 * 60 * 1000 }}));
app.use(express.static(path.join(__dirname, 'web/public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// User operations
app.post('/api/login', users.login);
app.get('/api/logout', users.logout); 
app.post('/api/user', users.register);
app.get('/api/user/list', /*users.checkAuth,*/ users.list);

// Charsheet operations
app.get('/api/charsheet/list'/*, users.checkAuth*/, charsheet.list);
app.get('/api/charsheet'/*, users.checkAuth*/, charsheet.current);
app.post('/api/charsheet'/*, users.checkAuth*/, charsheet.new);

// Game
app.post('/api/game/start'/*, users.checkAuth*/, game.start);
app.get('/api/game/join'/*, users.checkAuth*/, game.join);
app.get('/api/game/leave'/*, users.checkAuth*/, game.leave);
app.get('/api/game/end'/*, users.checkAuth*/, game.end);
app.get('/api/game/list'/*, users.checkAuth*/, game.list);

app.get('/', routes.index);
app.get('/login', routes.login);

// Run the party
http.createServer(app).listen(app.get('port'), function(){
	console.log('AFServer listening on port ' + app.get('port'));
});

