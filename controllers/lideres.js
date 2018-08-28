const Contactos = require("../models/contactos");
const Lider = require("../models/lideres");
const mongoose = require('mongoose');

exports.lideresContactos = function(req, res, next){
	Lider.find().populate("contactos").exec(function(err, lid){
		res.json({
			'status': 200,
			'data': lid
		})
	})
}