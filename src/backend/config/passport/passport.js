const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');
const configAuth = require("../../config/auth");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});
	require('./local_signup')(passport, User,LocalStrategy); //local sign up
	require('./local_login')(passport, User,LocalStrategy);	//local login
	require('./facebookAuth')(passport,configAuth,User);	//auth 2.0 facebook

	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
			process.nextTick(function(){
				User.findOne({'google.id': profile.id}, function(err, user){
					if(err)
						return done(err);
					if(user)
						return done(null, user);
					else {
						var newUser = new User();
						newUser.google.id = profile.id;
						newUser.google.token = accessToken;
						newUser.google.name = profile.displayName;
						newUser.google.email = profile.emails[0].value;
	
						newUser.save(function(err){
							if(err)
								throw err;
							return done(null, newUser);
						})
						console.log(profile);
					}
				});
			});
		}
	
	));
};