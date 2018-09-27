const User = require("../models/user");

module.exports = function(req, res, next){
	if(req.isAuthenticated()){
		User.findOne({email: req.user.email}, function(err, user){
			res.locals.user = user;
			next();
		});
	}else{
		res.redirect('/login');
	}
}