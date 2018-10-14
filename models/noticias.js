const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticias = new Schema({

	titulo: {
		type: String,
		required: true
	},

	sipnosis: {
		type: String,
		required: true
	},

	texto: {
		type: String,
		required: true
	},

	imagen: {
		type: String,
		required: true
	},

	fecha: {
		type: Date,
		required: true
	}

});

module.exports = mongoose.model("Noticia", noticias);