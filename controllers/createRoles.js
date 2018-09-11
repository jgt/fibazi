const Role = require("../models/roles");

//vista para crear el role
exports.getRole = function(req, res){
	res.render("site/createRoles.html");
}

//Post para crear el role
exports.createRole = function(req, res, next){
	var role = new Role({
		nombre: req.body.nombre,
		level: req.body.level
	});

	role.save().then(function(){
		res.render("site/createRoles.html", {success: req.flash("success", "success")});
	}).catch(function(err){
		res.render("site/createRoles.html", {error: req.flash("error", "error")});
	})
}