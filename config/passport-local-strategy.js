const passport= require("passport");

const LocalStrategy=require("passport-local").Strategy;

const User=require("../models/users")

//Authentication using passport
passport.use(new LocalStrategy({
        usernameField:"email",
        passReqToCallback:true
    },
    function(req,email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password!=password){
                req.flash('error',"Invalid Username/Password");
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

//serializing the user to decide which key is to be kept in the session
//add in value of req.session.passport ie passport:{user:"user_id"}
//session:{
//    passport:{
//       user:"user_id"
//    }
// }
passport.serializeUser(function(user,done){

    done(null,user.id); // Here passing user.id stores id of logged in user in session
    // It also sets req.user to user when we login  
});

//deserializing a user from "user" in session object 
//(Identifying the user from session object)
//session:{
//    passport:{
//       user:"user_id"
//    }
// }

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user ---> Passport");
            return done(err);
        }
        return done(null,user); // It sets req.user after finding a valid user
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
        //req.user contains the current signed in user from the session 
        //And we are just sending this to the locals for the views
        //res.locals is an object passed to whatever rendering engine your app is using (in this case ejs). 
        //They'll be 'global' in the render
        //No need to prepend anything(no need of res.locals.user, use directly as locals.user )
        res.locals.user=req.user;
        
    }
    next();
}


module.exports=passport;