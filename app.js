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
app.use(express.favicon(path.join(__dirname, 'web/public/images/favicon.ico')));
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

// Charsheet CRUD
app.post('/charsheet/:id', charsheet.create);
app.get('/charsheet/:id', charsheet.get);
// TODO
// app.put('/charsheet/:id', charsheet.update);
// app.delete('/charsheet/:id', charsheet.delete);

// Get all charsheets from a player
app.get('/user/:userid/charsheets', charsheet.list);

// Get player charsheet for a game
// app.get('/game/:gameid/charsheet'/*, users.checkAuth*/, charsheet.current);


// Game
app.post('/api/game/start'/*, users.checkAuth*/, game.start);
app.get('/api/game/join'/*, users.checkAuth*/, game.join);
app.get('/api/game/leave'/*, users.checkAuth*/, game.leave);
app.get('/api/game/end'/*, users.checkAuth*/, game.end);
app.get('/api/game/list'/*, users.checkAuth*/, game.list);

// Web requests
app.get('/', users.checkAuthRedirect, routes.sections.home);
app.get('/profile', users.checkAuthRedirect, routes.sections.profile);
app.get('/charsheets', users.checkAuthRedirect, routes.sections.charsheets);
app.get('/campaigns', users.checkAuthRedirect, routes.sections.campaigns);

app.get('/start', routes.start);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/error', routes.error);

app.get('/users', routes.sections.users);




// Run the party
http.createServer(app).listen(app.get('port'), function(){
	console.log('AFServer listening on port ' + app.get('port'));
});

