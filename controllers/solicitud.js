const Solicitud = require("../models/solicitud");
const User = require("../models/user");
const Pagos = require("../models/pagosGarantia");
const escpos = require('escpos');

exports.solc = function(req, res){
	User.findOne({email: req.user.email}, function(err, user){
			var Cliente = new Solicitud({
			nombres: req.body.nombres,
			apellidoP: req.body.apellidoP,
			apellidoM: req.body.apellidoM,
			conyuge: req.body.conyuge,
			estadoCivil: req.body.estadoCivil,
			sexo: req.body.sexo,
			edad: req.body.edad,
			colonia: req.body.colonia,
			calle: req.body.calle,
			manzana: req.body.manzana,
			lote: req.body.lote,
			casa: req.body.casa,
			telCasa: req.body.telCasa,
			celular: req.body.celular,
			telReferencia: req.body.telReferencia,
			economicos: req.body.economico,
			observaciones: req.body.observaciones,
			fecha: req.body.fecha,
			usuario: user._id
		});

		Cliente.save(function(err){
			if(err) return res.render('site/503-page', {err: err});
			res.render('site/solicitud');
		});
	});
}

exports.findSolc = function(req, res){
	var folio = req.body.folio;
	Solicitud.count({}, function(err, count){
		if(folio <= count){
			Solicitud.findOne({folio: folio}, function(err, sol){
				if(err) return res.send({err: err});
				res.render('site/pagosGarantia', {solicitud: sol});
			});
		}else{
			res.render('site/buscadorGarantia', {count: count, message: req.flash("error_messages")});
		}
	});
}

exports.guardarPagos = function(req, res){
	var Paid = new Pagos({
		colonia: req.body.colonia,
		folio: req.body.folio,
		nombre: req.body.nombre,
		costo: req.body.costo,
		pago: req.body.pago,
		fecha: req.body.fecha,
		solicitud: req.body.solicitudId
	});

	Paid.save(function(err){
		if(err) return res.render("site/503-page");
		const networkDevice = new escpos.Network('169.254.160.245');
		const printer = new escpos.Printer(networkDevice);

		networkDevice.open(() => {
		  printer
		    .text('Hello World')
		    .feed()
		    .cut()
		    .close()
		});
		
		res.render("site/pagosGarantia", {solicitud: Paid});
	});
}