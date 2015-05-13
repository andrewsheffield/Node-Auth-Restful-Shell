var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

//#####GETTERS#####
//Root is the name of the document '/documents'

router.get('/', function(req, res) {

	if (req.user) {
		mongoose.model('documents').find({ user: req.user }, 'title details', function(err, documents) {
			res.send(documents);
		});
	} else {
		res.send(403);
	}

});

router.get('/:id', function(req, res) {

	if (req.user) {
		mongoose.model('documents').findOne({ user: req.user, _id: req.params.id }, function(err, documents) {
			if (documents) res.send(documents);
			else res.status(403).send('That object does not exist or you do not have permission to access it.');
		});
	} else {
		res.send(403);
	}

});

//#####SETTERS#####

router.post('/newDocument', function(req, res) {

	var Document = mongoose.model('documents');
	var document = new Document;

	document.user = req.user;
	document.title = req.body.title;
	document.details = req.body.details;
	document.modifiedDate.push(Date.now());

	document.save(function (err, document) {
		res.send(document);
	});
});

router.post('/deleteDocument', function(req, res) {

	mongoose.model('documents').findOne({ _id: req.body._id }, function(err, document) {
		document.remove();
		res.send(document);
	});
});

router.post('/updateDocument', function(req, res) {
	mongoose.model('documents').findOne({ _id: req.body._id }, function(err, document) {
		document.title = req.body.title;
		document.details = req.body.details;
		document.modifiedDate.push(Date.now());
		document.save();
		res.send(document);
	});
});

module.exports = router;