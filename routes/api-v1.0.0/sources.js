var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

//Root is the name of the document '/sources'

//Can be called as middleware to protect certain routes
function ensureAuth(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).send('Error 403: You are not authenticated.');
	}
}

//###Create a new source###
router.post('/', ensureAuth, function(req, res) {

	var newObject = req.body;
	var Source = mongoose.model('sources');
	var source = new Source(newObject);

	source.user = req.user;
	source.save(function(err, source) {
		if (err) res.status(500).send(err);
		else res.send(source);
	});
});

//###Get all sources belonging to the user#####
router.get('/', ensureAuth, function(req, res) {

	var model = mongoose.model('sources');
	var query = { user: req.user };

	model.find(query , function(err, sources) {
		if (err) res.status(500).send(err);
		else res.send(sources);
	});
});

//###Get a source by id###
router.get('/:id', ensureAuth, function(req, res) {

	var model = mongoose.model('sources');
	var id = req.params.id;
	var query = { user: req.user, _id: id };

	model.findOne(query, function (err, source) {
		if (err) res.status(500).send(err);
		else res.send(source);
	});
});

//###Update a source###
router.put('/:id', ensureAuth, function(req, res) {

	var model = mongoose.model('sources');
	var id = req.params.id;
	var query = { user: req.user, _id: id };
	var update= req.body;

	model.findOneAndUpdate(query, update, function(err, source) {
		if (err) res.status(500).send(err);
		else res.send(source);
	});
});

//###Delete a source###
router.delete('/:id', ensureAuth, function(req, res) {

	var model = mongoose.model('sources');
	var id = req.params.id;
	var query = { user: req.user, _id: id };

	model.findOneAndRemove(query, function(err) {
		if (err) res.status(500).send(err);
		else res.sendStatus(204);
	});
});

module.exports = router;