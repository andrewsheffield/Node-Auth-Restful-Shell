var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sourcesSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'users'
	},
	type: String,
	articleTitle: String,
	author: {
		first: String,
		last: String,
		mi: String,
		suffix: String
	},
	websiteTitle: String,
	url: String,
	publication: {
		publisher: String,
		city: String,
		year: Date
	},
	publishedDate: Date,
	accessedDate: Date,
	creationDate: { type: Date, default: Date.now() },
	quotes: [String]
});

mongoose.model('sources', sourcesSchema);
