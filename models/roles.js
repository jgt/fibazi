const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roles = new Schema({
	nombre: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Role", roles);