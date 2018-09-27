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



