var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var bcrypt = require('bcrypt');

var signupRouter = require('./signup');

//Can be called as middleware to protect certain routes
function ensureAuth(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.reroute('/');
	}
}

/* GET home page. */
router.get('/', function(req, res, next) {
		if (req.user) {
			if (req.user.verified) {
				res.render('dashboard', req.user );
			} else {
				res.render('index', { message: 'You have not yet verified your email.' });
			}
		} else {
			res.render('index', { message: req.flash('error') });
		}
});

router.post('/', passport.authenticate('local', 
	{
		//successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	}),
	function (req, res, next) {
		if (!req.body.rememberme) { return next(); }

		req.user.rmToken = crypto.randomBytes(16).toString('hex');
        bcrypt.hash(req.user.rmToken, 10, function(err, hash) {
          res.cookie('remember_me', req.user.username + " " + hash, { maxAge: (30 * 24 * 60 * 60 * 1000), httpOnly: true });
        });
        req.user.save(function(err, user) {
          return next();
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

//Example of HTTP login use for secure directories
router.use('/api', passport.authenticate('basic', { session: false }));

router.use(signupRouter);

module.exports = router;
