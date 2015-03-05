var express = require('express');
var app = express();
var backbone = require('backbone');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


var Meal = Backbone.Model.extend({
  defaults: {
    "appetizer":  "caesar salad",
    "entree":     "ravioli",
    "dessert":    "cheesecake"
  }
});

app.get('/', function(request, response) {
  response.send("Dessert will be " + (new Meal).get('dessert'));
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
