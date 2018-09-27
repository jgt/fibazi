const Solicitud = require("../models/solicitud");
const Pagos = require("../models/pagosGarantia");
const PdfPrinter = require('pdfmake/src/printer');
const fonts = require("../config/fonts");
const docDefinition = require("../modulos/pdfMaker/pdfData");


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