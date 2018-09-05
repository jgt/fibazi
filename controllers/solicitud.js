const Solicitud = require("../models/solicitud");
const User = require("../models/user");
const Pagos = require("../models/pagosGarantia");
const Contactos = require("../models/contactos");
const Lider = require("../models/lideres");
const PdfPrinter = require('pdfmake/src/printer');
const fonts = require("../config/fonts");
const docDefinition = require("../modulos/pdfMaker/pdfData");

exports.getSolc = function(req, res){
	res.render("site/solicitud.html");
}

exports.solc = function(req, res){
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
			economicos: req.body.economicos,
			edadEconomico: req.body.edadEconomico,
			observaciones: req.body.observaciones,
			fecha: req.body.fecha,
			lider: req.body.referente,
			contacto: req.body.contacto,
			usuario: res.locals.user.id
		});

		var printer = new PdfPrinter(fonts());

		Cliente.save().then(function(){
			Lider.findById(Cliente.lider._id, function(err, lid){
				lid.solicitudes.push(Cliente._id);
				lid.save();
			});

			res.setHeader('Content-type', 'application/pdf');
			var pdfDoc = printer.createPdfKitDocument(docDefinition.solicitud(Cliente));
			pdfDoc.pipe(res);
			pdfDoc.end();

		}).catch(function(err){
			res.render('site/solicitud.html', {error: req.flash("error", "error")});
		})
}

exports.getFindSolc = function(req, res){
	Solicitud.count({}, function(err, count){
		res.render("site/buscadorGarantia.html", {count: count});
	});
}

exports.findSolc = function(req, res){
	var folio = req.body.folio;
	Solicitud.count({}, function(err, count){
		if(folio == 0) res.render('site/buscadorGarantia.html', {count: count, error: req.flash("error", "error")});
		if(folio <= count){
			Solicitud.findOne({folio: folio}, function(err, sol){
				if(err) return res.send({err: err});
				res.render('site/pagosGarantia.html', {solicitud: sol});
			});
		}else{
			res.render('site/buscadorGarantia.html', {count: count, error: req.flash("error", "error")});
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

	var printer = new PdfPrinter(fonts());

	Paid.save().then(function(){
		res.setHeader('Content-type', 'application/pdf');
		var pdfDoc = printer.createPdfKitDocument(docDefinition.pagos(Paid));
		pdfDoc.pipe(res);
		pdfDoc.end();

	}).catch(function(err){
		res.render('site/pagosGarantia.html', {solicitud: Paid, error: req.flash("error", "error")});
	})
}


