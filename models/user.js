var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	name: {
		first: String,
		last: String
	},
	username: String,
	password: String
});

mongoose.model('users', usersSchema);
