const Solicitud = require("../models/solicitud");
const User = require("../models/user");
const Pagos = require("../models/pagosGarantia");
const PdfPrinter = require('pdfmake/src/printer');
const moment = require('moment');
const path =require("path");
const fs = require('fs');


function fonts(){
	var font = {
		Roboto: {
			normal: path.join(__dirname, '..', 'config', 'fonts/Roboto-Regular.ttf'),
			bold: path.join(__dirname, '..', 'config', 'fonts/Roboto-Medium.ttf'),
			italics: path.join(__dirname, '..', 'config', 'fonts/Roboto-Italic.ttf'),
			bolditalics: path.join(__dirname, '..', 'config', 'fonts/Roboto-MediumItalic.ttf')
		}
	};	

	return font
}

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
			economicos: req.body.economicos,
			edadEconomico: req.body.edadEconomico,
			observaciones: req.body.observaciones,
			fecha: req.body.fecha,
			usuario: user._id
		});

		var printer = new PdfPrinter(fonts());

		Cliente.save(function(err){
			if(err) return res.render('site/503-page', {err: err});
			//res.render('site/solicitud');
			var docDefinition = {
				content: [
					{
						text: 'FOLIO: '+'A-'+Cliente.folio,
						alignment: 'right'
					},
					{
						image: 'public/images/brand-204x36.png',
						alignment: 'center',
						fit: [200, 100],		
					},
					'\n\n',
					{
						text: 'SOLICITUD',
						alignment: 'center'
					},
					'\n\n',
					'DATOS DEL SOLICITANTE',
					'\n\n',
					'NOMBRE DEL SOLICITANTE: '+Cliente.nombres,
					'NOMBRE DEL CONYUGE: '+Cliente.conyuge,
					'\n\n',
					'ESTADO CIVIL: '+Cliente.estadoCivil,
					'SEXO: '+Cliente.sexo,
					'EDAD: '+Cliente.edad,
					'\n\n',
					'COLONIA: '+Cliente.colonia,
					'CALLE: '+Cliente.calle,
					'MANZANA: '+Cliente.manzana,
					'LOTE: '+Cliente.lote,
					'CASA: '+Cliente.casa,
					'\n\n',
					'TELEFONO CASA: '+Cliente.telCasa,
					'CELULAR: '+Cliente.celular,
					'TEL. DE REFERENCIA: '+Cliente.telReferencia,
					'\n\n',
					'\n\n',
					'DEPENDIENTE ECONOMICO',
					{
						table: {
							heights: [20, 50, 70],
							widths: [400,45,45],
							body: [
								['Nombre', 'Edad'],
								[Cliente.economicos, Cliente.edadEconomico]
							]
						}
					},
					'\n\n',
					'OBSERVACIONES: '+Cliente.observaciones
				]
			};

			res.setHeader('Content-type', 'application/pdf');
			var pdfDoc = printer.createPdfKitDocument(docDefinition);
			pdfDoc.pipe(res);
			pdfDoc.end();
		});
	});
}

exports.findSolc = function(req, res){
	var folio = req.body.folio;
	Solicitud.count({}, function(err, count){
		if(folio == 0) res.render('site/buscadorGarantia', {count: count, message: req.flash("error_messages")});
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

	var printer = new PdfPrinter(fonts());

	Paid.save(function(err){
		if(err) return res.render("site/503-page");
		//res.render('site/pagosGarantia', {solicitud: Paid});
		var docDefinition = {
			pageOrientation: "Landscape",
			content: [
				{
					text: 'COLONIA: '+Paid.colonia,
				},
				'\n\n',
				{
					text: 'CLAVE DE UBUCACION: '+Paid.folio,
					//absolutePosition: {x: 300, y: 100}
				},
				'\n\n',
				{
					text: 'RECIBO DE: '+Paid.nombre,
					//absolutePosition: {x: 300, y: 100}
				},
				'\n\n',
				{
					text: 'COSTO DEL SERVICIO: '+Paid.costo,
					//absolutePosition: {x: 300, y: 100}
				},
				'\n\n',
				{
					text: 'PAGO DE : '+Paid.pago,
					//absolutePosition: {x: 300, y: 100}
				},
				'\n\n',
				{
					text: 'FECHA: '+moment(Paid.fecha).format('YYYY-DD-MM'),
					//absolutePosition: {x: 300, y: 100}
				}
			]
		};

		res.setHeader('Content-type', 'application/pdf');
		var pdfDoc = printer.createPdfKitDocument(docDefinition);
		pdfDoc.pipe(res);
		pdfDoc.end();
	});
}


