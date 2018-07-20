const express = require("express");
const route = express.Router();

route.get("/", function(req, res){
	res.render("pug/pages/index");
});

route.get("/blog", function(req, res){
	res.render("pug/pages/classic-blog");
});

module.exports = route;