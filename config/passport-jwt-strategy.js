const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require("../models/users");

let opts= {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'
}

passport.use(new JWTStrategy(opts,function(jwtpayload,done){
    User.findById(jwtpayload._id,function(user,err){
        if(err){
            console.log("Error via JWT");
            return;
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}));