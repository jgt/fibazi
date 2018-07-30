const User = require("../models/user");

exports.createUser = function(req, res, next){
	const user = new User({	
		nombre: "jair",
		email: "jgt08@hotmail.com",
		password: "3556792"
	});

	user.save(function(err){
		if(err) res.redirect('/error');
		next();
	});
}