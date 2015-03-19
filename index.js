var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Populates req.session
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
  	response.sendFile(__dirname + '/public/index.html');
});

app.post('/auth/', function(req, res) {
	if (req.session.email) {
		if (req.session.email == "sheff" && req.session.email == "1234") {
			res.sendFile(__dirname + '/public/dashboard.html');
		} else {
			res.status(403).send("Not Authorized");
		}
	} else {
		if (req.body.email == "sheff" && req.body.password == "1234") {
			req.session.email = req.body.email;
			req.session.password = req.body.password;
			res.sendFile(__dirname + '/public/dashboard.html');
		} else {
			res.status(403).send("Not Authorized");
		}
	}
});

app.get('/dashboard/', function(req, res) {

    if (req.session.email) {
    	res.sendFile(__dirname + '/public/dashboard.html');
    } else {
    	res.status(403).send("You're not authorized here");
    }
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
