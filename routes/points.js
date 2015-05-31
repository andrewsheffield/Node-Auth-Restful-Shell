var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

//Root is the name of the document '/points'

//Can be called as middleware to protect certain routes
function ensureAuth(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).send('Error 403: You are not authenticated.');
	}
}

//######Get all points that belong to a user######

router.get('/', ensureAuth, function(req, res) {

	mongoose.model('points').find( { user: req.user }, function(err, points) {
		if (err) res.status(500).send(err);
		else res.send(points);
	});

});

//#######Get a point by ID#########

router.get('/:id', ensureAuth, function(req, res) {

	mongoose.model('points').findOne( { user: req.user, _id: req.params.id }, function(err, point) {
		if (err) res.status(500).send(err);
		else res.send(point);
	});

});

////#####Create a new point####

router.post('/', ensureAuth, function(req, res) {

	var Point = mongoose.model('points');
	var point = new Point;

	point.user = req.user;
	point.title = req.body.title;
	point.note = req.body.note;
	point.save(function(err, point) {
		if (err) res.status(500).send(err);
		else res.send(point);
	});

});

//########Update a point by its ID######
router.put('/:id', ensureAuth, function(req, res) {

	mongoose.model('points').findOne({ user: req.user, _id: req.params.id}, function(err, point) {
		if (err) res.status(500).send(err);
		else {
			if (req.body.title) point.title = req.body.title;
			if (req.body.note) point.note = req.body.note;
		}
	});

});

//#####Delete a point by ID##########
router.delete('/:id', ensureAuth, function(req, res) {
	mongoose.model('points').findOne({ user: req.user, _id: req.params.id }).remove(function(err) {
		if (err) res.status(500).send(err);
		else res.sendStatus(200);
	})
});

module.exports = router;