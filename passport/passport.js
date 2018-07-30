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

	passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, function(email, password, done){
		User.findOne({email: email}, function(err, user){
			if(err){
				done(err)
			}else{
				if(user){
					const valid = bcrypt.compareSync(password, user.password);
					if(valid){
						done(null, {
							email: email,
							password: user.password
						});
					}else{
						done(null, false);
					}
				}else {
					done(null, false);
				}
			}
		});
		
	}));
}