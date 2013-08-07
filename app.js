
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes/pages')
	, db = require('./routes/db')
	, security = require('./routes/security')
	, http = require('http')
	, charsheet = require('./game/charsheet')
	, path = require('path');

var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/afserverdb');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// REST
app.get('/', routes.index);

// User
app.get('/login', security.login);

// Game resources
app.get('/charsheet', charsheet.getCurrentCharsheet);
app.get('/charsheet/list', charsheet.getMyCharsheets);



// Run the party
http.createServer(app).listen(app.get('port'), function(){
  console.log('AFServer listening on port ' + app.get('port'));
});
