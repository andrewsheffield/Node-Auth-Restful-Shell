var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

//Root is the name of the document '/documents'

//Can be called as middleware to protect certain routes
function ensureAuth(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).send('Error 403: You are not authenticated.');
	}
}

//#####Gets All documents for user#####

router.get('/', ensureAuth, function(req, res) {

	mongoose.model('documents').find({ user: req.user }, function(err, documents) {
		if (err) res.status(500).send(err);
		else {
			mongoose.model('documents').populate(documents, {path: 'points'}, function (err, documents) {
				if (err) res.status(500).send(err);
				else res.send(documents);
			});
		}
	});

});

//#####Create a new Document#####

router.post('/', ensureAuth, function(req, res) {

	var Document = mongoose.model('documents');
	var document = new Document;

	document.user = req.user;
	document.title = req.body.title;
	document.details = req.body.details;
	document.modifiedDates.push(Date.now());


	document.save(function (err, document) {
		if (err) res.send(500).send(err);
		else res.send(document);
	});
});

////#####Get a Document#####

router.get('/:id', ensureAuth, function(req, res) {

	mongoose.model('documents').findOne({ user: req.user, _id: req.params.id }, function(err, documents) {
		if (documents) res.send(documents);
		else res.status(403).send('That object does not exist or you do not have permission to access it.');
	});

});

////#####Update a Document#####
router.put('/:id', ensureAuth, function(req, res) {
	mongoose.model('documents').findOne({ user: req.user, _id: req.params.id }, function(err, document) {
		if (err) res.status(500).send(err);
		else {
			if (req.body.title) {
				document.title = req.body.title;
			}
			if (req.body.details) {
				document.details = req.body.details;
			}
			document.modifiedDate.push(Date.now());
			document.save(function(err, document) {
				if (err) res.status(500).send(err);
				else res.send(document);
			});
		}
	});
});

////#####Delete a Document#####
router.delete('/:id', ensureAuth, function(req, res) {
	mongoose.model('documents').findOne({ user: req.user, _id: req.params.id }).remove(function(err) {
		if (err) res.status(500).send(err);
		else res.send(200);
	});
});




module.exports = router;