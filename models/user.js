const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const user = new Schema({

	nombre: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	},

	role: {
		type: Schema.Types.ObjectId,
		ref: 'Role'
	},

	level: {
		type: String,
		enum: ["1", "2"]
	}
});

user.pre('save', function(next){
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err) return next(err);
		user.password = hash;
		next();
	});
});



module.exports = mongoose.model('User', user);