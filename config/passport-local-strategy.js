const passport= require("passport");

const LocalStrategy=require("passport-local").Strategy;

const User=require("../models/users")

//Authentication using passport
passport.use(new LocalStrategy({
        usernameField:"email"
    },
    function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("Error in finding user --> Passport");
                return done(err);
            }
            if(!user || user.password!=password){
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

//serializing the user to decide which key is to be kept in the cookie
//cookie stores a key to authenticate a user
passport.serializeUser(function(user,done){
    //Encrypts the user id and stores it in a cookie
    done(null,user.id);
});


//deserializing a user from the key in cookie (Identifying the user from cookie)
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user ---> Passport");
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication= function(req,res,next){
    //if user is signed in pass on the request to next function i.e. controllers action
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return res.redirect("/user/sign-in");
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie
        //And we are just sending this to the locals for the views
        res.locals.user=req.user;
        
    }
    next();
}




module.exports=passport;