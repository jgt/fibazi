const Solicitud = require("../models/solicitud");
const User = require("../models/user");
const Pagos = require("../models/pagosGarantia");
const Contactos = require("../models/contactos");
const Lider = require("../models/lideres");
const PdfPrinter = require('pdfmake/src/printer');
const fonts = require("../config/fonts");
const docDefinition = require("../modulos/pdfMaker/pdfData");

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

		Cliente.save(function(err){
			if(err) return res.render('site/503-page.html', {err: err});
			//res.render('site/solicitud');
			Lider.findById(Cliente.lider._id, function(err, lid){
				lid.solicitudes.push(Cliente._id);
				lid.save();
			});

			res.setHeader('Content-type', 'application/pdf');
			var pdfDoc = printer.createPdfKitDocument(docDefinition.solicitud(Cliente));
			pdfDoc.pipe(res);
			pdfDoc.end();
		});
}

exports.findSolc = function(req, res){
	var folio = req.body.folio;
	Solicitud.count({}, function(err, count){
		if(folio == 0) res.render('site/buscadorGarantia.html', {count: count, message: req.flash("error_messages")});
		if(folio <= count){
			Solicitud.findOne({folio: folio}, function(err, sol){
				if(err) return res.send({err: err});
				res.render('site/pagosGarantia.html', {solicitud: sol});
			});
		}else{
			res.render('site/buscadorGarantia.html', {count: count, message: req.flash("error_messages")});
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

	Paid.save(function(err){
		if(err) return res.render("site/503-page.html");
		//res.render('site/pagosGarantia', {solicitud: Paid});
		res.setHeader('Content-type', 'application/pdf');
		var pdfDoc = printer.createPdfKitDocument(docDefinition.pagos(Paid));
		pdfDoc.pipe(res);
		pdfDoc.end();
	});
}


