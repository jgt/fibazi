const User = require("../models/user");

exports.findUser = function(req, res){
	User.find({},function(err, doc){
		res.json(doc);
	})
}