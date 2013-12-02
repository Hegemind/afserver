var express		= require('express');
var users 		= require('./src/queries/users');
var db			= require('./src/queries/sqlite/db');
var charsheet	= require('./src/game/charsheet');
var game		= require('./src/game/game');
var http		= require('http');
var app			= express();

// all environments
app.set('port', process.env.PORT || 3000);

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
app.post('/api/login', users.login);
app.get('/api/logout', users.logout); 
app.post('/api/user', users.register);
app.get('/api/user/list', /*users.checkAuth,*/ users.list);

// Charsheet CRUD
app.post('/user/:userid/charsheet', charsheet.create);
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

app.get('/test', db.findUserByLogin);

// Run the party
http.createServer(app).listen(app.get('port'), function(){
	console.log('AFServer listening on port ' + app.get('port'));
});

