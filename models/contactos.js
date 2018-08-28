const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactos = new Schema({

	nombre: {
		type: String,
		required: true
	},

	telefono: {
		type: String,
		required: true
	},

	colonia: {
		type: String,
		required: true
	},

	lider: {
		type: Schema.Types.ObjectId,
		ref: 'Lider'
	}

});

module.exports = mongoose.model("Contactos", contactos);