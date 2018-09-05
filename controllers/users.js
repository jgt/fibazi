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
		role: req.body.roles
	});
	
	user.save().then(function(){
		Role.find(function(err, result){
			res.render("site/crearUser.html", {roles: result, success: req.flash("success", "success")});
		});
	}).catch(function(err){
		Role.find(function(err, result){
			res.render("site/crearUser.html", {roles: result, error: req.flash("success", "success")});
		});
	});
}