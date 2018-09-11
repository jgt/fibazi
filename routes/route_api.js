const express = require("express");
const User = require("../models/user");
const api = express.Router();

//Controllers
const user = require("../controllers/users");
const solicitud = require("../controllers/solicitud");
const lider = require("../controllers/lideres");
const roles = require("../controllers/createRoles");

//Buscador Garantia
api.route("/buscador-garantia")
	.get(solicitud.getFindSolc)
	.post(solicitud.findSolc);

//Pagos en garantia
api.route("/pagos-garantia")
	.post(solicitud.guardarPagos)

//Solicitud
api.route("/lid")
	.get(lider.lideresContactos); // data de los referentes y contactos

api.route("/solicitud")
	.get(solicitud.getSolc)
	.post(solicitud.solc);

//Crear Usuario
api.route("/user")
	.get(user.getCreateUser)
	.post(user.createUser);

//lista de usuarios
api.route("/list-user")
	.get(user.getAllUser);	

//Crear Roles
api.route("/role")
	.get(roles.getRole)
	.post(roles.createRole);

api.route("/prueba")
	.get(function(req, res){
		if(res.locals.user.role){
			User.findById(res.locals.user._id).populate("role level").exec(function(err, user){
				res.json(user);
			});
		}else{
			res.send("no tiene rol");
		}
	});

module.exports = api;