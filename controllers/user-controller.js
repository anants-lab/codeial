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
            console.error("Cannot create new user");
            return;
        }
        res.redirect("/user/sign-in");
    });
    
}

module.exports.createSession=function(req,res){
    return res.redirect('/');
}

module.exports.profile=function(req,res){
    return res.render("./user_profile");
}

module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect("/");
}