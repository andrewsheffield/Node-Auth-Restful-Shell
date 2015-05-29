var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pointsSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'users'
	},
	orderNumber: ({ type: Number, default: 0 }),
	title: String,
	note: String,
	creationDate: { type: Date, default: Date.now() },
	points: [{
		type: Schema.ObjectId,
		ref: 'points'
	}],
	sentences: [{
		type: Schema.ObjectId,
		ref: 'sentences'
	}]
});

mongoose.model('points', pointsSchema);
