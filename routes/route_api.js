const express = require("express");
const logged = require("../middleware/logged");
const Solicitud = require("../models/solicitud");
const api = express.Router();

//Controllers
const user = require("../controllers/users");
const solicitud = require("../controllers/solicitud");

//Buscador Garantia
api.get("/buscador-garantia", logged, function(req, res){
	Solicitud.count({}, function(err, count){
		res.render("site/buscadorGarantia", {count: count});
	})
});

//Pagos en garantia
api.get("/pagos-garantia", logged, function(req, res){
	res.render("site/pagosGarantia");
});	
api.post("/pagos-garantia", logged, solicitud.findSolc);
api.post("/pagos-save", logged, solicitud.guardarPagos);

//Solicitud
api.get('/solicitud', logged, function(req, res){
	res.render('site/solicitud');
});

api.post("/solicitud", logged, solicitud.solc);

module.exports = api;