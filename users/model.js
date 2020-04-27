const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_tgid: {
		type: Number,
		required: true
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	username: {
		type: String
	},
	calendars: {
		type: Array
	},
	active: {
		type: Boolean,
		default: true
	},
	settings: {
		notificationTime: {
			type: String
		},
		numberOfEvents: {
			type: Number
		}
	}
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {
	UserModel
};
