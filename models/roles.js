const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roles = new Schema({
	nombre: {
		type: String,
		required: true
	},

	level: [{
		type: Schema.Types.ObjectId,
		ref: "Levels"
	}]
});

module.exports = mongoose.model("Role", roles);