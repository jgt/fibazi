const bcrypt = require("bcrypt-nodejs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");


module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(user, done){
		done(null, user);
	});

	passport.use(new LocalStrategy({
		usernameField: 'email', 
		passwordField: 'password'
	}, 
	function(email, password, done){
		User.findOne({email: email}, function(err, user){
			if(err){
				done(err)
			}else{
				if(user){
					const valid = bcrypt.compareSync(password, user.password);
					if(valid){
						return done(null, {
							email: email,
							password: user.password
						});
					}else{
						return done(null, false);
					}
				}else {
					return done(null, false);
				}
			}
		});
		
	}));
}