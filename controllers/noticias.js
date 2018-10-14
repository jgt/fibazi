const Noticia = require("../models/noticias");
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

function storeWithOriginalName(file){
	var fullNewPath = path.join(file.destination, file.originalname);
	fs.renameSync(file.path, fullNewPath);
	return {
		fileName: file.originalname
	}
}

exports.getNoticias = function(req, res){
	res.render("site/noticias.html");
}

exports.postNoticias = function(req, res){
	var name = storeWithOriginalName(req.file);
	const noticia = new Noticia({
		titulo: req.body.titulo,
		sipnosis: req.body.sipnosis,
		texto: req.body.texto,
		fecha: req.body.fecha,
		imagen: name.fileName
	});

	noticia.save().then(function(){
		res.render("site/noticias.html", {success: req.flash("success", "success")});
	}).catch(function(err){
		res.render("site/noticias.html", {error: req.flash("error", "error")});
	});
}