const User = require('../models/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fibazi');

const users = [
	new User({
		nombre: "jair",
		email: "jgt08@hotmail.com",
		password: "3556792"
	}),
	new User({
		nombre: "angela",
		email: "angela@hotmail.com",
		password: "3556792"
	})
];

var done = 0;
for (var i = 0;	i < users.length; i++) {
	users[i].save(function(err, result){
		done++;
		if(done === users.length){
			exit();
		}
	})
}

function exit(){
	mongoose.disconnect();
}