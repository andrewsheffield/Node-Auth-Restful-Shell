var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

router.post('/addFeedback', function(req, res) {

	var Feedback = mongoose.model('feedback');
	var feedback = new Feedback;

	feedback.subject = req.body.subject;
	feedback.body = req.body.subject;

	feedback.save(function (err, feedback) {
		if (err) return console.error(err);
		res.send(feedback);
	});


});

module.exports = router;