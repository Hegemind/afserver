var express		= require('express');
var users 		= require('./src/queries/users');
var db			= require('./src/queries/db');
// var character	= require('./src/game/character');
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
app.get('/user/:userid', /*users.checkAuth,*/ db.findUserByLogin);

// Character CRUD
// app.post('/user/:userid/character', character.create);
app.get('/character/:id', db.getCharactersById);
app.post('/character', db.createCharacter);
// TODO
// app.put('/character/:id', character.update);
// app.delete('/character/:id', character.delete);

// Get all characters from a player
// app.get('/user/:userid/characters', character.list);

// Get player character for a game
// app.get('/game/:gameid/character'/*, users.checkAuth*/, character.current);


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

