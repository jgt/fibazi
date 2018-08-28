const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const logged = require("./middleware/logged");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const route_app = require("./routes/route_app")(passport);
const route_api = require("./routes/route_api");
const helmet = require('helmet');
const morgan = require('morgan');
const path =require("path");

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


//Settings
const port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use(morgan('dev'));
app.use(session({
	name: 'sessionId',
	resave: false,
	saveUninitialized: false,
	secret: 'work hard',
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: 60 * 60 * 24 * 1, // one day

	}),
	cookie: {
		secure: false,
		httpOnly: true,
		expires: new Date(Date.now() + 60 * 60 * 24 * 1000) // one hour
	}

}));
app.use(flash());


//Passport inizitalize
app.use(passport.initialize());
app.use(passport.session());

//Static file
app.use(express.static(path.join(__dirname, 'public')));

//Se monta las rutas de la app
app.use(route_app);
app.use(route_api);

app.listen(port, function(){
	console.log('server on express');
});