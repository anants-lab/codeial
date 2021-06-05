const Post=require("../models/post");

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
        res.render("home.ejs",{posts:posts});
    });
};