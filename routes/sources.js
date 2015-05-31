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

//###Get all sources belonging to the user#####
router.get('/', ensureAuth, function(req, res) {
	mongoose.model('sources').find( { user: req.user }, function(err, sources) {
		if (err) res.status(500).send(err);
		else res.send(sources);
	});
});

//###Get a source by id###
router.get('/:id', ensureAuth, function(req, res) {
	mongoose.model('sources').findOne( { user: req.user, _id: req.params.id }, function (err, source) {
		if (err) res.status(500).send(err);
		else res.send(source);
	});
});

//###Create a new source###
router.post('/', ensureAuth, function(req, res) {

	var Source = mongoose.model('sources');
	var source = new Source;

	source.user = req.user;
	source.type = req.body.type;
	source.articleTitle = req.body.articleTitle;
	source.author = req.body.author;
	source.websiteTitle = req.body.websiteTitle;
	source.url = req.body.url;
	source.publication = req.body.publication;
	source.publishedDate = req.body.publishedDate;
	source.accessedDate = req.body.accessedDate;
	source.quotes.push(req.body.quotes);

	source.save(function(err, source) {
		if (err) res.status(500).send(err);
		else res.send(source);
	});
});

//###Update a source###
router.put('/:id', ensureAuth, function(req, res) {
	res.status(400).send("This function is not yet implemented.");
});

//###Delete a source###
router.delete('/:id', ensureAuth, function(req, res) {
	mongoose.model('sources').find( { user: req.user, _id: req.params.id }).remove(function(err) {
		if (err) res.status(500).send(err);
		else res.sendStatus(204);
	});
});

module.exports = router;