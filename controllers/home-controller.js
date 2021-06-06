const { serializeUser } = require("passport");
const Post=require("../models/post");
const User=require("../models/users");

module.exports.home=function(req,res){

    //Populate 'user' field of post(which contains only user id)  with entire object of user.
    
    Post.find({})
    .populate("user")
    .populate({
        path:"comments",
        populate:{
            path:"user"
        }
    })
    .exec(function(err,posts){
        User.find({},(err,users)=>{
            res.render("home.ejs",
            {
                posts:posts,
                users:users
            });
        })
        
    });
};