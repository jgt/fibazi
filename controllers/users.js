const User = require("../models/user");

exports.findUser = function(req, res){
	User.findById({_id: "5b61e761c140833ff98f8253"},function(err, doc){
		res.json(doc);
	})
}