var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentsSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'users'
	},
	title: String,
	details: String,
	creationDate: { type: Date, default: Date.now() },
	modifiedDate: [Date]
});

mongoose.model('documents', documentsSchema);
