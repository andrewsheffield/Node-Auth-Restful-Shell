var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
  	response.sendFile(__dirname + '/public/index.html');
});

app.post('/dashboard/', function(request, response) {
	var data = {
        email : request.body.email,
        password : request.body.password
    };
	response.send(data);
  	//response.sendFile(__dirname + '/public/dashboard.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
