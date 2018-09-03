module.exports = (passport , User , LocalStrategy)=>{
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({ 'local.username': email}, function(err, user){
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false, req.flash('loginMessage', 'No User found'));
                if(!user.validPassword(password)){
                    return done(null, false, req.flash('loginMessage', 'invalid password'));
                }
                return done(null, user);

            });
        });
    }
    

));
}