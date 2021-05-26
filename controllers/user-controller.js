const User = require("../models/users");

module.exports.signUpPage=function(req,res){
    res.render("./signup.ejs");
} 

module.exports.signInPage=function(req,res){
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