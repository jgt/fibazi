const express = require("express");
const route_api = express.Router();
const logged = require("../middleware/logged");
const api = express.Router();

//Authenticate
api.get('/logged', logged, function(req, res){
	res.send('usuario logeado');
});

//Error vista
api.get('/error', logged, function(req, res){
	res.render('pug/pages/503-page');
});

module.exports = api;