var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

//Root is the name of the document '/sentences'

//Can be called as middleware to protect certain routes
function ensureAuth(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).send('Error 403: You are not authenticated.');
	}
}

//######create a new sentence#######
router.post('/', ensureAuth, function(req, res) {

	var newObject = req.body;
	var Sentence = mongoose.model('sentences');
	var sentence = new Sentence(newObject);

	sentence.user = req.user;
	sentence.save(function(err, sentence) {
		if (err) res.status(500).send(err);
		else res.send(sentence);
	});
});

//#######Get all sentences for user#########
router.get('/', ensureAuth, function(req, res) {

	var model = mongoose.model('sentences');
	var query = { user: req.user };

	model.find(query, function(err, sentences) {
		if (err) res.status(500).send(err);
		else res.send(sentences);
	});
});

//#######Get a sentence by id#########
router.get('/:id', ensureAuth, function(req, res) {

	var model = mongoose.model('sentences');
	var id = req.params.id;
	var query = { user: req.user, _id: id };

	model.findOne(query , function(err, sentence) {
		if (err) res.status(500).send(err);
		else res.send(sentence);
	});
});

//#######update a sentence by the id#####
router.put('/:id', ensureAuth, function(req, res) {

	var model = mongoose.model('sentences');
	var id = req.params.id;
	var query = { user: req.user, _id: id };
	var update = req.body;

	model.findOneAndUpdate(query, update, function(err, sentence) {
		if (err) res.status(500).send(err);
		else res.send(sentence);
	});
});

//###Delete a sentence by its ID###
router.delete('/:id', ensureAuth, function(req, res) {

	var model = mongoose.model('sentences');
	var id = req.params.id;
	var query = { user: req.user, _id: id };

	model.findOneAndRemove(query, function(err) {
		if (err) res.status(500).send(err);
		else res.sendStatus(204);
	});
});

module.exports = router;