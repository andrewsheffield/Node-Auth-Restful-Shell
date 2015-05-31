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

//#######Get all sentences for user#########
router.get('/', ensureAuth, function(req, res) {
	mongoose.model('sentences').find( { user: req.user }, function(err, sentences) {
		if (err) res.status(500).send(err);
		else res.send(sentences);
	});
});

//#######Get a sentence by id#########
router.get('/:id', ensureAuth, function(req, res) {
	mongoose.model('sentences').findOne( { user: req.user, _id: req.params.id }, function(err, sentence) {
		if (err) res.status(500).send(err);
		else res.send(sentence);
	});
});

//######create a new sentence#######
router.post('/', ensureAuth, function(req, res) {

	var Sentence = mongoose.model('sentences');
	var sentence = new Sentence;

	sentence.user = req.user;
	sentence.body = req.body.body;
	sentence.save(function(err, sentence) {
		if (err) res.status(500).send(err);
		else res.send(sentence);
	});
});

//#######update a sentence by the id#####
router.put('/:id', ensureAuth, function(req, res) {
	mongoose.model('sentences').findOne( { user: req.user, _id: req.params.id }, function(err, sentence) {
		if (err) res.status(500).send(err);
		else {
			if (req.body.body) sentence.body = req.body.body;
			sentence.save(function(err, sentence) {
				if (err) res.status(500).send(err);
				else res.send(sentence);
			});
		}
	});
});

router.delete('/:id', ensureAuth, function(req, res) {
	mongoose.model('sentences').findOne( { user: req.user, _id: req.params.id }).remove(function (err) {
		if (err) res.status(500).send(err);
		else res.sendStatus(200);
	})
});

module.exports = router;