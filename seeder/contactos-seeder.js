const Contactos = require('../models/contactos');
const Lider = require("../models/lideres");
const mongoose = require('mongoose');

mongoose.connect('mongodb://fibazi:jgt3556792@ds141641.mlab.com:41641/fibazi');

Lider.findOne({nombre: "jair"},function(err, lid){
	const contactos = [
		new Contactos({
			nombre: "laura",
			telefono: "7551138455",
			colonia: "del valle",
			lider: lid
		}),
		new Contactos({
			nombre: "sunem",
			telefono: "7551138455",
			colonia: "del valle",
			lider: lid
		}),
		new Contactos({
			nombre: "adriana",
			telefono: "7551138455",
			colonia: "del valle",
			lider: lid
		}),
		new Contactos({
			nombre: "monica",
			telefono: "7551138455",
			colonia: "del valle",
			lider: lid
		}),
		new Contactos({
			nombre: "kendy",
			telefono: "7551138455",
			colonia: "del valle",
			lider: lid
		}),
		new Contactos({
			nombre: "kristal",
			telefono: "7551138455",
			colonia: "del valle",
			lider: lid
		}),
	];

	var done = 0;
	for (var i = 0;	i < contactos.length; i++) {
		contactos[i].save(function(err, result){
			done++;
			lid.contactos.push(result);
			if(done === contactos.length){
				lid.save(function(err){
					exit();
				});
			}
		})
	}

	function exit(){
		mongoose.disconnect();
	}
});



