var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentsSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'users'
	},
	title: String,
	details: String,
	status: String,
	creationDate: { type: Date, default: Date.now() },
	modifiedDates: [Date],
	openedDates: [Date],
	points: [{
		type: Schema.ObjectId,
		ref: 'points'
	}]
});

mongoose.model('documents', documentsSchema);
