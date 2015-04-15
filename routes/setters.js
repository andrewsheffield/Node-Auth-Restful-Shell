var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

router.post('/newDocument', function(req, res) {

	var Document = mongoose.model('documents');
	var document = new Document;

	document.user = req.user;
	document.title = req.body.title;
	document.details = req.body.details;
	document.creationDate = Date.now();
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
})

module.exports = router;