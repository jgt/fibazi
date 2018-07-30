const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const logged = require("./middleware/logged");
const session = require("express-session");
const bodyParser = require('body-parser');
const route_app = require("./routes/route_app")(passport);
const route_api = require("./routes/route_api");

//Se inicializa el objecto express
const app = express();
//Variable para la conexion BD
const db = require("./config/key").mongoUri;

//Conexion a la base de datos
mongoose.connect(db)
	.then(function(){
		console.log("Mongoose connected");
	}).catch(function(err){
		console.log(err);
	});

//Add the file passport configuration
require('./passport/passport')(passport);

//Middleware
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.set("view engine", "pug");
app.use(express.static('public'));

//Use session for tracking logins
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'work hard',
}));

//Passport inizitalize
app.use(passport.initialize());
app.use(passport.session());


//Se monta las rutas de la app
app.use(route_app);
app.use(route_api);


//Se pone el puerto del servidor
const port = process.env.PORT || 3000;


app.listen(port, function(){
	console.log('server on express');
});