var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var bcrypt = require('bcrypt');

//   '/authenticate/'
router.post('/', passport.authenticate('local', 
	{
		//successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	}),
	function (req, res, next) {
		if (!req.body.rememberme) { return next(); }

    	mongoose.model('auth').findOne( { 'user' : req.user._id }, function (err, auth) {
    		auth.rmToken = crypto.randomBytes(16).toString('hex');
        	bcrypt.hash(auth.rmToken, 10, function(err, hash) {
          		res.cookie('remember_me', req.user.username + " " + hash, { maxAge: (30 * 24 * 60 * 60 * 1000), httpOnly: true });
          		auth.save();
          		return next();
        	});
    	});
	},
	function (req, res) {
		res.redirect('/');
	}
);

router.get('/logout', function(req, res, next) {
	req.logout();
	res.clearCookie('remember_me');
	res.render('infosplash', {
		title: 'Ink-Slinger - Logout',
		header: 'You have successfully logged out.',
		body: 'We hope to see you again soon!'
	});
});

module.exports = router;