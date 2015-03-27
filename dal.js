var mongoose = require('mongoose');

function dal() {

}

dal.prototype.getUser = function(email, runMe) {

	mongoose.createConnect('mongodb://ajsheffield:Midgees1@ds053438.mongolab.com:53438/heroku_app34579795');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function (callback) {
  		console.log("MongoDB is now open.");

		var userSchema = mongoose.Schema({
    		email: String,
    		password: String
		});

		var User = mongoose.model('User', userSchema);

		User.findOne({ 'email': email }, 'email password', function (err, user) {
			if (err) return handleError(err);
			console.log("Email: " + email + ' pw: ', user.password);
			runMe(user);
		});

	});

}

dal.prototype.addNewUser = function(aEmail, aPassword, callback) {

	mongoose.connect('mongodb://ajsheffield:Midgees1@ds053438.mongolab.com:53438/heroku_app34579795');

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'Connection error:'));

	db.once('open', function (err) {
		console.log('Adding new User');

		var userSchema = mongoose.Schema({
    		email: String,
    		password: String
		});

		var User = mongoose.model('User', userSchema);

		var user = new User({email: aEmail, password: aPassword});

		user.save(function(err) {
			if (err) return handleError(err);
			console.log('User ' + aEmail + ' has just signed up');
			callback();
			mongoose.disconnect();
		});
	});


}

module.exports = dal;