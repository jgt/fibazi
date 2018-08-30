const moment = require('moment');

module.exports.pagos = function(Paid){
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

	return docDefinition;
}

module.exports.solicitud = function(Cliente){
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

	return docDefinition;
}