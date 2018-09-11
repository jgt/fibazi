const User = require("../models/user");
const Role = require("../models/roles");
const Level = require("../models/level");

exports.getAllUser = function(req, res){
	User.find().populate("role").exec(function(err, result){
		res.render("site/listUser.html", {users: result});
	});
}

exports.getCreateUser = function(req, res){
	Role.find(function(err, result){
		Level.find(function(err, lev){
			res.render("site/crearUser.html", {roles: result, level: lev});
		});
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