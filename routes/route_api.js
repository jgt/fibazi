const express = require("express");
const route_api = express.Router();
const logged = require("../middleware/logged");
const api = express.Router();

//Constrollers
const user = require("../controllers/createUser");


//Authenticate
api.get('/logged', logged, function(req, res){
	res.send('usuario logeado');
});

//Error vista
api.get('/error', logged, function(req, res){
	res.render('pug/pages/503-page');
});

//Create User
api.get("/user", logged, user.createUser, function(req, res){
	res.render("pug/pages/index");
});

module.exports = api;