const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pagosGarantia = new Schema({

	colonia: {
		type: String,
		required: true
	},

	folio: {
		type: String,
		required: true
	},

	nombre: {
		type: String,
		required: true
	},

	costo: {
		type: String,
		required: true
	},

	pago: {
		type: String,
		required: true
	},

	fecha: {
		type: Date,
		required: true
	},

	solicitud: {
		type: Schema.Types.ObjectId,
		ref: 'Solicitud'
	}


});

module.exports = mongoose.model("Pagos", pagosGarantia);