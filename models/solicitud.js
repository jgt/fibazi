const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-autoinc');
const Schema = mongoose.Schema;

const connection = mongoose.createConnection("mongodb://fibazi:jgt3556792@ds141641.mlab.com:41641/fibazi");

AutoIncrement.initialize(connection, mongoose);

const solicitudes = new Schema({
	folio: {
		type: Number,
		required: true,
		unique: true

	},

	nombres: {
		type: String,
		required: true
	},

	apellidoP: {
		type: String,
		required: true
	},

	apellidoM: {
		type: String,
		required: true
	},

	conyuge: [{
		type: String
	}],

	estadoCivil: {
		type: String,
		required: true
	},

	sexo: {
		type: String,
		required: true
	},

	edad: {
		type: Number,
		required: true
	},

	colonia: {
		type: String,
		required: true
	},

	calle: {
		type: String,
		required: true
	},

	manzana: {
		type: Number,
		required: true
	},

	lote: {
		type: Number,
		required: true
	},

	casa: {
		type: Number,
		required: true
	},

	telCasa: {
		type: Number
	},

	celular: {
		type: Number,
		required: true
	},

	telReferencia: {
		type: Number
	},

	economicos: [{
		type: String
	}],

	observaciones: {
		type: String,
	},

	fecha: {
		type: Date,
		default: Date.now
	},

	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}

});

solicitudes.plugin(AutoIncrement.plugin, {model: 'Solicitud', field: 'folio', startAt: 1, incrementBy: 1});

module.exports = mongoose.model('Solicitud', solicitudes);