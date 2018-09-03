module.exports = (passport , User , LocalStrategy)=>{
    passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
function(req, email, password, done){
    process.nextTick(function(){
        User.findOne({'local.username': email}, function(err, user){
            if(err)
                return done(err);
            if(user){
                return done(null, false, req.flash('signupMessage', 'That email already taken'));
            } else {
                var newUser = new User();
                newUser.local.username = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err){
                    if(err)
                        throw err;
                    return done(null, newUser);
                })
            }
        })

    });
}));
}