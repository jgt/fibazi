const express = require("express");
const email = require("../controllers/sendEmail");
const route = express.Router();

//Index
route.get("/", function(req, res){
	res.render("pug/pages/index");
	//res.render("pug/pages/503-page");
});
//Blog
route.get("/blog", function(req, res){
	res.render("pug/pages/classic-blog");
});
//Contact
route.get("/contact", function(req, res){
	res.render("pug/pages/contacts");
});
//POST Contact
route.post("/contact", email.sendEmail);
//Login
route.get("/login", function(req, res){
	res.render("login/index");
});

//Sobre Fibazi
route.get("/antecedentes", function(req, res){
	res.render("pug/pages/antecedentes")
});
route.get("/sobreFibazi", function(req, res){
	res.render("pug/pages/aboutFibazi");
});

module.exports = route;