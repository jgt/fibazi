const express = require("express");
const logged = require("../middleware/logged");
const Solicitud = require("../models/solicitud");
const Lider = require("../models/lideres");
const api = express.Router();

//Controllers
const user = require("../controllers/users");
const solicitud = require("../controllers/solicitud");
const lider = require("../controllers/lideres");

//Buscador Garantia
api.get("/buscador-garantia", logged, function(req, res){
	Solicitud.count({}, function(err, count){
		res.render("site/buscadorGarantia.html", {count: count});
	})
});

//Pagos en garantia
api.get("/pagos-garantia", logged, function(req, res){
	res.render("site/pagosGarantia.html");
});	
api.post("/pagos-garantia", logged, solicitud.findSolc);
api.post("/pagos-save", logged, solicitud.guardarPagos);

//Solicitud
api.get("/lid", logged, lider.lideresContactos);// data de los referentes y contactos
api.get('/solicitud', logged, function(req, res){
	res.render('site/solicitud.html');
});
api.post("/solicitud", logged, solicitud.solc);



api.get("/prueba", logged, lider.lideresContactos);

module.exports = api;