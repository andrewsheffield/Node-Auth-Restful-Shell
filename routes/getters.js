var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

router.get('/documents', function(req, res) {
	/* SETTER FOR DOCUMENTS  
		var Document = mongoose.model('documents');
		var document = new Document;

		document.user = req.user;
		document.title = 'Hello World';
		document.creationDate = Date.now();
		document.modifiedDate.push(Date.now());

		document.save(function (err, document) {
			console.log(document);
			//res.send(document);
		});
	*/
		

	if (req.user) {
		mongoose.model('documents').find({ user: req.user }, function(err, documents) {
			res.send(documents);
		});
	} else {
		res.send(403);
	}

	

});

module.exports = router;