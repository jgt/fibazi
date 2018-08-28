const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LideresSchema = new Schema({

	nombre: {
		type: String,
		required: true
	},

	telefono: {
		type: Number,
		required: true
	},

	colonia: {
		type: String,
		required: true
	},

	solicitudes:[{
		type: Schema.Types.ObjectId,
		ref: 'Solicitud'
	}],

	contactos: [{
		type: Schema.Types.ObjectId,
		ref: 'Contactos'
	}]
})

module.exports = mongoose.model("Lider", LideresSchema);