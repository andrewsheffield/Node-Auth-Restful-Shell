var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var signupRouter = require('./signup');

//Can be called as middleware to protect certain routes
function ensureAuth(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
}

/* GET home page. */
router.get('/', function(req, res, next) {

	if (req.isAuthenticated()) {
		if (req.user.verified) {
			res.render('dashboard', req.user);
		} else {
			res.render('index', { message: 'You have not yet verified your email.' });
		}
	} else {
		res.render('index', { message: req.flash('error') });
	}
});

router.post('/', passport.authenticate('local', 
	{
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	}
));

router.get('/logout', function(req, res, next) {
	req.logout();
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
