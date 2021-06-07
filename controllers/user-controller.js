const User = require("../models/users");

module.exports.signUpPage=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/user/profile");
    }
    res.render("./signup.ejs");
} 

module.exports.signInPage=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/user/profile");
    }
    res.render("./signin.ejs");
} 


module.exports.create=function(req,res){
    User.create(req.body,function(err,newUser){
        if(err){
            req.flash('error',"User already exist");
            return res.redirect("/user/sign-up");
        }
        res.redirect("/user/sign-in");
    });
    
}

module.exports.createSession=function(req,res){
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.

    req.flash('success','Logged in');
    return res.redirect('/');
}

module.exports.profile=function(req,res){
    User.findById(req.params.id,(err,user)=>{
        return res.render("./user_profile",{
            proUser:user
        });
    });
}

module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Logged out');
    return res.redirect("/");
}