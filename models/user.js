var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	name: {
		first: String,
		last: String
	},
	username: String,
	password: String,
	verified: { type: Boolean, default: false }
});

mongoose.model('users', usersSchema);
