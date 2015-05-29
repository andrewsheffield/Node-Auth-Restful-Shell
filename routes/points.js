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

////#####Add a point to a document####

router.post('/', ensureAuth, function(req, res) {


	var Point = mongoose.model('points');
	var point = new Point;

	point.user = req.user;
	point.title = req.body.title;
	point.note = req.body.note;
	point.save(function(err, point) {
		if (err) res.status(500).send(err);
		else res.send(point);
	});

});

//########Update a point by its ID######
router.put('/:id', ensureAuth, function(req, res) {

	mongoose.model('documents').findOne({ user: req.user, _id: req.params.documentId}, function(err, document) {
		if (err) res.status(500).send(err);
		else {
			document.points.forEach(function (point) {
				if (point._id == req.params.pointId) {
					if (req.body.title) point.title = req.body.title;
					if (req.body.note) point.note = req.body.note;

				}
			});
		}
	});

});

module.exports = router;