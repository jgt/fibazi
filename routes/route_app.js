const express = require("express");
const email = require("../controllers/sendEmail");
const route = express.Router();

route.get("/", function(req, res){
	res.render("pug/pages/index");
	//res.render("pug/pages/503-page");
});

route.get("/blog", function(req, res){
	res.render("pug/pages/classic-blog");
});

route.get("/contact", function(req, res){
	res.render("pug/pages/contacts");
});

route.post("/contact", email.sendEmail);

module.exports = route;