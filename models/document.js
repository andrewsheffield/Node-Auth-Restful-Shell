var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentsSchema = new Schema({
	user: String,
	title: String,
	creationDateTime: String,
	modifiedDateTime: [String],
	bullet: [{
		title: String,
		content: String
	}]
});

mongoose.model('documents', documentsSchema);
