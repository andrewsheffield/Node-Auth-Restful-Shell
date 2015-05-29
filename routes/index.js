var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var bcrypt = require('bcrypt');

//Can be called as middleware to protect certain routes
function ensureAuth(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).send('Error 403: You do not have the correct credentials to access this page.');
	}
}

/* GET home page. */
router.get('/', function(req, res, next) {
		if (req.isAuthenticated()) {
			if (req.user.verified) {
				res.render('dashboard', { user: req.user });
			} else {
				res.render('index', { message: 'You have not yet verified your email.' });
			}
		} else {
			res.render('index', { message: req.flash('error') });
		}
});

router.get('/tester', function(req, res) {
	res.render('test');
});

/*
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
*/


//Example of HTTP login use for secure directories
//router.use('/api', passport.authenticate('basic', { session: false }));


module.exports = router;
