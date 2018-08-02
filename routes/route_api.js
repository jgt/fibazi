const express = require("express");
const route_api = express.Router();
const logged = require("../middleware/logged");
const User = require("../models/user");
const api = express.Router();

api.use('/logged', function(req ,res, next){
	User.findOne({email: req.user.email}, function(err, usuario){
		res.locals.user = usuario;
		next();
	})
});

//Authenticate
api.get('/logged', logged, function(req, res){
	res.render('pug/pages/404-page');
});

//Error vista
api.get('/error', logged, function(req, res){
	res.render('pug/pages/503-page');
});

module.exports = api;