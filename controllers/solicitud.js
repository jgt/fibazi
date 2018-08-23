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
				pageMargins: [10, 10, 10, 10],
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
						alignment: 'center',
						fontSize: 20
					},
					'\n\n',
					{
						text: 'DATOS DEL SOLICITANTE',
						fontSize: 15
					},
					'\n\n',
					'NOMBRE DEL SOLICITANTE: '+Cliente.nombres,
					'NOMBRE DEL CONYUGE: '+Cliente.conyuge,
					'\n\n',
					{
						text: 'ESTADO CIVIL: '+Cliente.estadoCivil,
						absolutePosition: {x: 10, y: 270}
					},

					{
						text: 'SEXO: '+Cliente.sexo,
						absolutePosition: {x: 40, y: 270},
						alignment: 'center'
					},
					{
						text: 'EDAD: '+Cliente.edad,
						absolutePosition: {x: 80, y: 270},
						alignment: 'right'
					},
					{
						text: Cliente.colonia,
						absolutePosition: {x: 40, y: 305},
						alignment: 'center',
						decoration: 'underline'
						
					},
					{
						text: 'COLONIA',
						absolutePosition: {x: 40, y: 317},
						alignment: 'center',
						fontSize: 8
					},
					{
						text: Cliente.calle,
						absolutePosition: {x: 10, y: 350},
						decoration: 'underline'
					},
					{
						text: 'CALLE',
						absolutePosition: {x: 10, y: 363},
						fontSize: 8
					},
					{
						text: Cliente.manzana,
						absolutePosition: {x: 40, y: 350},
						alignment: 'center',
						decoration: 'underline'

					},
					{
						text: 'MANZANA:',
						absolutePosition: {x: 40, y: 363},
						alignment: 'center',
						fontSize: 8
					},
					{
						text: Cliente.lote,
						absolutePosition: {x: 400, y: 350},
						decoration: 'underline'
					},
					{
						text: 'LOTE:',
						absolutePosition: {x: 400, y: 363},
						fontSize: 8
					},
					{
						text: Cliente.casa,
						absolutePosition: {x: 500, y: 350},
						decoration: 'underline'
					},
					{
						text: 'CASA:',
						absolutePosition: {x: 500, y: 363},
						fontSize: 8
					},
					{
						text: 'TELEFONO CASA: '+Cliente.telCasa,
						absolutePosition: {x: 10, y: 400}
					},
					{
						text: 'CELULAR: '+Cliente.celular,
						absolutePosition: {x: 10, y: 420}
					},
					{
						text: 'TEL. DE REFERENCIA: '+Cliente.telReferencia,
						absolutePosition: {x: 10, y: 440}
					},
					{
						text: 'DEPENDIENTE ECONOMICO',
						absolutePosition: {x: 10, y: 480},
						fontSize: 15
					},
					{	
						absolutePosition: {x: 10, y: 500},
						table: {
							heights: [20, 50, 70],
							widths: [510,45,45],
							body: [
								['Nombre', 'Edad'],
								[Cliente.economicos, Cliente.edadEconomico]
							]
						}
					},
					{
						text: 'OBSERVACIONES: '+Cliente.observaciones,
						absolutePosition: {x: 10, y: 640}
					},
					{
						text: 'EL INTERESADO MANISFIESTA SU CONFORMIDAD EN PAGAR EL ENGANCHE QUE REPRESENTA ESTA ADQUISICION ASI COMO LOS ABONOS QUE RESULTEN DE SU PRECIO DE VENTA.',
						absolutePosition: {x: 10, y: 680},
					},
					{
						text: 'ZIHUATANEJO, GRO.,A____________________DEL MES DE____________________DE 2018',
						absolutePosition: {x: 10, y: 720},
					},
					{
						text : 'NOMBRE Y FIRMA DEL INTERESADO',
						absolutePosition: {x: 10, y: 750},
					},
					{
						text: 'NOMBRE Y FIRMA DEL ENTREVISTADOR',
						absolutePosition: {x: 350, y: 750},
					}
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
				{
					text: 'CLAVE DE UBUCACION: '+'A-'+Paid.folio,
					//absolutePosition: {x: 300, y: 100}
				},
				{
					text: 'RECIBO DE: '+Paid.nombre,
					//absolutePosition: {x: 300, y: 100}
				},
				{
					text: 'COSTO DEL SERVICIO: '+Paid.costo,
					//absolutePosition: {x: 300, y: 100}
				},
				{
					text: 'PAGO DE : '+Paid.pago,
					//absolutePosition: {x: 300, y: 100}
				},
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


