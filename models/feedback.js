var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
	user: String,
	topic: String,
	creationTimeDate: String,
	content: String
});

mongoose.model('feedback', feedbackSchema);
