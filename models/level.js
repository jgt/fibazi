const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levels = new Schema({
	nombre: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model("Levels", levels)