var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');


router.post('/signup', function(req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var username = req.body.username;
	var password = req.body.password;
	var salt = bcrypt.genSaltSync();

	var User = mongoose.model('users');
	var user = new User;

	user.name.first = firstname;
	user.name.last = lastname;
	user.username = username;
	user.password = bcrypt.hashSync(password, salt);

	user.save(function(err, user) {
		if (err) return console.error(err);
		else { 
			console.log('User ' + user._id + ' has just signed up.');
			res.redirect(307, '/');
		};
	});

});

module.exports = router;