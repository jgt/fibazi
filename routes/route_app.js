const express = require("express");
const route = express.Router();

//Constrollers
const email = require("../controllers/sendEmail");

//Construccion
route.get("/", function(req, res){
	res.render("site/index.html", {user: req.user});
});

//Blog
route.get("/blog", function(req, res){
	res.render("pug/pages/classic-blog.html");
});
//Contact
route.get("/contact", function(req, res){
	res.render("site/contacts.html");
});

//POST Contact
route.post("/contact", email.sendEmail);

//About as
route.get("/about", function(req, res){
	res.render("site/about-us.html");
});

//Login
route.get("/login", function(req, res){
	if(req.user){
		res.redirect('/solicitud');
	}else{
		res.render("site/login.html");
	}
});
route.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
});

//Sobre Fibazi
route.get("/antecedentes", function(req, res){
	res.render("site/testimonials.html")
});
route.get("/sobreFibazi", function(req, res){
	res.render("site/aboutFibazi.html");
});



module.exports = function(passport){

	route.post('/login', passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/'

	}));

	return route;
}
