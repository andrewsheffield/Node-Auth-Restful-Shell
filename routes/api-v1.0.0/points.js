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

////#####Create a new point####
router.post('/', ensureAuth, function(req, res) {

	var Point = mongoose.model('points');
	var point = new Point(req.body);

	point.user = req.user;
	point.save(function(err, point) {
		if (err) res.status(500).send(err);
		else res.send(point);
	});

});

//######Get all points that belong to a user######
router.get('/', ensureAuth, function(req, res) {

	var model = mongoose.model('points');
	var query = { user: req.user };

	model.find(query, function(err, points) {
		if (err) res.status(500).send(err);
		else res.send(points);
	});

});

//#######Get a point by ID#########
router.get('/:id', ensureAuth, function(req, res) {

	var model = mongoose.model('points');
	var id = req.params.id;
	var query = { user: req.user, _id: id };

	model.findOne(query, function(err, point) {
		if (err) res.status(500).send(err);
		else res.send(point);
	});

});

//########Update a point by its ID######
router.put('/:id', ensureAuth, function(req, res) {

	var model = mongoose.model('points');
	var id = req.params.id;
	var query = { user: req.user, _id: id};
	var update = req.body;

	model.findOneAndUpdate(query, update, function(err, point) {
		if (err) res.status(500).send(err);
		else res.send(point);
	});

});

//#####Delete a point by ID##########
router.delete('/:id', ensureAuth, function(req, res) {

	var model = mongoose.model('points');
	var id = req.params.id;
	var query = { user: req.user, _id: id };

	model.findOneAndRemove(query, function(err) {
		if (err) res.status(500).send(err);
		else res.sendStatus(204);
	});
});

module.exports = router;