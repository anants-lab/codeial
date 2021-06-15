const passport=require('passport')
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

const User=require('../models/users');

//Tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID:'211428204651-j3h9p72nu9b8bdgpvhc0u2hu0dqb6ogu.apps.googleusercontent.com',
    clientSecret:'dEk0fvQVMbB4qJGp3Q2-s5oI',
    callbackURL:"http://localhost:8000/user/auth/google/callback"
},
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("error in google passport strategy",err);
                return;
            }
            //console.log(profile);

            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("error in creating user google passport strategy",err);
                        return;
                    }

                    return done(null,user);
                });
            }
        })
    }

));

module.exports = passport;