
var express = require('express')
	, security = require('./admin/security')
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
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: "el conan tambien", cookie: { maxAge: 60 * 60 * 1000 }}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//User validation
var auth = express.basicAuth(function(user, pass) {     
   return (user == "super" && pass == "secret");
},'Super duper secret area');



//Password protected area
app.get('/admin', auth, charsheet.getCurrentCharsheet);
app.get('/my_secret_page', security.checkAuth, function (req, res) {
  res.send('welcome to my_secret_page. user_id='+req.session.user_id);
});

// User
app.post('/login', security.login);

app.get('/logout', security.logout); 
// app.get('/login', security.login);

// Game resources
app.get('/charsheet', security.checkAuth, charsheet.getCurrentCharsheet);
app.get('/charsheet/list', security.checkAuth, charsheet.getMyCharsheets);



// Run the party
http.createServer(app).listen(app.get('port'), function(){
  console.log('AFServer listening on port ' + app.get('port'));
});

