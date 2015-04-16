var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

router.get('/documents', function(req, res) {

	if (req.user) {
		mongoose.model('documents').find({ user: req.user }, function(err, documents) {
			res.send(documents);
		});
	} else {
		res.send(403);
	}

	

});

module.exports = router;