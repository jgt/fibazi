const express = require("express");
const User = require("../models/user");
const api = express.Router();
const multer = require("multer")({
	dest: "public/uploads"
});

//Controllers
const user = require("../controllers/users");
const solicitud = require("../controllers/solicitud");
const lider = require("../controllers/lideres");
const roles = require("../controllers/createRoles");
const pagos = require("../controllers/pagos");
const noticias = require("../controllers/noticias");

//Midleware
const permisos = require("../middleware/roles");

//Noticias
api.route("/noticias")
	.get(noticias.getNoticias)
	.post([multer.single('imagen')], noticias.postNoticias)

//Buscador Garantia
api.route("/buscador-garantia")
	.get(permisos.pagos, pagos.getFindSolc)
	.post(permisos.pagos, pagos.findSolc);

//Pagos en garantia
api.route("/pagos-garantia")
	.post(permisos.pagos, pagos.guardarPagos)

//Solicitud
api.route("/lid")
	.get(permisos.ventas, lider.lideresContactos); // data de los referentes y contactos

api.route("/solicitud")
	.get(permisos.ventas, solicitud.getSolc)
	.post(permisos.ventas, solicitud.solc);

//Crear Usuario
api.route("/user")
	.get(permisos.admin, user.getCreateUser)
	.post(permisos.admin, user.createUser);

//lista de usuarios
api.route("/list-user")
	.get(permisos.admin, user.getAllUser);

//Delete user and Update user
api.route("/user/:id")
	.get(permisos.admin, user.getUpdateUser)
	.put(permisos.admin, user.updateUser)
	.delete(permisos.admin, user.deleteUser);

//Crear Roles
api.route("/role")
	.get(roles.getRole)
	.post(roles.createRole);


module.exports = api;