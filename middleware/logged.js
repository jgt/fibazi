const User = require("../models/user");
const Level = require("../models/level")

module.exports = function(req, res, next){
	if(req.isAuthenticated()){
		User.findOne({email: req.user.email}, function(err, user){
			Level.find(function(err, result){
				res.locals.user = user;
				res.locals.level = result;
				next();
			})
		});
	}else{
		res.redirect('/login');
	}
}