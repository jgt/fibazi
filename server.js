const express = require("express");
const mongoose = require("mongoose");
const route_app = require("./routes/route_app");

//Se inicializa el objecto express
const app = express();

const db = require("./config/key").mongoUri;

mongoose.connect(db)
	.then(function(){
		console.log("Mongoose connected");
	}).catch(function(err){
		console.log(err);
	});

//Middleware
app.set("view engine", "pug");
app.use(express.static('public'));


//Se monta las rutas de la app
app.use(route_app);

//Se pone el puerto del servidor
const port = process.env.PORT || 5000;


app.listen(port, function(){
	console.log('server on express');
});