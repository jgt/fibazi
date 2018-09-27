const User = require("../models/user");
const Role = require("../models/roles");

exports.getAllUser = function(req, res){
	User.find().populate("role").exec(function(err, result){
		res.render("site/listUser.html", {users: result});
	});
}

exports.getCreateUser = function(req, res){
	Role.find(function(err, result){
		res.render("site/crearUser.html", {roles: result});
	});
}

exports.createUser = function(req, res){
	var user = new User({
		nombre: req.body.nombre,
		email: req.body.email,
		password: req.body.password,
		role: req.body.roles,
		level: req.body.level
	});
	
	user.save().then(function(){
		Role.find(function(err, result){
			res.render("site/crearUser.html", {success: req.flash("success", "success"), roles: result});
		});
	}).catch(function(err){
		Role.find(function(err, result){
			res.render("site/crearUser.html", {error: req.flash("error", "error"), roles: result});
		});
	});
}

exports.getUpdateUser = function(req, res){
	Role.find({}, function(err, roles){
		User.findById(req.params.id).populate("role").exec(function(err, user){
			res.render("site/updateUser.html", {user: user, roles: roles});
		});
	});
}

exports.updateUser = function(req, res){
	User.findById(req.params.id, function(err, user){
		user.nombre = req.body.nombre,
		user.email = req.body.email,
		user.password = req.body.password,
		user.level = req.body.nivel,
		user.role = req.body.roles

		user.save().then(function(){
			Role.find({}, function(err, roles){
				User.findById(req.params.id).populate("role").exec(function(err, user){
					res.render("site/updateUser.html", {user: user, roles: roles, success: req.flash("success", "success")});
				});
			});
		}).catch(function(error){
			res.send(error)
		});
	});
}

exports.deleteUser = function(req, res){
	User.findOneAndRemove({_id: req.params.id}, function(err, result){
		if(err){
			res.redirect("/list-user");
		}
		res.redirect("/list-user");
	});
}