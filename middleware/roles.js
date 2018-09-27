const User = require("../models/user");

module.exports.ventas = function(req, res, next){
	if(res.locals.user.role){
		User.findById(res.locals.user._id).populate("role").exec(function(err, user){
			if(user.role.nombre === "ventas" || user.role.nombre === "admin"){
				next();
			}else{
				res.redirect("/");
			}
		});
	}else{
		res.redirect("/");
	}
}

module.exports.pagos = function(req, res, next){
	if(res.locals.user.role){
		User.findById(res.locals.user._id).populate("role").exec(function(err, user){
			if(user.role.nombre === "pagos" || user.role.nombre === "admin"){
				next();
			}else{
				res.redirect("/");
			}
		});
	}else{
		res.redirect("/");
	}
}

module.exports.admin = function(req, res, next){
	if(res.locals.user.role){
		User.findById(res.locals.user._id).populate("role").exec(function(err, user){
			if(user.role.nombre === "admin"){
				next();
			}else{
				res.redirect("/");
			}
		});
	}else{
		res.redirect("/");
	}
}