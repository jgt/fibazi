const express = require("express");
const route = express.Router();

//Constrollers
const email = require("../controllers/sendEmail");

//Construccion
route.get("/", function(req, res){
	res.render("pug/pages/503-page");
});

//Index
route.get('/index', function(req, res){
	res.render("pug/pages/index");
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
route.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

//Sobre Fibazi
route.get("/antecedentes", function(req, res){
	res.render("pug/pages/antecedentes")
});
route.get("/sobreFibazi", function(req, res){
	res.render("pug/pages/aboutFibazi");
});

module.exports = function(passport){

	route.post('/login', passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/logged'

		}),function(req, res){
			res.redirect('/');
		});

	return route;
}
