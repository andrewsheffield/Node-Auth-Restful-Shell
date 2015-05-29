var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

router.post('/', function(req, res) {

	var Feedback = mongoose.model('feedback');
	var feedback = new Feedback;

	feedback.subject = req.body.subject;
	feedback.body = req.body.subject;

	feedback.save(function (err, feedback) {
		if (err) res.status(500).send(err);
		else res.send(200);
	});


});

module.exports = router;