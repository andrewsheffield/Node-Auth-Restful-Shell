var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sentencesSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'users'
	},
	orderNumber: Number,
	body: String,
	creationDate: { type: Date, default: Date.now() },
	sources: [{
		type: Schema.ObjectId,
		ref: 'sources'
	}]
});


mongoose.model('sentences', sentencesSchema);
